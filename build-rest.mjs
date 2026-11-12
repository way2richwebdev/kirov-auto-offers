import { writeFileSync } from 'node:fs';

const shops = [
  {
    "slug": "tvoi",
    "type": "Автосервис",
    "heading": "Ремонт и обслуживание на Блюхера",
    "intro": "От плановой замены масла до диагностики и ремонта двигателя.",
    "services": [
      [
        "Замена масла в двигателе",
        "800"
      ],
      [
        "Замена антифриза",
        "1 400"
      ],
      [
        "Диагностика двигателя",
        "2 400"
      ],
      [
        "Замена ГРМ",
        "5 600"
      ]
    ],
    "alt": [
      "Автомобиль на подъёмнике",
      "Комплект ГРМ",
      "Тормозной диск",
      "Инструменты в боксе"
    ],
    "name": "Твой",
    "address": "ул. Блюхера, 8е",
    "phone": "+7 8332 74-71-12",
    "source": "https://2gis.ru/kirov/firm/70000001114698783",
    "contact": "https://vk.ru/tvoi_autoservis",
    "channel": "ВКонтакте"
  },
  {
    "slug": "nord",
    "type": "Автосервис",
    "heading": "Диагностика. Ходовая. Двигатель.",
    "intro": "Сервис для легковых автомобилей на Северном Кольце.",
    "services": [
      [
        "Компьютерная диагностика",
        "3 000"
      ],
      [
        "Ремонт ходовой части",
        "3 000"
      ],
      [
        "Ремонт бензинового двигателя",
        "3 000"
      ],
      [
        "Замена масла",
        "3 000"
      ]
    ],
    "alt": [
      "Диагностический бокс",
      "Диагностический сканер",
      "Рычаг подвески",
      "Работа с двигателем"
    ],
    "name": "Nord",
    "address": "ул. Северное Кольцо, 5Б",
    "phone": "+7 951 355-55-77",
    "source": "https://2gis.ru/kirov/firm/70000001040665735",
    "contact": "https://vk.ru/avtonord43",
    "channel": "ВКонтакте"
  },
  {
    "slug": "fedoseeva",
    "type": "Автосервис",
    "heading": "Автосервис на Федосеева",
    "intro": "Ремонт подвески, рулевых реек и выхлопных систем в Северном микрорайоне.",
    "services": [
      [
        "Развал-схождение",
        "3 000"
      ],
      [
        "Ремонт ходовой части",
        "3 000"
      ],
      [
        "Ремонт рулевых реек",
        "3 000"
      ],
      [
        "Ремонт выхлопной системы",
        "3 000"
      ]
    ],
    "alt": [
      "Ремонтный бокс",
      "Обслуживание автомобиля",
      "Колесо и подвеска",
      "Работа механика"
    ],
    "name": "Автосервис на Федосеева",
    "address": "ул. Федосеева, 15",
    "phone": "+7 964 256-71-62",
    "source": "https://2gis.ru/kirov/firm/70000001047367578",
    "contact": "https://wa.me/79642567162",
    "channel": "WhatsApp"
  },
  {
    "slug": "narodny",
    "type": "Техцентр",
    "heading": "Кузов и ходовая в одном техцентре",
    "intro": "Покраска, полировка, восстановление геометрии и ремонт подвески на Лепсе.",
    "services": [
      [
        "Полировка кузова",
        "3 000"
      ],
      [
        "Ремонт вмятин",
        "3 000"
      ],
      [
        "Ремонт ходовой части",
        "3 000"
      ],
      [
        "Проточка тормозных дисков",
        "3 000"
      ]
    ],
    "alt": [
      "Автомобиль в кузовном цехе",
      "Полировка кузова",
      "Ремонт вмятины",
      "Инструменты кузовного цеха"
    ],
    "name": "Народный",
    "address": "ул. Лепсе, 20в",
    "phone": "+7 8332 74-75-76",
    "source": "https://2gis.ru/kirov/firm/70000001007259456",
    "contact": "https://vk.ru/auto_service_in_kirov",
    "channel": "ВКонтакте"
  }
];

for (const [row, shop] of shops.entries()) {
  const address = 'Киров, ' + shop.address;
  const query = encodeURIComponent(address);
  const phone = 'tel:+' + shop.phone.replace(/\D/g, '');
  const photos = shop.alt.map((alt, column) => `<figure role="img" aria-label="${alt}" class="photo" style="--x:${column*100/3}%;--y:${row*100/3}%"></figure>`);
  const services = shop.services.map(([name, price]) => `<li><span>${name}</span><strong>${price} ₽</strong></li>`).join('');
  writeFileSync(shop.slug + '.html', `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<meta name="description" content="${shop.intro}">
<title>${shop.name} — ${shop.type} в Кирове</title>
<link rel="stylesheet" href="workshops.css">
</head>
<body class="theme-${row}">
<header><a class="brand" href="#">${shop.name}</a><nav aria-label="Навигация"><a href="#services">Услуги</a><a href="#contacts">Контакты</a></nav><a class="call" href="${phone}">${shop.phone}</a></header>
<main>
<section class="hero">
  <div class="hero-copy"><p class="area">${shop.type} · Киров</p><h1>${shop.heading}</h1><p class="lead">${shop.intro}</p><div class="actions"><a class="button" href="${phone}">Позвонить</a><a href="${shop.contact}">Написать в ${shop.channel}</a></div></div>
  ${photos[0]}
</section>
<section id="services" class="services">
  <div class="price"><h2>Услуги и цены</h2><ul>${services}</ul></div>
  <div class="gallery">${photos.slice(1).join('')}</div>
</section>
<section id="contacts" class="contacts">
  <div><h2>Как нас найти</h2><address>${address}</address><p><a href="${phone}">${shop.phone}</a></p><a class="button" href="https://yandex.ru/maps/?text=${query}">Открыть в Яндекс Картах</a></div>
  <iframe title="Яндекс Карта — ${address}" src="https://yandex.ru/map-widget/v1/?text=${query}&amp;z=17" loading="lazy" allowfullscreen></iframe>
</section>
</main>
<footer><strong>${shop.name}</strong><a href="${shop.source}">Карточка в 2ГИС</a></footer>
</body>
</html>`);
}
