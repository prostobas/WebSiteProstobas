document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов
    const title = document.querySelector('.blog-content h2');
    const blogCards = document.querySelectorAll('.blog-card');
    const pagination = document.querySelector('.blog-pagination');

    // Анимация заголовка
    setTimeout(() => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 300);

    // Анимация карточек блога с задержкой
    blogCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, 500 + (index * 200));
    });

    // Анимация пагинации
    setTimeout(() => {
        pagination.style.opacity = '1';
    }, 1200);

    // Обработка пагинации
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            pageButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            if (!this.classList.contains('next')) {
                this.classList.add('active');
            }
            // Здесь можно добавить логику загрузки новых постов
        });
    });

    // Анимация при наведении на карточки
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.blog-image img').style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.blog-image img').style.transform = 'scale(1)';
        });
    });
}); 