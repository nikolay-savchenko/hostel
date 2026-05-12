// Плавная прокрутка к якорям
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Подсветка активного пункта меню при прокрутке
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    link.style.borderBottomColor = 'transparent';
    
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = '#2563eb';
      link.style.borderBottomColor = '#2563eb';
    }
  });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.info-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Функция для отправки письма
function sendEmail(subject) {
  const email = 'info@hostcomfort.ru';
  const body = `Здравствуйте! Я заинтересован в размещении в хостеле "Комфорт".\n\nОжидаю Вашего ответа.`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Обработка формы обратной связи (если будет добавлена)
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо за Ваше сообщение! Мы свяжемся с Вами в ближайшее время.');
    contactForm.reset();
  });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  console.log('Сайт загружен успешно');
});

// Отслеживание ссылок для аналитики (если использоваться Google Analytics)
document.querySelectorAll('a[href*="hostcomfort.ru"]').forEach(link => {
  link.addEventListener('click', function() {
    if (window.gtag) {
      gtag('event', 'click', {
        'event_category': 'engagement',
        'event_label': this.href
      });
    }
  });
});
