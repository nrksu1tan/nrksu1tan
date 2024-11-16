// language.js

document.addEventListener("DOMContentLoaded", function() {
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.startsWith('ru') ? 'ru' : 'en';
  
    const translations = {
      'ru': {
        'nav_about': 'Обо мне',
        'nav_skills': 'Навыки',
        'nav_projects': 'Проекты',
        'nav_gallery': 'Галерея',
        'nav_contact': 'Контакты',
        'hero_title': 'Программист по профессии',
        'hero_subtitle': 'Фотограф по призванию',
        'about_title': 'Кто я?',
        'about_text': 'Привет, я Нурсултан — увлеченный Frontend разработчик и фотограф-любитель...',
        'education_title': 'Образование',
        'education_item1': 'Университет X, Бакалавр компьютерных наук (2015-2019)',
        'education_item2': 'Курсы по веб-разработке, Онлайн-школа Y (2020)',
        'resume_btn': 'Резюме',
        'skills_title': 'Мои навыки',
        'projects_title': 'Мои работы',
        'project1_title': 'Сайт генеалогического древа',
        'project1_desc': 'Интерактивный инструмент визуализации с использованием JavaScript.',
        'view_project_btn': 'Посмотреть проект',
        'gallery_title': 'Галерея',
        'contact_title': 'Свяжитесь со мной',
        'contact_subtitle': 'Есть проект или хотите просто пообщаться? Заполните форму ниже или найдите меня в социальных сетях.',
        'name_placeholder': 'Ваше имя',
        'email_placeholder': 'Ваш Email',
        'message_placeholder': 'Ваше сообщение',
        'send_message_btn': 'Отправить сообщение',
        'find_me_title': 'Найдите меня здесь',
      },
      'en': {
        'nav_about': 'About Me',
        'nav_skills': 'Skills',
        'nav_projects': 'Projects',
        'nav_gallery': 'Gallery',
        'nav_contact': 'Contact',
        'hero_title': 'Coder by trade',
        'hero_subtitle': 'Photographer by passion',
        'about_title': 'Who am I?',
        'about_text': 'Hi, I\'m Nursultan – a passionate Frontend Developer and amateur photographer...',
        'education_title': 'Education',
        'education_item1': 'University X, Bachelor of Computer Science (2015-2019)',
        'education_item2': 'Web Development Courses, Online School Y (2020)',
        'resume_btn': 'Resume',
        'skills_title': 'My Skills',
        'projects_title': 'My Works',
        'project1_title': 'Family Tree Website',
        'project1_desc': 'An interactive visualization tool using JavaScript.',
        'view_project_btn': 'View Project',
        'gallery_title': 'Gallery',
        'contact_title': 'Get in Touch',
        'contact_subtitle': 'Have a project or just want to chat? Fill out the form below or find me on social media.',
        'name_placeholder': 'Your Name',
        'email_placeholder': 'Your Email',
        'message_placeholder': 'Your Message',
        'send_message_btn': 'Send Message',
        'find_me_title': 'Find me here',
      }
    };
  
    document.querySelectorAll('[data-lang]').forEach(el => {
      const key = el.getAttribute('data-lang');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
      const key = el.getAttribute('data-lang-placeholder');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });
  });
  