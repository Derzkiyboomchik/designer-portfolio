const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel } = require('docx');
const fs = require('fs');
const path = require('path');

async function createGuideDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: "Инструкция по заполнению Sanity Studio для сайта designer_portfolio",
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 300 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Данный документ содержит полное руководство по сопоставлению полей админ-панели Sanity Studio с элементами на живом сайте, а также пошаговую инструкцию по добавлению новых полей.", size: 22 }),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Адрес админ-панели Sanity Studio: ", bold: true }),
              new TextRun({ text: "https://designer-portfolio-fko873di.sanity.studio" }),
            ],
            spacing: { after: 400 },
          }),

          // Section 1
          new Paragraph({
            text: "Раздел 1. Настройка профиля дизайнера (Designer Profile & Bio)",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "В Студии откройте раздел Designer Profile & Bio в левой колонке. Если какое-либо необязательное поле (соцсеть, список услуг, награды, клиенты) не заполнено или удалено, соответствующий модуль автоматически скрывается на сайте.", size: 22 }),
            ],
            spacing: { after: 300 },
          }),

          // Table 1
          createTable([
            ["Поле в Sanity Studio", "Поле в коде", "Пример заполнения", "Где отображается на сайте"],
            ["Full Name", "name", "KRYLOVA ANNA", "Крупный заголовок в шапке сайта, подвал и заголовок в досье"],
            ["Role / Title", "role", "Principal Visual & Spatial Designer", "Подзаголовок роли под именем в шапке сайта и в досье"],
            ["Location", "location", "Moscow & Saint Petersburg", "Локация в боковом выезжающем досье"],
            ["Avatar Photo", "avatar", "Загрузка фото avatar.jpg", "Круглое фото в шапке сайта с кнопкой открытия досье"],
            ["Biography", "bio", "Anna Krylova operates at the intersection...", "Основной абзац био в шапке и в досье"],
            ["Design Manifesto", "manifesto", "Purity of form. Generous white space...", "Цитата-манифест в боковом досье"],
            ["Contact Email", "email", "krylova.anna@studio-design.ru", "Кнопка почты в шапке сайта и блок с кнопкой копирования в досье"],
            ["Phone Number", "phone", "+7 495 892 10 44", "Номер телефона для связи"],
            ["Studio Address", "studioAddress", "Tverskaya St 14, Moscow, Russia", "Адрес студии в досье"],
            ["Instagram Link or Handle", "instagram", "instagram.com/krylova.anna.studio", "Кнопка перехода в Instagram (скрывается, если пусто)"],
            ["Telegram Link or Username", "telegram", "t.me/krylova_anna", "Кнопка перехода в Telegram (скрывается, если пусто)"],
            ["Services & Expertise List", "services", "Список услуг (Spatial, Editorial...)", "Блок услуг SERVICES & EXPERTISE в досье (скрывается, если пусто)"],
            ["Select Clients List", "clients", "Список клиентов (Garage, Vitra...)", "Блок клиентов SELECT CLIENTELE в досье (скрывается, если пусто)"],
            ["Awards & Recognition List", "awards", "Список наград (Год, Название, Организация)", "Блок наград RECOGNITION в досье (скрывается, если пусто)"],
          ]),

          // Section 2
          new Paragraph({
            text: "Раздел 2. Создание карточки проекта (Portfolio Project)",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 500, after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "В Студии откройте раздел Portfolio Project и нажмите кнопку создания элемента (+). Ниже приведено сопоставление полей на примере карточки SERENE SPACES:", size: 22 }),
            ],
            spacing: { after: 300 },
          }),

          // Table 2
          createTable([
            ["Поле в Sanity Studio", "Поле в коде", "Пример заполнения (SERENE SPACES)", "Где отображается на сайте"],
            ["Title", "title", "SERENE SPACES", "Название карточки в сетке и заголовок модального окна просмотра"],
            ["Subtitle", "subtitle", "Aesop Flagship Retail Pavilion", "Подзаголовок проекта под названием в модальном окне"],
            ["Category", "category", "Spatial", "Текстовая метка категории на карточке и в фильтрах"],
            ["Year", "year", "2025", "Год реализации в углу карточки и в деталях проекта"],
            ["Aspect Ratio", "aspectRatio", "16/9 (из списка)", "Пропорция карточки в сетке (16:9, 3:4, 1:1, 21:9 и т.д.)"],
            ["Main Image", "mainImage", "Загрузка обложки project-2.jpg", "Главное фото карточки в сетке портфолио"],
            ["Secondary Images", "secondaryImages", "Загрузка фото project-2-a.jpg", "Дополнительная галерея фото в модальном окне"],
            ["Description", "description", "Spatial direction and tactile interior elements...", "Подробный текст описания кейса в модальном окне"],
            ["Client", "client", "Aesop Retail", "Заказчик проекта в деталях модального окна"],
            ["Tools & Tech", "tools", "AutoCAD, Rhino 3D, Material Research", "Овальные тэги инструментов в модальном окне"],
            ["Location", "location", "Saint Petersburg, Russia", "Геолокация объекта в деталях кейса"],
            ["Featured", "featured", "true / false", "Выделение проекта как ключевого кейса"],
          ]),

          // Section 3
          new Paragraph({
            text: "Раздел 3. Как добавить новое поле в Sanity Studio (Инструкция для разработчика)",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 500, after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Если вам необходимо добавить новое поле (например, новое текстовое описание, соцсеть или видео-ссылку) в админ-панель Sanity Studio, выполните следующие шаги:", size: 22 }),
            ],
            spacing: { after: 200 },
          }),

          createNumberedPoint("1", "Откройте нужную схему в папке studio/schemaTypes/", "Перейдите в папку studio/schemaTypes/ и выберите нужный файл схемы: profile.ts (для профиля) или project.ts (для карточек проектов)."),
          createNumberedPoint("2", "Добавьте новое поле через функцию defineField()", "Добавьте новый элемент в массив fields: \ndefineField({\n  name: 'myNewField',\n  title: 'Заголовок в Студии',\n  type: 'string'\n})"),
          createNumberedPoint("3", "Запушите изменения схемы на сервер Sanity", "В терминале перейдите в папку studio и выполните команду: npx @sanity/cli deploy"),
          createNumberedPoint("4", "Добавьте поле в GROQ-запрос на клиенте", "В файле designer-portfolio/src/sanity/sanityService.ts добавьте имя нового поля в GROQ-запрос (PROJECTS_QUERY или PROFILE_QUERY), чтобы клиент получал его с сервера."),
          createNumberedPoint("5", "Отобразите поле в React-компоненте", "В соответствующем компоненте (Header.tsx, ProfileDrawer.tsx или LightboxModal.tsx) выведите новое поле с проверкой на наличие: {profile.myNewField && <div>{profile.myNewField}</div>}."),
        ],
      },
    ],
  });

  const outputPath = path.resolve(__dirname, '../../SANITY_MAPPING_GUIDE.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ Word document SANITY_MAPPING_GUIDE.docx successfully created at:', outputPath);
}

function createTable(rowsData) {
  const tableRows = rowsData.map((row, rowIndex) => {
    return new TableRow({
      children: row.map((cellText) => {
        return new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: cellText,
                  bold: rowIndex === 0,
                  size: rowIndex === 0 ? 20 : 18,
                }),
              ],
            }),
          ],
          width: { size: 25, type: WidthType.PERCENTAGE },
          shading: rowIndex === 0 ? { fill: "F0F0F0" } : undefined,
        });
      }),
    });
  });

  return new Table({
    rows: tableRows,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

function createNumberedPoint(num, title, text) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${num}. ${title}: `, bold: true, size: 22 }),
      new TextRun({ text: text, size: 20 }),
    ],
    spacing: { after: 150 },
  });
}

createGuideDocx().catch(console.error);
