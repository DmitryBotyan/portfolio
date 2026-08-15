#!/usr/bin/env bash
# Подготовка чистого сервера (Ubuntu 22.04/24.04) под botyan.dev.
# Запускать ОДИН РАЗ на новом сервере от root:
#   scp deploy/bootstrap.sh root@NEW_IP:/root/
#   ssh root@NEW_IP 'bash /root/bootstrap.sh "ssh-ed25519 AAAA... deploy-ci"'
#
# Аргумент 1: публичный SSH-ключ, которым будет ходить GitHub Actions.
set -euo pipefail

DEPLOY_PUBKEY="${1:?Передай публичный ключ первым аргументом}"
DEPLOY_USER=deploy

echo "==> Пакеты"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq \
  nginx certbot python3-certbot-nginx \
  python3 python3-venv python3-pip \
  rsync curl ca-certificates gnupg ufw sqlite3

echo "==> Node.js 22 (нужен для contact-server.mjs)"
# Три попытки по убыванию удобства: NodeSource, потом штатный apt,
# потом официальный тарбол. NodeSource может не поддерживать
# свежие релизы Ubuntu первые месяцы после выхода.
install_node_ok() { command -v node >/dev/null 2>&1 && [ "$(node -p 'process.versions.node.split(".")[0]')" -ge 20 ]; }

if ! install_node_ok; then
  echo "    пробую NodeSource"
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y -qq nodejs || true
fi

if ! install_node_ok; then
  echo "    пробую штатный apt"
  apt-get install -y -qq nodejs || true
fi

if ! install_node_ok; then
  echo "    ставлю официальный тарбол"
  NODE_VER=v22.14.0
  ARCH=$(dpkg --print-architecture)
  case "$ARCH" in
    amd64) NODE_ARCH=x64 ;;
    arm64) NODE_ARCH=arm64 ;;
    *) echo "Неизвестная архитектура $ARCH, поставь Node вручную"; exit 1 ;;
  esac
  curl -fsSL "https://nodejs.org/dist/$NODE_VER/node-$NODE_VER-linux-$NODE_ARCH.tar.xz" \
    | tar -xJ -C /usr/local --strip-components=1 \
      --exclude CHANGELOG.md --exclude LICENSE --exclude README.md
fi

install_node_ok || { echo "Node не установился"; exit 1; }
node --version
# Юнит botyan-api.service ждёт бинарь по /usr/bin/node
[ -x /usr/bin/node ] || ln -sf "$(command -v node)" /usr/bin/node

echo "==> Пользователь $DEPLOY_USER"
id -u "$DEPLOY_USER" >/dev/null 2>&1 || adduser --disabled-password --gecos "" "$DEPLOY_USER"
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
touch "/home/$DEPLOY_USER/.ssh/authorized_keys"
grep -qxF "$DEPLOY_PUBKEY" "/home/$DEPLOY_USER/.ssh/authorized_keys" \
  || echo "$DEPLOY_PUBKEY" >> "/home/$DEPLOY_USER/.ssh/authorized_keys"
chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"

echo "==> Каталоги"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" /var/www/botyan/dist
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" /opt/botyan-api
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" /opt/botyan-bot
# /etc/botyan принадлежит deploy: workflow пишет туда contact.env без sudo
install -d -m 750 -o "$DEPLOY_USER" -g "$DEPLOY_USER" /etc/botyan

echo "==> sudoers: только рестарты сервисов, без пароля"
cat > /etc/sudoers.d/deploy-botyan <<EOF
$DEPLOY_USER ALL=(root) NOPASSWD: /usr/bin/systemctl restart botyan-api, \
/usr/bin/systemctl restart botyan-bot, \
/usr/bin/systemctl status botyan-api, \
/usr/bin/systemctl status botyan-bot
EOF
chmod 440 /etc/sudoers.d/deploy-botyan
visudo -cf /etc/sudoers.d/deploy-botyan

echo "==> systemd-юниты"
cp /root/botyan-api.service /etc/systemd/system/botyan-api.service
cp /root/botyan-bot.service /etc/systemd/system/botyan-bot.service
systemctl daemon-reload
systemctl enable botyan-api botyan-bot

echo "==> nginx (пока только HTTP, сертификат выпустим отдельно)"
cp /root/nginx-botyan.conf /etc/nginx/sites-available/botyan.conf
ln -sf /etc/nginx/sites-available/botyan.conf /etc/nginx/sites-enabled/botyan.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> Файрвол"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status

echo
echo "Готово. Дальше:"
echo "  1. Перевести A-запись botyan.dev и www.botyan.dev на этот IP"
echo "  2. certbot --nginx -d botyan.dev -d www.botyan.dev --agree-tos -m art0tod@proton.me --redirect"
echo "  3. Залить бота (deploy/deploy-bot.sh из botyan-bot) и его .env"
echo "  4. Прописать секреты в GitHub и запустить workflow Deploy to VPS"
