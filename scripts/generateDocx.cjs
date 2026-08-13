const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, HeadingLevel } = require('docx');
const fs = require('fs');
const path = require('path');

const FONT_FAMILY = "Segoe UI";

async function createGuideDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: FONT_FAMILY,
            size: 22,
          },
        },
      },
    },
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
              new TextRun({ text: "Данный документ содержит полное руководство по сопоставлению полей админ-панели Sanity Studio с элементами на живом сайте, а также пошаговую инструкцию по добавлению новых полей.", size: 22, font: FONT_FAMILY }),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Адрес админ-панели Sanity Studio: ", bold: true, font: FONT_FAMILY }),
              new TextRun({ text: "https://designer-portfolio-fko873di.sanity.studio", font: FONT_FAMILY }),
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
              new TextRun({ text: "В Студии откройте раздел Designer Profile & Bio в левой колонке. Если какое-либо необязательное поле (соцсеть, список услуг, награды, клиенты) не заполнено или удалено, соответствующий модуль автоматически скрывается на сайте.", size: 22, font: FONT_FAMILY }),
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
            ["Services & Expertise List", "services", "Spatial Architecture, Brand System...", "Список направлений работы в досье (скрывается, если пусто)"],
            ["Select Clients List", "clients", "Garage Museum, Strelka Institute...", "Бейджи клиентов в досье (скрывается, если пусто)"],
            ["Awards & Recognition List", "awards", "Год, Название, Организация", "Список наград в досье (скрывается, если пусто)"],
          ]),

          // Section 2
          new Paragraph({
            text: "Раздел 2. Настройка карточки проекта (Portfolio Project)",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 500, after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Для каждого проекта создается отдельный документ в разделе Portfolio Project. Ниже приведено сопоставление полей на примере проекта SERENE SPACES.", size: 22, font: FONT_FAMILY }),
            ],
            spacing: { after: 300 },
          }),

          // Table 2
          createTable([
            ["Поле в Sanity Studio", "Поле в коде", "Пример SERENE SPACES", "Где отображается на сайте"],
            ["Title", "title", "SERENE SPACES", "Главный заголовок на карточке в сетке и в модальном окне"],
            ["Subtitle / Tagline", "subtitle", "Aesop Flagship Retail Pavilion", "Подзаголовок при наведении и в модальном окне"],
            ["Category", "category", "Spatial", "Бейдж категории в левом верхнем углу карточки"],
            ["Year", "year", "2025", "Бейдж года в правом верхнем углу карточки"],
            ["Aspect Ratio", "aspectRatio", "16/9", "Пропорция сетки карточки"],
            ["Aspect Ratio Label", "aspectRatioLabel", "16:9 Landscape", "Бейдж пропорции в модальном окне"],
            ["Main Portfolio Image", "mainImage", "project-2.jpg", "Главная обложка в сетке и первая фотография"],
            ["Secondary Gallery Images", "secondaryImages", "project-2-a.jpg (массив)", "Дополнительные фото в галерее карточки"],
            ["Detailed Description", "description", "Spatial direction and tactile...", "Подробный абзац описания проекта в модальном окне"],
            ["Client / Commissioner", "client", "Aesop Retail", "Заказчик в модальном окне и на карточке"],
            ["Tools & Technologies", "tools", "AutoCAD, Rhino 3D, Material Research", "Теги инструментов в боковой панели модального окна"],
            ["Location", "location", "Saint Petersburg, Russia", "Город/страна выполнения в модальном окне"],
            ["Featured Project", "featured", "Включено (True)", "Отметка приоритетного проекта"],
          ]),

          // Section 3
          new Paragraph({
            text: "Раздел 3. Руководство для разработчика: Как добавить новое поле",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 500, after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "Чтобы добавить новое поле в Sanity Studio и отобразить его на сайте, выполните 4 шага:", size: 22, font: FONT_FAMILY }),
            ],
            spacing: { after: 250 },
          }),

          createNumberedPoint(1, "Добавление поля в схему Sanity", "Откройте файл схемы в папке studio/schemaTypes (например profile.ts или project.ts) и добавьте вызов defineField с именем поля, типом (string, text, number, array, image) и названием title."),
          createNumberedPoint(2, "Обновление TypeScript интерфейса", "В файле designer-portfolio/src/data/portfolioData.ts добавьте новое поле в интерфейс ProfileData или Project."),
          createNumberedPoint(3, "Добавление поля в GROQ-запрос", "В файле designer-portfolio/src/sanity/sanityService.ts добавьте имя поля в константу PROFILE_QUERY или PROJECTS_QUERY, а также в функцию маппинга данных fetchProfileData / fetchPortfolioProjects."),
          createNumberedPoint(4, "Отображение в компоненте React", "В нужном компоненте (например ProfileDrawer.tsx или LightboxModal.tsx) отобразите значение с проверкой на наличие (например {profile.newField && <div>{profile.newField}</div>})."),
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
                  font: FONT_FAMILY,
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
      new TextRun({ text: `${num}. ${title}: `, bold: true, size: 22, font: FONT_FAMILY }),
      new TextRun({ text: text, size: 20, font: FONT_FAMILY }),
    ],
    spacing: { after: 150 },
  });
}

createGuideDocx().catch(console.error);
