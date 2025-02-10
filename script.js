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
