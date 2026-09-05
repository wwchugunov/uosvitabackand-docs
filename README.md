# Документація інтеграції u.Освіта для університетів

Автономний пакет документації. Він не залежить від backend або admin SPA і не завантажує зовнішні ресурси.

## Перегляд

Відкрийте `index.html` у браузері або запустіть локальний сервер:

```bash
cd university-integration-docs
python3 -m http.server 8088
```

Адреса: `http://127.0.0.1:8088/`

## PDF

Готовий файл: `e-osvita-university-integration-guide.pdf`.

Щоб сформувати актуальний PDF після редагування:

```bash
./build-pdf.sh
```

Також на сайті є кнопка «Друкувати / PDF», яка відкриває системний діалог друку браузера.

## Вміст

- `index.html` — документаційний сайт;
- `application-overview.html` — окремий стислий опис усієї платформи;
- `developer-handover.html` — документ передачі проєкту іншому розробнику;
- `styles.css` — екранне й друковане оформлення;
- `app.js` — навігація та друк;
- `openapi-university-provider.yaml` — машинозчитуваний контракт API університету;
- `build-pdf.sh` — генерація PDF через Google Chrome;
- `e-osvita-university-integration-guide.pdf` — готова PDF-версія.
- `e-osvita-application-overview.pdf` — окрема PDF-версія опису застосунку.
- `e-osvita-developer-handover.pdf` — окремий PDF передачі проєкту.
