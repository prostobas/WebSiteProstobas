<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuBtn = document.querySelector('.menu-btn');
    const menuClose = document.querySelector('.menu-close');
    const navMenu = document.querySelector('.nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    menuBtn.addEventListener('click', () => {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
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
=======
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuBtn = document.querySelector('.menu-btn');
    const menuClose = document.querySelector('.menu-close');
    const navMenu = document.querySelector('.nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    menuBtn.addEventListener('click', () => {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
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
>>>>>>> dab3b53 (Удалил вложенный репозиторий my-website)
}); 