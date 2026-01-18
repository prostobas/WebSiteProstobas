document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты
    initTravelMap();
    
    // Инициализация табов городов
    initCityTabs();
    
    // Инициализация временной шкалы
    initTimelineAnimation();
    
    // Инициализация анимации статистики
    initStatsAnimation();
});

// Карта путешествий
function initTravelMap() {
    const mapElement = document.getElementById('travelMap');
    
    if (!mapElement) return;
    
    // Создаем карту
    const map = L.map('travelMap').setView([55.7558, 37.6173], 5);
    
    // Добавляем слой карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);
    
    // Города, которые посетил
    const visitedCities = [
        {
            name: 'Москва',
            coords: [55.7558, 37.6173],
            description: 'Столица России<br>Посещено: 5 раз<br>Фото: 850+',
            iconColor: '#4169E1'
        },
        {
            name: 'Адлер',
            coords: [43.4285, 39.9238],
            description: 'Черноморское побережье<br>Посещено: 3 раза<br>Фото: 1200+',
            iconColor: '#32CD32'
        },
        {
            name: 'Самара',
            coords: [53.1959, 50.1002],
            description: 'Город на Волге<br>Посещено: 4 раза<br>Фото: 700+',
            iconColor: '#FF8C00'
        },
        {
            name: 'Тольятти',
            coords: [53.5078, 49.4204],
            description: 'Автомобильная столица<br>Посещено: 6 раз<br>Фото: 600+',
            iconColor: '#9370DB'
        },
        {
            name: 'Пенза',
            coords: [53.2007, 45.0046],
            description: 'Родной город<br>Проживаю постоянно<br>Фото: 2000+',
            iconColor: '#FF1493'
        }
    ];
    
    // Планируемые города
    const plannedCities = [
        {
            name: 'Карелия',
            coords: [63.1111, 32.9756],
            description: 'Планируется: Апрель 2026<br>Земля тысячи озёр',
            iconColor: '#00CED1'
        },
        {
            name: 'Санкт-Петербург',
            coords: [59.9343, 30.3351],
            description: 'Планируется: Июнь 2026<br>Культурная столица',
            iconColor: '#8A2BE2'
        },
        {
            name: 'Алтай',
            coords: [50.0132, 86.1328],
            description: 'Планируется: Лето 2027<br>Горный край',
            iconColor: '#228B22'
        }
    ];
    
    // Добавляем маркеры для посещенных городов
    visitedCities.forEach(city => {
        const marker = L.marker(city.coords).addTo(map);
        marker.bindPopup(`
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: ${city.iconColor};">${city.name}</h3>
                <p style="margin: 0;">${city.description}</p>
            </div>
        `);
        
        // Кастомные иконки
        const visitedIcon = L.divIcon({
            className: 'visited-marker',
            html: `<div style="
                width: 20px;
                height: 20px;
                background: ${city.iconColor};
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
            "></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        marker.setIcon(visitedIcon);
    });
    
    // Добавляем маркеры для планируемых городов
    plannedCities.forEach(city => {
        const marker = L.marker(city.coords).addTo(map);
        marker.bindPopup(`
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: ${city.iconColor};">${city.name}</h3>
                <p style="margin: 0;">${city.description}</p>
            </div>
        `);
        
        // Кастомные иконки для планируемых
        const plannedIcon = L.divIcon({
            className: 'planned-marker',
            html: `<div style="
                width: 15px;
                height: 15px;
                background: ${city.iconColor};
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
                animation: pulse 2s infinite;
            "></div>`,
            iconSize: [15, 15],
            iconAnchor: [7.5, 7.5]
        });
        
        marker.setIcon(plannedIcon);
    });
    
    // Добавляем маршруты (примерные линии)
    const routeCoordinates = [
        [[53.2007, 45.0046], [53.5078, 49.4204]], // Пенза - Тольятти
        [[53.5078, 49.4204], [53.1959, 50.1002]], // Тольятти - Самара
        [[53.1959, 50.1002], [55.7558, 37.6173]], // Самара - Москва
        [[55.7558, 37.6173], [43.4285, 39.9238]]  // Москва - Адлер
    ];
    
    routeCoordinates.forEach(route => {
        L.polyline(route, {
            color: '#4169E1',
            weight: 2,
            opacity: 0.5,
            dashArray: '5, 10'
        }).addTo(map);
    });
    
    // Добавляем стили для анимации пульсации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Управление табами городов
function initCityTabs() {
    const tabs = document.querySelectorAll('.city-tab');
    const contents = document.querySelectorAll('.cities-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const city = this.dataset.city;
            
            // Удаляем активный класс у всех табов
            tabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс текущему табу
            this.classList.add('active');
            
            // Скрываем все контенты
            contents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Показываем выбранный контент
            const targetContent = document.getElementById(`${city}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Автопрокрутка фотографий в галерее городов
    initCityGalleryScroll();
}

// Автопрокрутка фотографий в галерее городов
function initCityGalleryScroll() {
    const galleries = document.querySelectorAll('.city-gallery');
    
    galleries.forEach(gallery => {
        const photos = gallery.querySelectorAll('.city-photo');
        let currentIndex = 0;
        
        setInterval(() => {
            if (photos.length > 4) {
                photos[currentIndex].style.opacity = '0.7';
                currentIndex = (currentIndex + 1) % photos.length;
                photos[currentIndex].style.opacity = '1';
            }
        }, 3000);
    });
}

// Анимация временной шкалы
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.5s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}
// Анимация чисел
function animateValue(element) {
    const finalValue = parseFloat(element.textContent.replace('k', '000').replace('+', ''));
    const duration = 2000;
    const startValue = 0;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Используем easing функцию для плавности
        const easeOutQuad = t => t * (2 - t);
        const currentValue = startValue + (finalValue - startValue) * easeOutQuad(progress);
        
        // Форматируем значение
        let displayValue;
        if (finalValue >= 1000) {
            displayValue = (currentValue / 1000).toFixed(1).replace('.0', '') + 'k';
        } else {
            displayValue = Math.floor(currentValue);
        }
        
        if (element.textContent.includes('+')) {
            displayValue += '+';
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Планировщик поездок
function initTripPlanner() {
    const tripCards = document.querySelectorAll('.trip-card');
    
    tripCards.forEach(card => {
        card.addEventListener('click', function() {
            const status = this.querySelector('.trip-status').textContent;
            const title = this.querySelector('.trip-title').textContent;
            const date = this.querySelector('.trip-date').textContent;
            
            // Показываем модальное окно с деталями поездки
            showTripDetails({
                status: status,
                title: title,
                date: date,
                description: this.querySelector('.trip-description').textContent
            });
        });
    });
}

// Показать детали поездки
function showTripDetails(trip) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'trip-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <span class="trip-status">${trip.status}</span>
                <h3>${trip.title}</h3>
                <p class="trip-date">${trip.date}</p>
            </div>
            <div class="modal-body">
                <p>${trip.description}</p>
                <div class="planning-tools">
                    <h4>Инструменты для планирования:</h4>
                    <div class="tools-grid">
                        <a href="https://www.booking.com" target="_blank" class="tool-card">
                            <i class="fas fa-hotel"></i>
                            <span>Жилье</span>
                        </a>
                        <a href="https://www.aviasales.ru" target="_blank" class="tool-card">
                            <i class="fas fa-plane"></i>
                            <span>Авиабилеты</span>
                        </a>
                        <a href="https://yandex.ru/maps" target="_blank" class="tool-card">
                            <i class="fas fa-map"></i>
                            <span>Карты</span>
                        </a>
                        <a href="https://www.tripadvisor.ru" target="_blank" class="tool-card">
                            <i class="fas fa-star"></i>
                            <span>Отзывы</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие модального окна
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Добавляем стили для модального окна
    const style = document.createElement('style');
    style.textContent = `
        .trip-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: #121212;
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            border: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 1001;
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .modal-header {
            margin-bottom: 30px;
        }
        
        .modal-header h3 {
            color: #fff;
            font-size: 2rem;
            margin: 10px 0;
        }
        
        .trip-status {
            display: inline-block;
            padding: 5px 15px;
            background: rgba(50, 205, 50, 0.1);
            color: #32CD32;
            border-radius: 15px;
            font-size: 0.9rem;
        }
        
        .trip-date {
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
        }
        
        .modal-body p {
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.6;
            margin-bottom: 30px;
        }
        
        .planning-tools h4 {
            color: #fff;
            margin-bottom: 20px;
        }
        
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .tool-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            text-decoration: none;
            color: #fff;
            transition: all 0.3s ease;
            border: 1px solid transparent;
        }
        
        .tool-card:hover {
            background: rgba(65, 105, 225, 0.1);
            border-color: #4169E1;
            transform: translateY(-3px);
        }
        
        .tool-card i {
            font-size: 1.5rem;
            color: #4169E1;
            margin-bottom: 10px;
            display: block;
        }
    `;
    
    document.head.appendChild(style);
}

// Инициализация планировщика при загрузке
document.addEventListener('DOMContentLoaded', initTripPlanner);
