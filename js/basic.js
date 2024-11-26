
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  preloader.classList.add('hidden');
});



document.addEventListener('DOMContentLoaded', () => {
  const playPauseButton = document.getElementById('playPauseButton');
  const audioPlayer = new Audio(
    "https://github.com/nrksu1tan/nrksu1tan/raw/refs/heads/main/assets/music/irina-kairatovna-vsem-salam_yhQTaZit.mp3"
  );
  const progressBar = document.getElementById('progressBar');
  const trackTime = document.getElementById('trackTime');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeSliderFill = document.getElementById('volumeSliderFill');
  const volumeIcon = document.getElementById('volumeIcon');
  let isPlaying = false;

  // Кнопка воспроизведения/паузы
  playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
      audioPlayer.pause();
      playPauseButton.innerHTML = '&#9658;'; // Play icon
    } else {
      audioPlayer.play().catch((err) => {
        console.error("Ошибка воспроизведения: ", err);
        alert("Не удалось воспроизвести трек. Проверьте URL или доступ к аудио.");
      });
      playPauseButton.innerHTML = '&#10073;&#10073;'; // Pause icon
    }
    isPlaying = !isPlaying;
  });

  // Обновление прогресс-бара и времени трека
  audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration || 0;
    const progressPercent = (currentTime / duration) * 100;

    progressBar.style.width = `${progressPercent}%`;
    trackTime.innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`;
  });

  // Регулировка громкости
  volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    audioPlayer.volume = volume;
    volumeSliderFill.style.width = `${volume * 100}%`;
    volumeIcon.innerHTML =
      volume > 0.5 ? '&#128266;' : volume > 0 ? '&#128265;' : '&#128263;';
  });

  // Форматирование времени
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Загрузка аудиофайла (проверка)
  audioPlayer.addEventListener('error', () => {
    console.error("Ошибка загрузки аудиофайла: ", audioPlayer.error);
    alert("Не удалось загрузить аудиофайл. Проверьте URL.");
  });
});














// Создание <meta>, если его нет
function createThemeMeta() {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'theme-color');
  document.head.appendChild(meta);
  return meta;
}

// Конвертер RGB → HEX
function rgbToHex(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}


// Создание <meta>, если его нет
function createThemeMeta() {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'theme-color');
  document.head.appendChild(meta);
  return meta;
}

// Конвертер RGB → HEX
function rgbToHex(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}


// Функция для преобразования RGB в HEX
function rgbToHex(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}


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

window.onload = init;

function init() {
  var root = new THREERoot({
    createCameraControls: !true,
    antialias: (window.devicePixelRatio === 1),
    fov: 60
  });

  root.renderer.setClearColor(0x000000);
  root.renderer.setPixelRatio(window.devicePixelRatio || 1);
  root.camera.position.set(0, 0, 600);

  var textAnimation = createTextAnimation();
  root.scene.add(textAnimation);

  var light = new THREE.DirectionalLight();
  light.position.set(0, 0, 1);
  root.scene.add(light);

  var tl = new TimelineMax({
    repeat: -1,
    repeatDelay: 0.5,
    yoyo: true
  });
  tl.fromTo(textAnimation, 4, {
      animationProgress: 0.0
    }, {
      animationProgress: 0.6,
      ease: Power1.easeInOut
    },
    0
  );
  tl.fromTo(textAnimation.rotation, 4, {
    y: 0
  }, {
    y: Math.PI * 2,
    ease: Power1.easeInOut
  }, 0);

  createTweenScrubber(tl);
}

function createTextAnimation() {
  var geometry = generateTextGeometry('AS THE WORLD TURNS', {
    size: 40,
    height: 12,
    font: 'droid sans',
    weight: 'bold',
    style: 'normal',
    curveSegments: 24,
    bevelSize: 2,
    bevelThickness: 2,
    bevelEnabled: true,
    anchor: {
      x: 0.5,
      y: 0.5,
      z: 0.0
    }
  });

  THREE.BAS.Utils.tessellateRepeat(geometry, 1.0, 2);

  THREE.BAS.Utils.separateFaces(geometry);

  return new TextAnimation(geometry);
}

function generateTextGeometry(text, params) {
  var geometry = new THREE.TextGeometry(text, params);

  geometry.computeBoundingBox();

  var size = geometry.boundingBox.size();
  var anchorX = size.x * -params.anchor.x;
  var anchorY = size.y * -params.anchor.y;
  var anchorZ = size.z * -params.anchor.z;
  var matrix = new THREE.Matrix4().makeTranslation(anchorX, anchorY, anchorZ);

  geometry.applyMatrix(matrix);

  return geometry;
}

////////////////////
// CLASSES
////////////////////

function TextAnimation(textGeometry) {
  var bufferGeometry = new THREE.BAS.ModelBufferGeometry(textGeometry);

  var aAnimation = bufferGeometry.createAttribute('aAnimation', 2);
  var aEndPosition = bufferGeometry.createAttribute('aEndPosition', 3);
  var aAxisAngle = bufferGeometry.createAttribute('aAxisAngle', 4);

  var faceCount = bufferGeometry.faceCount;
  var i, i2, i3, i4, v;

  var maxDelay = 0.0;
  var minDuration = 1.0;
  var maxDuration = 1.0;
  var stretch = 0.05;
  var lengthFactor = 0.001;
  var maxLength = textGeometry.boundingBox.max.length();

  this.animationDuration = maxDuration + maxDelay + stretch + lengthFactor * maxLength;
  this._animationProgress = 0;

  var axis = new THREE.Vector3();
  var angle;

  for (i = 0, i2 = 0, i3 = 0, i4 = 0; i < faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
    var face = textGeometry.faces[i];
    var centroid = THREE.BAS.Utils.computeCentroid(textGeometry, face);
    var centroidN = new THREE.Vector3().copy(centroid).normalize();

    // animation
    var delay = (maxLength - centroid.length()) * lengthFactor;
    var duration = THREE.Math.randFloat(minDuration, maxDuration);

    for (v = 0; v < 6; v += 2) {
      aAnimation.array[i2 + v] = delay + stretch * Math.random();
      aAnimation.array[i2 + v + 1] = duration;
    }

    // end position
    var point = utils.fibSpherePoint(i, faceCount, 200);

    for (v = 0; v < 9; v += 3) {
      aEndPosition.array[i3 + v] = point.x;
      aEndPosition.array[i3 + v + 1] = point.y;
      aEndPosition.array[i3 + v + 2] = point.z;
    }

    // axis angle
    axis.x = centroidN.x;
    axis.y = -centroidN.y;
    axis.z = -centroidN.z;

    axis.normalize();

    angle = Math.PI * THREE.Math.randFloat(0.5, 2.0);

    for (v = 0; v < 12; v += 4) {
      aAxisAngle.array[i4 + v] = axis.x;
      aAxisAngle.array[i4 + v + 1] = axis.y;
      aAxisAngle.array[i4 + v + 2] = axis.z;
      aAxisAngle.array[i4 + v + 3] = angle;
    }
  }

  var material = new THREE.BAS.PhongAnimationMaterial({
    shading: THREE.FlatShading,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      uTime: {
        type: 'f',
        value: 0
      }
    },
    shaderFunctions: [
      THREE.BAS.ShaderChunk['cubic_bezier'],
      THREE.BAS.ShaderChunk['ease_out_cubic'],
      THREE.BAS.ShaderChunk['quaternion_rotation']
    ],
    shaderParameters: [
      'uniform float uTime;',
      'uniform vec3 uAxis;',
      'uniform float uAngle;',
      'attribute vec2 aAnimation;',
      'attribute vec3 aEndPosition;',
      'attribute vec4 aAxisAngle;'
    ],
    shaderVertexInit: [
      'float tDelay = aAnimation.x;',
      'float tDuration = aAnimation.y;',
      'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
      'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'
      // 'float tProgress = tTime / tDuration;'
    ],
    shaderTransformPosition: [
      'transformed = mix(transformed, aEndPosition, tProgress);',

      'float angle = aAxisAngle.w * tProgress;',
      'vec4 tQuat = quatFromAxisAngle(aAxisAngle.xyz, angle);',
      'transformed = rotateVector(tQuat, transformed);',
    ]
  }, {
    diffuse: 0x444444,
    specular: 0xcccccc,
    shininess: 4
      //emissive:0xffffff
  });

  THREE.Mesh.call(this, bufferGeometry, material);

  this.frustumCulled = false;
}
TextAnimation.prototype = Object.create(THREE.Mesh.prototype);
TextAnimation.prototype.constructor = TextAnimation;

Object.defineProperty(TextAnimation.prototype, 'animationProgress', {
  get: function() {
    return this._animationProgress;
  },
  set: function(v) {
    this._animationProgress = v;
    this.material.uniforms['uTime'].value = this.animationDuration * v;
  }
});

function THREERoot(params) {
  params = utils.extend({
    fov: 60,
    zNear: 10,
    zFar: 100000,

    createCameraControls: true
  }, params);

  this.renderer = new THREE.WebGLRenderer({
    antialias: params.antialias
  });
  this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  document.getElementById('three-container').appendChild(this.renderer.domElement);

  this.camera = new THREE.PerspectiveCamera(
    params.fov,
    window.innerWidth / window.innerHeight,
    params.zNear,
    params.zfar
  );

  this.scene = new THREE.Scene();

  if (params.createCameraControls) {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  this.resize = this.resize.bind(this);
  this.tick = this.tick.bind(this);

  this.resize();
  this.tick();

  window.addEventListener('resize', this.resize, false);
}
THREERoot.prototype = {
  tick: function() {
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  },
  update: function() {
    this.controls && this.controls.update();
  },
  render: function() {
    this.renderer.render(this.scene, this.camera);
  },
  resize: function() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

////////////////////
// UTILS
////////////////////

var utils = {
  extend: function(dst, src) {
    for (var key in src) {
      dst[key] = src[key];
    }

    return dst;
  },
  randSign: function() {
    return Math.random() > 0.5 ? 1 : -1;
  },
  ease: function(ease, t, b, c, d) {
    return b + ease.getRatio(t / d) * c;
  },
  // mapEase:function(ease, v, x1, y1, x2, y2) {
  //   var t = v;
  //   var b = x2;
  //   var c = y2 - x2;
  //   var d = y1 - x1;
  //
  //   return utils.ease(ease, t, b, c, d);
  // },
  fibSpherePoint: (function() {
    var v = {
      x: 0,
      y: 0,
      z: 0
    };
    var G = Math.PI * (3 - Math.sqrt(5));

    return function(i, n, radius) {
      var step = 2.0 / n;
      var r, phi;

      v.y = i * step - 1 + (step * 0.5);
      r = Math.sqrt(1 - v.y * v.y);
      phi = i * G;
      v.x = Math.cos(phi) * r;
      v.z = Math.sin(phi) * r;

      radius = radius || 1;

      v.x *= radius;
      v.y *= radius;
      v.z *= radius;

      return v;
    }
  })()
};

function createTweenScrubber(tween, seekSpeed) {
  seekSpeed = seekSpeed || 0.001;

  function stop() {
    TweenMax.to(tween, 1, {
      timeScale: 0
    });
  }

  function resume() {
    TweenMax.to(tween, 1, {
      timeScale: 1
    });
  }

  function seek(dx) {
    var progress = tween.progress();
    var p = THREE.Math.clamp((progress + (dx * seekSpeed)), 0, 1);

    tween.progress(p);
  }

  var _cx = 0;

  // desktop
  var mouseDown = false;
  document.body.style.cursor = 'pointer';

  window.addEventListener('mousedown', function(e) {
    mouseDown = true;
    document.body.style.cursor = 'ew-resize';
    _cx = e.clientX;
    stop();
  });
  window.addEventListener('mouseup', function(e) {
    mouseDown = false;
    document.body.style.cursor = 'pointer';
    resume();
  });
  window.addEventListener('mousemove', function(e) {
    if (mouseDown === true) {
      var cx = e.clientX;
      var dx = cx - _cx;
      _cx = cx;

      seek(dx);
    }
  });
  // mobile
  window.addEventListener('touchstart', function(e) {
    _cx = e.touches[0].clientX;
    stop();
    e.preventDefault();
  });
  window.addEventListener('touchend', function(e) {
    resume();
    e.preventDefault();
  });
  window.addEventListener('touchmove', function(e) {
    var cx = e.touches[0].clientX;
    var dx = cx - _cx;
    _cx = cx;

    seek(dx);
    e.preventDefault();
  });
}

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



