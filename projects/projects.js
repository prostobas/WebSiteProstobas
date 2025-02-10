document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов
    const title = document.querySelector('.projects-content h2');
    const filter = document.querySelector('.projects-filter');
    const projectCards = document.querySelectorAll('.project-card');

    // Анимация заголовка
    setTimeout(() => {
        title.classList.add('animate');
    }, 300);

    // Анимация фильтра
    setTimeout(() => {
        filter.classList.add('animate');
    }, 500);

    // Анимация карточек проектов с задержкой
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, 700 + (index * 200));
    });

    // Фильтрация проектов
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Анимация при наведении на карточки
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image img');
        
        card.addEventListener('mouseenter', function() {
            image.style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
        });
    });
}); 