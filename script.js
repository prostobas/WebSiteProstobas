document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuBtn = document.querySelector('.menu-btn');
    const menuClose = document.querySelector('.menu-close');
    const navMenu = document.querySelector('.nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    menuBtn.addEventListener('click', () => {
        navMenu.classList.add('active');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Плавная прокрутка для ссылки "ABOUT US"
    document.querySelector('a[href="#about"]').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
        // Закрываем мобильное меню после клика
        navMenu.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });

    // Функция для управления видео в карточках
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        const videoWrapper = card.querySelector('.video-wrapper');
        
        // Добавляем обработчик клика на карточку
        videoWrapper.addEventListener('click', function(e) {
            // Проверяем, не кликнули ли мы по элементам управления
            if (e.target === videoWrapper || e.target === video) {
                if (video.paused) {
                    // Останавливаем все другие видео
                    document.querySelectorAll('video').forEach(v => {
                        if (v !== video) {
                            v.pause();
                        }
                    });
                    // Воспроизводим текущее видео
                    video.play();
                } else {
                    video.pause();
                }
            }
        });

        // Добавляем класс для интерактивности
        videoWrapper.classList.add('interactive');
    });

    // Управление историями
    const storyCards = document.querySelectorAll('.story-card');
    const modal = document.querySelector('.story-modal');
    const modalVideo = modal.querySelector('video');
    const closeBtn = modal.querySelector('.story-close');
    const progress = modal.querySelector('.progress');

    storyCards.forEach(story => {
        const video = story.querySelector('video');
        
        story.addEventListener('click', function() {
            console.log('Story clicked'); // Для отладки
            
            // Копируем источник видео
            modalVideo.src = video.src;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Ждем, пока видео загрузится
            modalVideo.addEventListener('loadedmetadata', function() {
                modalVideo.play();
                
                // Обновляем прогресс-бар
                const duration = modalVideo.duration;
                progress.style.transition = `width ${duration}s linear`;
                progress.style.width = '100%';
            });
            
            // Когда видео закончится
            modalVideo.onended = function() {
                closeStory();
            };
        });
    });

    // Функция закрытия истории
    function closeStory() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalVideo.pause();
        modalVideo.currentTime = 0;
        progress.style.width = '0';
    }
    
    // Закрытие по клику на кнопку
    closeBtn.addEventListener('click', closeStory);
    
    // Закрытие по клику вне видео
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeStory();
        }
    });

    // Добавляем обработку клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeStory();
        }
    });
});

// Плавная прокрутка для ссылки "ABOUT US"
document.querySelector('a[href="#about"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Скопировано';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    });
}

function toggleProfile() {
    const overlay = document.getElementById('profileOverlay');
    overlay.classList.toggle('active');
    
    if (overlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Функция для управления профилями партнеров
function togglePartnerProfile(partner) {
    const profileId = `profile${partner}`;
    const profileElement = document.getElementById(profileId);
    
    // Закрываем все открытые профили кроме текущего
    document.querySelectorAll('.profile-overlay').forEach(overlay => {
        if (overlay.id !== profileId) {
            overlay.classList.remove('active');
        }
    });

    if (profileElement) {
        profileElement.classList.toggle('active');
        if (profileElement.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Обновляем обработчики кликов для кнопок "Перейти"
document.querySelectorAll('.partner-link').forEach((link, index) => {
    link.onclick = (e) => {
        e.preventDefault();
        const partners = ['Alexander', 'Michael', 'Dmitry'];
        togglePartnerProfile(partners[index]);
    };
});

// Добавляем обработчик для всех кнопок закрытия через делегирование событий
document.addEventListener('click', (e) => {
    if (e.target.closest('.cancel-btn')) {
        const profileOverlay = e.target.closest('.profile-overlay');
        if (profileOverlay) {
            profileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});
// Галерея путешествий
// Обновлённая галерея для группировки по городам
document.addEventListener('DOMContentLoaded', function() {
    // Создаём модальное окно
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <button class="modal-nav modal-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="modal-nav modal-next"><i class="fas fa-chevron-right"></i></button>
            <img class="modal-image" src="" alt="">
            <div class="modal-info">
                <h3></h3>
                <p></p>
                <span class="modal-date"></span>
                <span class="modal-city"></span>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Собираем все фотографии из всех городов
    const galleryItems = document.querySelectorAll('.gallery-item');
    const itemsArray = Array.from(galleryItems);
    let currentIndex = 0;

    // Находим элементы модального окна
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-info h3');
    const modalDesc = modal.querySelector('.modal-info p');
    const modalDate = modal.querySelector('.modal-date');
    const modalCity = modal.querySelector('.modal-city');
    const modalClose = modal.querySelector('.modal-close');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');

    // Добавляем обработчики кликов на все фотографии
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            openModal();
        });
    });

    function openModal() {
        const item = itemsArray[currentIndex];
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('.photo-info h3').textContent;
        const desc = item.querySelector('.photo-info p').textContent;
        const date = item.querySelector('.photo-date').textContent;

        // Находим город из родительской секции
        const citySection = item.closest('.city-section');
        const cityName = citySection ? citySection.querySelector('.city-title').textContent.replace(/\s+/g, ' ') : '';

        modalImage.src = imgSrc;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalDate.textContent = date;
        modalCity.textContent = cityName;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % itemsArray.length;
        openModal();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
        openModal();
    }

    // Обработчики событий
    modalClose.addEventListener('click', closeModal);
    modalNext.addEventListener('click', showNext);
    modalPrev.addEventListener('click', showPrev);

    // Закрытие по клику вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Управление клавиатурой
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // Плавное появление элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми элементами галереи
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});
// Простая функция прокрутки
function scrollToTravel() {
    const travelSection = document.querySelector('.travel-section');
    if (travelSection) {
        travelSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
function scrollToTravel() {
    const travelSection = document.getElementById('travel');
    if (travelSection) {
        travelSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
// Мобильное меню
const menuBtn = document.querySelector('.menu-btn');
const menuClose = document.querySelector('.menu-close'); // Эта кнопка должна существовать
const navMenu = document.querySelector('.nav-menu');
const menuLinks = document.querySelectorAll('.nav-menu a');

menuBtn.addEventListener('click', () => {
    navMenu.classList.add('active');
    menuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Закрытие по крестику
menuClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuBtn.classList.remove('active');
    document.body.style.overflow = '';
});

// Закрытие по клику на ссылку
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
    });
});
// Добавляем обработчик клика на индикатор прокрутки
document.querySelector('.scroll-arrow').addEventListener('click', scrollToTravel);
// Анимация чисел статистики при появлении
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number-full');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const originalText = numberElement.textContent;
                const target = parseInt(originalText.replace(/[^0-9]/g, ''));

                // Анимируем только если число не анимировалось ранее
                if (!numberElement.dataset.animated) {
                    numberElement.dataset.animated = 'true';

                    let count = 0;
                    const duration = 2000;
                    const increment = target / (duration / 16);

                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            numberElement.textContent = originalText;
                            clearInterval(timer);
                        } else {
                            numberElement.textContent = Math.floor(count).toLocaleString();
                        }
                    }, 16);
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    statNumbers.forEach(number => {
        observer.observe(number);
    });
});