document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов
    const title = document.querySelector('.contacts-content h2');
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');

    // Анимация заголовка
    setTimeout(() => {
        title.classList.add('animate');
    }, 300);

    // Анимация блока с контактной информацией
    setTimeout(() => {
        contactInfo.classList.add('animate');
    }, 500);

    // Анимация формы
    setTimeout(() => {
        contactForm.classList.add('animate');
    }, 700);

    // Обработка отправки формы
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь будет логика отправки формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Пример анимации успешной отправки
        const button = form.querySelector('button');
        button.innerHTML = '<i class="fas fa-check"></i> Отправлено';
        button.style.backgroundColor = '#4CAF50';
        
        // Сброс формы через 2 секунды
        setTimeout(() => {
            form.reset();
            button.innerHTML = 'Отправить';
            button.style.backgroundColor = '';
        }, 2000);
    });
}); 