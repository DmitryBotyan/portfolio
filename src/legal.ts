export type LegalKind = 'privacy' | 'terms' | 'consent'

export interface LegalDoc {
  title: string
  updated: string
  body: string
}

export const legal: Record<'ru' | 'en', Record<LegalKind, LegalDoc>> = {
  ru: {
    privacy: {
      title: 'Политика конфиденциальности',
      updated: 'Редакция от 25 мая 2026 года',
      body: `1. Общие положения

1.1. Настоящая Политика конфиденциальности (далее по тексту "Политика") разработана в соответствии с требованиями Федерального закона от 27 июля 2006 года № 152-ФЗ "О персональных данных" и регулирует порядок обработки и защиты персональных данных, получаемых от пользователей сайта (далее по тексту "Сайт").

1.2. Оператором персональных данных является физическое лицо Ботян Дмитрий (далее по тексту "Оператор"). Адрес электронной почты для связи: dbotyangroup@gmail.com.

1.3. Использование Сайта означает безоговорочное согласие пользователя (далее по тексту "Пользователь") с настоящей Политикой и указанными в ней условиями обработки его персональных данных.

2. Состав обрабатываемых персональных данных

2.1. Оператор обрабатывает следующие персональные данные, предоставленные Пользователем добровольно посредством форм Сайта:
а) фамилия и имя Пользователя;
б) адрес электронной почты Пользователя;
в) содержание сообщения, направленного через форму обратной связи, включая параметры предполагаемого проекта, переданные через калькулятор стоимости (в случае, если Пользователь приложит их к сообщению);
г) техническая информация, автоматически передаваемая браузером Пользователя при посещении Сайта (тип браузера, информация о посещённых страницах, временные метки), используемая в обезличенной форме.

2.2. Калькулятор предварительной стоимости проекта, размещённый на Сайте, работает исключительно на стороне браузера Пользователя. Введённые в калькулятор параметры (тип проекта, количество страниц, выбранные опции) не передаются Оператору и не сохраняются на серверах Оператора без отдельного волеизъявления Пользователя, выраженного посредством отправки формы обратной связи.

2.3. Информационное всплывающее уведомление, появляющееся при определённых условиях посещения Сайта, не осуществляет сбор персональных данных. Факт отображения и закрытия уведомления фиксируется исключительно в локальном хранилище браузера Пользователя (sessionStorage) с целью однократного показа в течение сессии и не передаётся Оператору.

3. Цели обработки персональных данных

3.1. Оператор обрабатывает персональные данные Пользователя в следующих целях:
а) ответ на обращение Пользователя, поступившее через форму обратной связи Сайта;
б) предоставление Пользователю по его запросу информации об оказываемых Оператором услугах, в том числе о разработке сайтов, интернет-магазинов, Telegram-ботов, выполнении интеграций и сопутствующих работах;
в) подготовка предварительной и окончательной оценки стоимости работ по запросу Пользователя;
г) ведение переговоров и заключение договоров оказания услуг между Оператором и Пользователем;
д) исполнение обязательств, возникших из заключённых договоров.

4. Правовые основания обработки

4.1. Обработка персональных данных Пользователя осуществляется на основании согласия Пользователя на обработку его персональных данных, выраженного путём проставления отметки в специальном поле формы перед её отправкой.

4.2. Согласие Пользователя является конкретным, информированным и сознательным, дано свободно, своей волей и в своём интересе.

5. Порядок и условия обработки

5.1. Обработка персональных данных осуществляется как с использованием средств автоматизации, так и без использования таких средств.

5.2. Срок обработки персональных данных составляет один календарный год с момента их получения Оператором либо до момента отзыва согласия Пользователем, в зависимости от того, какое из указанных событий наступит ранее.

5.3. По истечении срока обработки персональные данные подлежат уничтожению, если иное не предусмотрено законодательством Российской Федерации.

5.4. Передача персональных данных третьим лицам не осуществляется, за исключением случаев, прямо предусмотренных законодательством Российской Федерации.

6. Права Пользователя как субъекта персональных данных

6.1. Пользователь имеет право:
а) получать сведения, касающиеся обработки его персональных данных Оператором;
б) требовать от Оператора уточнения своих персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки;
в) в любой момент отозвать своё согласие на обработку персональных данных путём направления Оператору соответствующего письменного обращения по адресу электронной почты, указанному в пункте 1.2 настоящей Политики;
г) обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке.

7. Меры по обеспечению безопасности персональных данных

7.1. Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения, а также от иных неправомерных действий в отношении персональных данных.

8. Заключительные положения

8.1. Настоящая Политика может быть изменена Оператором в одностороннем порядке. Новая редакция Политики вступает в силу с момента её размещения на Сайте, если иное не предусмотрено новой редакцией.

8.2. По всем вопросам, связанным с обработкой персональных данных, Пользователь вправе обратиться к Оператору по адресу электронной почты, указанному в пункте 1.2 настоящей Политики.

8.3. Действующая редакция Политики постоянно доступна на Сайте по соответствующей ссылке в нижней части страниц.`,
    },
    terms: {
      title: 'Пользовательское соглашение',
      updated: 'Редакция от 25 мая 2026 года',
      body: `1. Общие положения

1.1. Настоящее Пользовательское соглашение (далее по тексту "Соглашение") регулирует отношения между владельцем сайта (далее по тексту "Администрация") и любым дееспособным физическим или юридическим лицом, использующим Сайт (далее по тексту "Пользователь").

1.2. Использование Сайта в любой форме означает безоговорочное согласие Пользователя со всеми условиями настоящего Соглашения. В случае несогласия с какими-либо положениями Соглашения Пользователь обязан прекратить использование Сайта.

2. Предмет Соглашения

2.1. Сайт предоставляет Пользователю информацию о профессиональной деятельности Администрации, реализованных проектах, оказываемых услугах, действующих тарифах и контактных данных Администрации, а также предоставляет вспомогательный функционал, включающий калькулятор предварительной стоимости работ и форму обратной связи.

2.2. Информация, размещённая на Сайте, включая указанные цены, диапазоны стоимости и состав работ по тарифным пакетам, носит ознакомительный характер и не является публичной офертой в значении статьи 437 Гражданского кодекса Российской Федерации. Окончательная стоимость и сроки оказания услуг определяются сторонами индивидуально на основании технического задания и фиксируются в письменном виде.

2.3. Результаты расчётов калькулятора предварительной стоимости являются ориентировочными, формируются на стороне браузера Пользователя и не порождают для Администрации каких-либо обязательств по выполнению работ за указанную калькулятором цену.

3. Интеллектуальная собственность

3.1. Все объекты, размещённые на Сайте, включая тексты, графические изображения, фотографии, видеоматериалы, элементы дизайна, исходный программный код и иные результаты интеллектуальной деятельности, являются объектами интеллектуальной собственности Администрации либо размещены с согласия правообладателей.

3.2. Использование материалов Сайта в любой форме, включая копирование, переработку, распространение, публикацию и доведение до всеобщего сведения, без предварительного письменного согласия Администрации не допускается.

3.3. Цитирование материалов Сайта допускается при обязательном указании источника заимствования в виде активной гиперссылки на соответствующую страницу Сайта.

4. Права и обязанности Пользователя

4.1. Пользователь обязуется использовать Сайт только в законных целях и способами, не нарушающими права третьих лиц.

4.2. Пользователю запрещается:
а) предпринимать действия, направленные на нарушение работоспособности Сайта;
б) использовать автоматизированные средства сбора информации с Сайта без письменного согласия Администрации;
в) предоставлять заведомо недостоверные сведения о себе при использовании форм обратной связи Сайта.

5. Ограничение ответственности

5.1. Сайт и размещённые на нём материалы предоставляются по принципу "как есть". Администрация не предоставляет никаких гарантий в отношении пригодности Сайта или его материалов для конкретных целей Пользователя.

5.2. Администрация не несёт ответственности за невозможность использования Сайта по причинам, не зависящим от Администрации, в том числе вследствие технических сбоев у провайдеров связи, действий третьих лиц, обстоятельств непреодолимой силы.

5.3. Администрация не несёт ответственности за содержание внешних ресурсов, на которые могут вести гиперссылки, размещённые на Сайте.

6. Обработка персональных данных

6.1. Порядок обработки персональных данных Пользователя определяется отдельным документом, размещённым на Сайте, а именно Политикой конфиденциальности.

7. Заключительные положения

7.1. Настоящее Соглашение регулируется и подлежит толкованию в соответствии с действующим законодательством Российской Федерации.

7.2. Все споры и разногласия, возникающие в связи с настоящим Соглашением, подлежат разрешению путём переговоров. При невозможности достижения соглашения путём переговоров споры подлежат рассмотрению в порядке, установленном законодательством Российской Федерации, по месту нахождения Администрации.

7.3. Администрация вправе в одностороннем порядке вносить изменения в настоящее Соглашение. Изменения вступают в силу с момента публикации новой редакции Соглашения на Сайте.`,
    },
    consent: {
      title: 'Согласие на обработку персональных данных',
      updated: 'Редакция от 25 мая 2026 года',
      body: `Настоящим Пользователь, проставляя отметку в соответствующем поле формы обратной связи на Сайте, в соответствии с требованиями Федерального закона от 27 июля 2006 года № 152-ФЗ "О персональных данных" свободно, своей волей и в своём интересе даёт согласие физическому лицу Ботяну Дмитрию (далее по тексту "Оператор"), действующему по адресу электронной почты dbotyangroup@gmail.com, на обработку своих персональных данных на условиях, изложенных ниже.

1. Состав персональных данных, на обработку которых даётся согласие

1.1. Фамилия и имя Пользователя.
1.2. Адрес электронной почты Пользователя.
1.3. Содержание сообщения, направленного Пользователем через форму обратной связи, включая описание планируемого проекта и иные сведения, добровольно переданные Пользователем для целей оценки стоимости и сроков выполнения работ.

2. Цели обработки персональных данных

2.1. Рассмотрение обращения Пользователя и подготовка ответа на него.
2.2. Установление и поддержание связи с Пользователем по предмету обращения.
2.3. Подготовка предварительной и окончательной оценки стоимости разработки сайта, интернет-магазина, Telegram-бота, интеграций и иных услуг Оператора по запросу Пользователя.
2.4. Ведение преддоговорных переговоров и при достижении соглашения сторон заключение и исполнение договора оказания услуг.

3. Перечень действий с персональными данными

3.1. Согласие даётся на совершение Оператором следующих действий с персональными данными Пользователя: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ) в случаях, прямо предусмотренных законодательством Российской Федерации, обезличивание, блокирование, удаление, уничтожение.

3.2. Обработка персональных данных может осуществляться Оператором как с использованием средств автоматизации, так и без использования таких средств.

4. Срок действия согласия

4.1. Настоящее согласие действует в течение одного календарного года с момента его предоставления, если иное не предусмотрено законодательством Российской Федерации либо отдельным соглашением сторон.

5. Порядок отзыва согласия

5.1. Настоящее согласие может быть отозвано Пользователем в любой момент путём направления Оператору письменного обращения об отзыве согласия по адресу электронной почты, указанному в преамбуле настоящего согласия.

5.2. В случае отзыва согласия Оператор прекращает обработку персональных данных Пользователя и уничтожает их в срок, не превышающий тридцати календарных дней с момента поступления обращения, за исключением случаев, когда дальнейшая обработка необходима в силу прямого указания законодательства Российской Федерации.

6. Подтверждение

6.1. Пользователь подтверждает, что ознакомлен с Политикой конфиденциальности Оператора, понимает её содержание и принимает указанные в ней условия обработки персональных данных.`,
    },
  },
  en: {
    privacy: {
      title: 'Privacy Policy',
      updated: 'Version effective 25 May 2026',
      body: `1. General provisions

1.1. This Privacy Policy (hereinafter the "Policy") governs the processing and protection of personal data collected from users of the website (hereinafter the "Site") and is drafted in accordance with applicable data protection legislation, including Federal Law of the Russian Federation No. 152-FZ of 27 July 2006 "On Personal Data".

1.2. The data controller is a natural person, Dmitry Botyan (hereinafter the "Operator"). Contact email address: dbotyangroup@gmail.com.

1.3. Use of the Site by any person (hereinafter the "User") constitutes unconditional acceptance of this Policy and of the terms of processing of the User's personal data set out herein.

2. Categories of personal data processed

2.1. The Operator processes the following personal data voluntarily provided by the User through forms on the Site:
a) the User's first and last name;
b) the User's email address;
c) the content of the message submitted through the contact form, including any project parameters obtained via the cost calculator that the User chooses to attach to the message;
d) technical information automatically transmitted by the User's browser upon visiting the Site (browser type, pages visited, timestamps), used in an anonymised form.

2.2. The preliminary cost calculator available on the Site operates exclusively on the User's browser. The parameters entered into the calculator (project type, number of pages, selected options) are not transmitted to the Operator and are not stored on the Operator's servers absent a separate act of will by the User expressed through submission of the contact form.

2.3. The informational pop-up notification that appears under certain visit conditions does not collect personal data. The fact of its display and dismissal is recorded solely in the User's browser local storage (sessionStorage) for the purpose of avoiding repeated display within the same session and is not transmitted to the Operator.

3. Purposes of processing

3.1. The Operator processes the User's personal data for the following purposes:
a) responding to the User's enquiry submitted through the contact form;
b) providing the User, upon request, with information about the Operator's services, including development of websites, online stores, Telegram bots, integrations and related work;
c) preparing preliminary and final cost estimates upon the User's request;
d) conducting negotiations and concluding service agreements between the Operator and the User;
e) performing obligations arising from such agreements.

4. Legal basis of processing

4.1. The processing of personal data is carried out on the basis of the User's consent, expressed by ticking the dedicated checkbox of the form prior to its submission.

4.2. The User's consent is specific, informed and conscious, given freely, by the User's own will and in the User's own interest.

5. Manner and conditions of processing

5.1. Personal data is processed both with and without the use of automated means.

5.2. The retention period for personal data is one calendar year from the date of receipt by the Operator, or until the User withdraws consent, whichever occurs earlier.

5.3. Upon expiry of the retention period the personal data shall be destroyed unless otherwise required by applicable law.

5.4. Personal data shall not be transferred to third parties save where such transfer is expressly required by applicable law.

6. Rights of the User as a data subject

6.1. The User is entitled:
a) to obtain information regarding the processing of the User's personal data by the Operator;
b) to request rectification, blocking or erasure of the User's personal data where such data is incomplete, outdated, inaccurate, unlawfully obtained or no longer necessary for the stated purpose of processing;
c) at any time to withdraw consent to the processing of personal data by sending a written request to the Operator's email address specified in clause 1.2 of this Policy;
d) to lodge a complaint with the competent supervisory authority or to seek judicial redress.

7. Security measures

7.1. The Operator implements the necessary legal, organisational and technical measures to protect personal data against unlawful or accidental access, destruction, alteration, blocking, copying, disclosure, distribution and against any other unlawful acts in respect of personal data.

8. Final provisions

8.1. The Operator may amend this Policy unilaterally. The new version of the Policy enters into force upon its publication on the Site, unless the new version provides otherwise.

8.2. For any matter relating to the processing of personal data the User may contact the Operator at the email address specified in clause 1.2 of this Policy.

8.3. The current version of the Policy is permanently available on the Site through the relevant link at the bottom of the pages.`,
    },
    terms: {
      title: 'Terms of Use',
      updated: 'Version effective 25 May 2026',
      body: `1. General provisions

1.1. These Terms of Use (hereinafter the "Terms") govern the relations between the owner of the Site (hereinafter the "Administration") and any natural or legal person using the Site (hereinafter the "User").

1.2. Use of the Site in any form constitutes unconditional acceptance by the User of all provisions of these Terms. If the User does not agree with any provision of the Terms, the User shall cease using the Site.

2. Subject matter

2.1. The Site provides the User with information about the professional activity of the Administration, completed projects, services offered, current rates and contact details of the Administration, as well as auxiliary functionality including a preliminary cost calculator and a contact form.

2.2. The information published on the Site, including the indicated prices, price ranges and the scope of work under the offered packages, is provided for informational purposes only and does not constitute a public offer. The final price and timeline for the services are determined by the parties individually on the basis of a technical specification and are fixed in writing.

2.3. The output of the preliminary cost calculator is approximate, is generated on the User's browser, and gives rise to no obligation on the part of the Administration to perform the work at the price indicated by the calculator.

3. Intellectual property

3.1. All materials published on the Site, including texts, graphic images, photographs, video materials, design elements, source code and any other results of intellectual activity, are the intellectual property of the Administration or are published with the consent of the relevant rightholders.

3.2. Use of the materials of the Site in any form, including copying, modification, distribution, publication and making available to the public, is prohibited without the prior written consent of the Administration.

3.3. Quotation of materials of the Site is permitted provided that the source is acknowledged by means of an active hyperlink to the corresponding page of the Site.

4. Rights and obligations of the User

4.1. The User undertakes to use the Site only for lawful purposes and in a manner that does not infringe the rights of third parties.

4.2. The User shall not:
a) take any action aimed at disrupting the operation of the Site;
b) use automated means to collect information from the Site without the prior written consent of the Administration;
c) provide knowingly false information about himself or herself when using the contact forms of the Site.

5. Limitation of liability

5.1. The Site and the materials published on it are provided on an "as is" basis. The Administration makes no warranty as to the suitability of the Site or its materials for any particular purpose of the User.

5.2. The Administration shall not be liable for any inability to use the Site due to circumstances beyond the Administration's reasonable control, including technical failures of connectivity providers, actions of third parties or events of force majeure.

5.3. The Administration shall not be responsible for the content of external resources to which hyperlinks placed on the Site may lead.

6. Processing of personal data

6.1. The processing of the User's personal data is governed by a separate document published on the Site, namely the Privacy Policy.

7. Final provisions

7.1. These Terms shall be governed by, and construed in accordance with, the applicable law of the Russian Federation.

7.2. Any dispute or disagreement arising in connection with these Terms shall be resolved by way of negotiation. Failing amicable resolution, the dispute shall be referred to the competent court at the place of residence of the Administration in accordance with applicable law.

7.3. The Administration is entitled to amend these Terms unilaterally. Amendments take effect upon publication of the new version of the Terms on the Site.`,
    },
    consent: {
      title: 'Consent to the Processing of Personal Data',
      updated: 'Version effective 25 May 2026',
      body: `By ticking the dedicated checkbox of the contact form on the Site, the User, acting freely, by the User's own will and in the User's own interest, hereby grants consent to Dmitry Botyan, a natural person acting at the email address dbotyangroup@gmail.com (hereinafter the "Operator"), to the processing of the User's personal data on the terms set out below.

1. Categories of personal data covered by this consent

1.1. The User's first and last name.
1.2. The User's email address.
1.3. The content of the message submitted by the User through the contact form, including the description of the intended project and any other information voluntarily provided by the User for the purpose of estimating cost and timeline.

2. Purposes of processing

2.1. Examination of the User's enquiry and preparation of a response.
2.2. Establishing and maintaining communication with the User in relation to the subject of the enquiry.
2.3. Preparation of preliminary and final cost estimates for the development of a website, online store, Telegram bot, integrations and other services of the Operator at the User's request.
2.4. Conducting pre-contractual negotiations and, where the parties so agree, conclusion and performance of a service agreement.

3. Scope of operations performed with personal data

3.1. Consent is granted in respect of the following operations performed by the Operator: collection, recording, organisation, accumulation, storage, adaptation or alteration, retrieval, use, transfer (provision, access) where expressly required by applicable law, anonymisation, blocking, erasure and destruction.

3.2. The processing may be carried out by the Operator both with and without the use of automated means.

4. Duration of consent

4.1. This consent is valid for one calendar year from the date on which it is granted, unless otherwise required by applicable law or agreed in writing between the parties.

5. Withdrawal of consent

5.1. The User may withdraw this consent at any time by sending a written request to the Operator at the email address specified in the preamble to this consent.

5.2. Upon withdrawal of consent the Operator shall cease processing the User's personal data and shall destroy such data within thirty calendar days from the date of receipt of the request, save where further processing is required by applicable law.

6. Acknowledgement

6.1. The User confirms that the User has reviewed the Operator's Privacy Policy, understands its content and accepts the terms of processing of personal data set out therein.`,
    },
  },
}
