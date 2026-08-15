# Сервер botyan.dev

Актуальный сервер: **77.232.135.70** (Timeweb Cloud, СПб, Ubuntu 24.04 LTS,
1 vCPU / 2 ГБ / 30 ГБ NVMe). Переехали 15.08.2026 со старого 37.1.211.14,
тот умер вместе со своей копией `bot.db`.

Доступ только по ключу `~/.ssh/botyan_deploy_ci_new`, парольный вход отключён
(`/etc/ssh/sshd_config.d/00-hardening.conf`). Аварийный вход через VNC-консоль
в панели хостера. Тем же ключом ходит GitHub Actions.

В `~/.ssh/config` заведены хосты `botyan-vps` (юзер deploy) и `botyan-vps-root`.

Что где живёт:

| Что | Путь на сервере | Кто катит |
|---|---|---|
| Статика сайта | `/var/www/botyan/dist` | GitHub Actions |
| API формы | `/opt/botyan-api/contact-server.mjs` | GitHub Actions |
| Секреты API | `/etc/botyan/contact.env` | GitHub Actions |
| Telegram-бот | `/opt/botyan-bot` | вручную, `deploy-bot.sh` |
| nginx | `/etc/nginx/sites-available/botyan.conf` | вручную, один раз |

Бот работает на long polling, вебхука нет. Нельзя держать его запущенным
на двух серверах одновременно: Telegram начнёт отдавать апдейты по очереди
то одному, то другому.

## Порядок действий

### 1. Ключ для CI

```bash
ssh-keygen -t ed25519 -C "botyan-deploy-ci" -f ~/.ssh/botyan_deploy_ci_new -N ""
cat ~/.ssh/botyan_deploy_ci_new.pub   # пойдёт в bootstrap.sh
cat ~/.ssh/botyan_deploy_ci_new       # пойдёт в секрет DEPLOY_SSH_KEY
```

### 2. Подготовка сервера

```bash
scp deploy/bootstrap.sh deploy/botyan-api.service deploy/nginx-botyan.conf \
    ../botyan-bot/deploy/botyan-bot.service root@NEW_IP:/root/

ssh root@NEW_IP 'bash /root/bootstrap.sh "$(cat ~/.ssh/botyan_deploy_ci_new.pub)"'
```

Скрипт ставит nginx, Node 22, Python, certbot, ufw, заводит юзера `deploy`,
создаёт каталоги, кладёт systemd-юниты и sudoers на рестарты.

### 3. DNS

A-запись `botyan.dev` и `www.botyan.dev` на новый IP. TTL 300.
Проверить: `dig +short botyan.dev`.

### 4. Сертификат

Только после того, как DNS отрезолвился на новый IP:

```bash
ssh root@NEW_IP 'certbot --nginx -d botyan.dev -d www.botyan.dev \
  --agree-tos -m art0tod@proton.me --redirect --non-interactive'
```

### 5. Секреты в GitHub

`Settings → Secrets and variables → Actions`:

| Секрет | Значение |
|---|---|
| `DEPLOY_HOST` | новый IP |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_PORT` | `22` |
| `DEPLOY_SSH_KEY` | приватный ключ из шага 1 |
| `RECAPTCHA_SECRET` | уже есть, не трогать |
| `TELEGRAM_BOT_TOKEN` | уже есть, не трогать |
| `TELEGRAM_CHAT_ID` | уже есть, не трогать |
| `VITE_RECAPTCHA_SITE_KEY` | опционально, в коде есть фолбэк |

### 6. Деплой сайта

`Actions → Deploy to VPS → Run workflow`. Последним шагом идёт health check API.

### 7. Деплой бота

```bash
cd ~/Desktop/dev/botyan-bot
./deploy/deploy-bot.sh NEW_IP
```

Заливает код, `.env` и локальный `bot.db` (только если на сервере их ещё нет),
собирает venv, рестартует сервис.

### 8. Проверка

```bash
curl -I https://botyan.dev
curl -s https://botyan.dev/api/contact          # {"ok":true,"service":"contact"}
curl -s https://botyan.dev/blog | head -5       # пререндер отдаёт свой title
ssh deploy@NEW_IP 'systemctl status botyan-api botyan-bot --no-pager'
```

Плюс вручную: отправить форму с сайта и написать боту `/start`, оба должны
прислать сообщение в Telegram.

## Грабли, на которые уже наступили

- В cloud-образах Ubuntu лежит `/etc/ssh/sshd_config.d/50-cloud-init.conf`
  с `PasswordAuthentication yes`. В sshd выигрывает первое совпадение, поэтому
  файл с ужесточением должен сортироваться раньше: `00-hardening.conf`.
- В sudoers указаны точные аргументы команд, поэтому
  `sudo systemctl status botyan-bot --no-pager` не проходит. `systemctl status`
  прекрасно читается и без sudo, под sudo нужен только `restart`.
- Несуществующий маршрут отдаёт 200, а не 404: nginx фолбэчит на `index.html`,
  дальше 404 рисует роутер. Так же вело себя на Vercel. Если понадобится
  настоящий 404-статус, в `dist/404.html` уже лежит готовая страница.

## Что не требует изменений

- Токен бота и `chat_id`: привязаны к аккаунту, не к серверу
- Ключи reCAPTCHA: привязаны к домену `botyan.dev`, не к IP
- Яндекс.Метрика (ID 109412489) и файл верификации в `public/`

## Рудименты Vercel

`api/contact.ts` и `vercel.json` остались от хостинга на Vercel и на VPS не
используются. Актуальная версия API это `server/contact-server.mjs`.
Если правишь логику отправки в Telegram, правь оба файла или удали лишний.
