# Bean Drop - Frontend Client

Фронтенд-частина вебдодатка інтернет-магазину кавових зерен **Bean Drop**. Клієнт взаємодіє з Django REST API через асинхронні AJAX-запити.

## Використані технології
- **HTML5** — базова структура сторінки
- **Bootstrap 5** — стилізація та адаптивна верстка
- **jQuery** — виконання AJAX-запитів до API та динамічний рендеринг даних

## Порти та адреси
- **Backend API:** `http://127.0.0.1:8000/`
- **Frontend App:** `http://127.0.0.1:5500/`

## Як запустити проєкт

1. Створити env `python -m venv venv`
2. Активувати його `source venv/Scripts/activate`
3. Встановити необхідні залежності `pip install -r requirements.txt`
4. Виконати міграції `python manage.py migrate`
5. Запустити сервер `python manage.py runserver`
6. Для запуска фронтенда рекомендовано використати розширення LiveServer для vscode
