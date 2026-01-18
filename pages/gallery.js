// Мобильное меню
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Фильтрация по городам
let filterButtons = document.querySelectorAll('.city-filter-btn');
let galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');

        const city = this.dataset.city;

        // Показываем/скрываем элементы галереи
        galleryItems.forEach(item => {
            if (city === 'all' || item.dataset.city === city) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 50);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Модальное окно
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDate = document.getElementById('modalDate');
const modalClose = document.getElementById('modalClose');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const info = this.querySelector('.photo-info');

        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = info.querySelector('h3').textContent;
        modalDescription.textContent = info.querySelector('p').textContent;
        modalDate.textContent = info.querySelector('.photo-date').textContent;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Закрытие модального окна
modalClose.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Кнопка "Показать еще"
const loadMoreBtn = document.getElementById('loadMoreBtn');
let loadedItems = 12; // Уже загружено на странице

// Массив с дополнительными фотографиями
const morePhotos = [
    {
        city: 'moscow',
        src: '../Image/travel/photo_2026-01-10_17-50-50.jpg',
        title: 'Москва | Зима',
        desc: 'Зимние праздники',
        date: 'Январь 2026',
        type: 'tall'
    },
    {
        city: 'moscow',
        src: '../Image/travel/photo_2026-01-10_17-51-26.jpg',
        title: 'Москва | Зима',
        desc: 'Зимние праздники',
        date: 'Январь 2026',
        type: 'regular'
    },
    {
        city: 'moscow',
        src: '../Image/travel/photo_2026-01-10_17-51-22.jpg',
        title: 'Москва | Зима',
        desc: 'Зимние праздники',
        date: 'Январь 2026',
        type: 'tall'
    },
    {
        city: 'adler',
        src: '../Image/travel/adler4.jpg',
        title: 'Черноморское побережье',
        desc: 'Путешествие по Краснодарскому краю',
        date: 'Август 2025',
        type: 'wide'
    },
    {
        city: 'adler',
        src: '../Image/travel/adler5.jpg',
        title: 'Черноморское побережье',
        desc: 'Путешествие по Краснодарскому краю',
        date: 'Август 2025',
        type: 'tall'
    },
    {
        city: 'samara',
        src: '../Image/travel/samara4.jpg',
        title: 'Самара | Лето',
        desc: 'Путешествие по городу',
        date: 'Июль 2023',
        type: 'wide'
    },
    {
        city: 'samara',
        src: '../Image/travel/samara5.jpg',
        title: 'Самара | Лето',
        desc: 'Путешествие по городу',
        date: 'Июль 2023',
        type: 'regular'
    },
    {
        city: 'tolyatti',
        src: '../Image/travel/tolyatti4.jpg',
        title: 'Тольятти | Лето',
        desc: 'Путешествие по замку Гарибальди',
        date: 'Июль 2023',
        type: 'regular'
    },
    {
        city: 'tolyatti',
        src: '../Image/travel/tolyatti5.jpg',
        title: 'Тольятти | Лето',
        desc: 'Путешествие по замку Гарибальди',
        date: 'Июль 2023',
        type: 'regular'
    },
    {
        city: 'tolyatti',
        src: '../Image/travel/tolyatti6.jpg',
        title: 'Тольятти | Лето',
        desc: 'Путешествие по замку Гарибальди',
        date: 'Июль 2023',
        type: 'regular'
    },
    {
        city: 'moscow',
        src: '../Image/travel/photo_2026-01-10_17-48-08.jpg',
        title: 'Москва | Зима',
        desc: 'Зимние праздники',
        date: 'Январь 2026',
        type: 'regular'
    },
    {
        city: 'moscow',
        src: '../Image/travel/photo_2026-01-10_17-51-38.jpg',
        title: 'Москва | Зима',
        desc: 'Зимние праздники',
        date: 'Январь 2026',
        type: 'regular'
    },
    {
        city: 'adler',
        src: '../Image/travel/adler6.jpg',
        title: 'Черноморское побережье',
        desc: 'Путешествие по Краснодарскому краю',
        date: 'Август 2025',
        type: 'tall'
    },
    {
        city: 'adler',
        src: '../Image/travel/adler7.jpg',
        title: 'Черноморское побережье',
        desc: 'Путешествие по Краснодарскому краю',
        date: 'Август 2025',
        type: 'regular'
    },
    {
        city: 'adler',
        src: '../Image/travel/adler8.jpg',
        title: 'Черноморское побережье',
        desc: 'Путешествие по Краснодарскому краю',
        date: 'Август 2025',
        type: 'tall'
    },
    {
        city: 'adler',
        src: '../Image/travel/adler9.jpg',
        title: 'Черноморское побережье',
        desc: 'Путешествие по Краснодарскому краю',
        date: 'Август 2025',
        type: 'regular'
    },
    {
        city: 'adler',
        src: '../Image/travel/adler10.jpg',
        title: 'Черноморское побережье',
        desc: 'Путешествие по Краснодарскому краю',
        date: 'Август 2025',
        type: 'tall'
    },
    {
        city: 'samara',
        src: '../Image/travel/samara6.jpg',
        title: 'Самара | Лето',
        desc: 'Путешествие по городу',
        date: 'Июль 2023',
        type: 'tall'
    },
    {
        city: 'samara',
        src: '../Image/travel/samara7.jpg',
        title: 'Самара | Лето',
        desc: 'Путешествие по городу',
        date: 'Июль 2023',
        type: 'tall'
    },
    {
        city: 'samara',
        src: '../Image/travel/samara8.jpg',
        title: 'Самара | Лето',
        desc: 'Путешествие по городу',
        date: 'Июль 2023',
        type: 'wide'
    },
    {
        city: 'samara',
        src: '../Image/travel/samara9.jpg',
        title: 'Самара | Лето',
        desc: 'Путешествие по городу',
        date: 'Июль 2023',
        type: 'regular'
    },
    {
        city: 'tolyatti',
        src: '../Image/travel/tolyatti7.jpg',
        title: 'Тольятти | Лето',
        desc: 'Путешествие по замку Гарибальди',
        date: 'Июль 2023',
        type: 'regular'
    }
];

loadMoreBtn.addEventListener('click', function() {
    // Показываем следующую порцию фотографий
    const galleryGrid = document.getElementById('galleryGrid');
    const activeFilter = document.querySelector('.city-filter-btn.active').dataset.city;

    let addedItems = 0;
    const batchSize = 6;

    for (let i = loadedItems; i < morePhotos.length && addedItems < batchSize; i++) {
        const photo = morePhotos[i];

        // Проверяем фильтр
        if (activeFilter !== 'all' && activeFilter !== photo.city) {
            continue;
        }

        const item = document.createElement('div');
        const typeClass = photo.type === 'tall' ? 'tall' :
                         photo.type === 'wide' ? 'wide' :
                         photo.type === 'extra-wide' ? 'extra-wide' : '';

        item.className = `gallery-item ${typeClass}`;
        item.dataset.city = photo.city;
        item.style.opacity = '0';
        item.style.animationDelay = `${addedItems * 0.1}s`;

        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="photo-overlay">
                <div class="photo-info">
                    <h3>${photo.title}</h3>
                    <p>${photo.desc}</p>
                    <span class="photo-date">${photo.date}</span>
                </div>
            </div>
        `;

        galleryGrid.appendChild(item);

        // Анимация появления
        setTimeout(() => {
            item.style.opacity = '1';
        }, 50);

        // Добавляем обработчик клика для нового элемента
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const info = this.querySelector('.photo-info');

            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalTitle.textContent = info.querySelector('h3').textContent;
            modalDescription.textContent = info.querySelector('p').textContent;
            modalDate.textContent = info.querySelector('.photo-date').textContent;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        addedItems++;
        loadedItems++;
    }

    // Скрываем кнопку, если больше нет фотографий
    if (loadedItems >= morePhotos.length + 12) {
        loadMoreBtn.style.display = 'none';
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Все фотографии загружены';
    }

    // Обновляем список элементов галереи для фильтрации
    setTimeout(() => {
        galleryItems = document.querySelectorAll('.gallery-item');
    }, 100);
});

// Закрытие модального окна по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Закрытие модального окна при клике вне изображения
document.addEventListener('click', function(e) {
    if (modal.classList.contains('active') && e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Добавляем плавную прокрутку для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});