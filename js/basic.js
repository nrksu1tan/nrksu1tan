// Убираем прелоадер после загрузки страницы
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  preloader.style.pointerEvents = 'none';
  setTimeout(() => {
      preloader.style.display = 'none';
  }, 500);
});

// Меню бургер
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

menuIcon.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Закрытие мобильного меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
      navMenu.classList.remove('active');
  });
});

// Эффект стеклянной шапки при скролле
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if(window.scrollY > 50) {
      header.classList.add('scrolled');
  } else {
      header.classList.remove('scrolled');
  }
});

// Мультиязычность
const langToggle = document.getElementById('lang-toggle');
const elements = document.querySelectorAll('[data-key]');

// Тексты на разных языках
const texts = {
  'ru': {
      'nav-about': 'Обо мне',
      'nav-skills': 'Навыки',
      'nav-projects': 'Проекты',
      'nav-contact': 'Контакты',
      'hero-title': 'Coder by trade',
      'hero-subtitle': 'photographer by passion',
      'about-title': 'Кто я?',
      'about-text': 'Привет, я Нурсултан — увлеченный Frontend разработчик и фотограф-любитель. Я специализируюсь на создании удобных и интуитивно понятных пользовательских интерфейсов, а также люблю запечатлевать моменты через объектив камеры.<br><br>Будь то написание чистого и масштабируемого кода или исследование творчества через игры и фотографию, я всегда стремлюсь к инновациям.',
      'resume-button': 'Резюме',
      'skills-title': 'Мои навыки',
      'projects-title': 'Мои работы',
      'project1-title': 'Сайт генеалогического древа',
      'project1-description': 'Интерактивный инструмент визуализации с использованием JavaScript.',
      'project2-title': 'Онлайн-портфолио',
      'project2-description': 'Демонстрация моих навыков и творчества.',
      'project3-title': 'Сайт лекций университета',
      'project3-description': 'Ресурсный центр для академических материалов.',
      'project-button': 'Посмотреть проект',
      'contact-title': 'Свяжитесь со мной',
      'contact-text': 'Есть проект или хотите просто пообщаться? Заполните форму ниже или найдите меня в социальных сетях.',
      'contact-button': 'Отправить сообщение',
      'contact-find-me': 'Найдите меня здесь',
      'contact-phone': 'Телефон: +123 456 7890'
  },
  'en': {
      'nav-about': 'About Me',
      'nav-skills': 'Skills',
      'nav-projects': 'Projects',
      'nav-contact': 'Contact',
      'hero-title': 'Coder by trade',
      'hero-subtitle': 'photographer by passion',
      'about-title': 'Who am I?',
      'about-text': 'Hello, I am Nursultan — a passionate Frontend Developer and amateur photographer. I specialize in creating user-friendly and intuitive interfaces and love capturing moments through the lens of a camera.<br><br>Whether it\'s writing clean and scalable code or exploring creativity through games and photography, I always strive for innovation.',
      'resume-button': 'Resume',
      'skills-title': 'My Skills',
      'projects-title': 'My Works',
      'project1-title': 'Family Tree Website',
      'project1-description': 'Interactive visualization tool using JavaScript.',
      'project2-title': 'Online Portfolio',
      'project2-description': 'Showcase of my skills and creativity.',
      'project3-title': 'University Lecture Site',
      'project3-description': 'Resource center for academic materials.',
      'project-button': 'View Project',
      'contact-title': 'Get in Touch',
      'contact-text': 'Have a project or just want to chat? Fill out the form below or find me on social media.',
      'contact-button': 'Send Message',
      'contact-find-me': 'Find me here',
      'contact-phone': 'Phone: +123 456 7890'
  }
};

// Функция для смены языка
function changeLanguage(lang) {
  elements.forEach(el => {
      const key = el.getAttribute('data-key');
      if(texts[lang][key]) {
          el.innerHTML = texts[lang][key];
      }
  });
}

// Определение языка устройства
const userLang = navigator.language || navigator.userLanguage;
if(userLang.startsWith('en')) {
  changeLanguage('en');
  langToggle.textContent = 'RU';
} else {
  changeLanguage('ru');
  langToggle.textContent = 'EN';
}

// Переключение языка по кнопке
langToggle.addEventListener('click', () => {
  if(langToggle.textContent === 'EN') {
      changeLanguage('en');
      langToggle.textContent = 'RU';
  } else {
      changeLanguage('ru');
      langToggle.textContent = 'EN';
  }
});
