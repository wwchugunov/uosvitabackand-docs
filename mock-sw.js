const MOCK_PREFIX = '/uosvitabackand-docs/mock-api/';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data, null, 2), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers }
});

const student = {
  student_id: 10001, last_name: 'Коваленко', first_name: 'Анна', middle_name: 'Олександрівна',
  nsb: 'Контракт 2026-001', group: 'ІПЗ-31', course: 3,
  institute: 'Факультет інформаційних технологій', level_learn: 'Бакалавр',
  form_learn: 'Денна', speciality: 'Інженерія програмного забезпечення',
  specialization: 'Програмні системи', qualification: 'Бакалавр', price: 32000,
  price_pay_period: 'Семестр', price_pay_type: 'Контракт', sex: 'F', ipn: '0000000000',
  phone_number: '380501112233', education_start: '2024-09-01', education_end: '2028-06-30'
};

const payloads = {
  studentinfo: [student],
  saldo: [{ student_id: 10001, saldo: 1250.50 }],
  schedule: [{ student_id: 10001, semestr: 5, zes_schedule: 0, from_date: '2026-09-01', to_date: '2026-12-20', schedule: [{ pair_idx: 1, from_time: '09:00', to_time: '10:30', pair_kind: 'Лекція', pair_subject: 'Архітектура ПЗ', pair_auditorium: '305', pair_prepod: 'Іваненко О. М.', subject_id: 301, auditorium_id: 305, prepod_id: 501, pair_weeks: '1-16', day_of_week: 'Понеділок', day_of_week_raw: 1, day_date: '2026-09-07' }] }],
  marks: [{ student_id: 10001, marks: [{ semestr: 5, subjects: [{ subject_id: 301, subject: 'Архітектура ПЗ', mark: 92, national_mark: 'Відмінно', ects: 'A' }] }] }],
  calgraph: [{ semestr: 5, type_id: 1, type: 'Навчання', date_from: '2026-09-01', date_to: '2026-12-20' }, { semestr: 5, type_id: 2, type: 'Екзаменаційна сесія', date_from: '2026-12-21', date_to: '2027-01-10' }],
  payments: [{ student_id: 10001, payments: [{ date: '2026-08-25', operation_name: 'Оплата за навчання', document_type: 'Квитанція', payment_value: 16000 }] }],
  discounts: [{ student_id: 10001, discounts: [{ begin_date: '2026-09-01', discaunt_name: 'Академічна знижка', discaunt_period: '2026/2027', institute_name: 'Факультет інформаційних технологій', resp_name: 'Навчальний відділ', discaunt_percents: 10, discaunt_id: 11, institute_id: 3 }] }]
};

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (!url.pathname.startsWith(MOCK_PREFIX)) return;
  event.respondWith((async () => {
    if (event.request.method !== 'POST') return json({ code: 'METHOD_NOT_ALLOWED', message: 'Використовуйте POST' }, 405);
    if (event.request.headers.get('Authorization') !== `Basic ${btoa('test:123')}`) {
      return json({ code: 'UNAUTHORIZED', message: 'Використайте username test і password 123' }, 401, { 'WWW-Authenticate': 'Basic realm="u.Освіта mock"' });
    }
    const endpoint = url.pathname.slice(MOCK_PREFIX.length).replace(/\/$/, '');
    if (!(endpoint in payloads)) return json({ code: 'NOT_FOUND', message: 'Mock endpoint не знайдено' }, 404);
    let body;
    try { body = await event.request.json(); } catch { return json({ code: 'INVALID_JSON', message: 'Тіло має бути валідним JSON' }, 400); }
    if (endpoint !== 'studentinfo' && Number(body.student_id) !== 10001) return json([]);
    if (endpoint === 'studentinfo' && Number(body.student_id) !== 10001 && body.phone_number !== '380501112233') return json([]);
    return json(payloads[endpoint]);
  })());
});
