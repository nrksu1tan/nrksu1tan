document.addEventListener("DOMContentLoaded", () => {
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");
    const box4 = document.getElementById("box4");
    const status = document.getElementById("status");
    const preloader = document.querySelector(".preloader");
    const mainContent = document.getElementById("main-content");

    document.body.classList.add("no-scroll");
    window.onload = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto' // Без плавности, мгновенно
        });
      };
    // Отключение скролла


    // Фаза 1: Мигает и загорается box1
    setTimeout(() => {
        box1.style.opacity = 1;
        box1.style.backgroundColor = "#4caf50";
    }, 500);

    // Фаза 2: Загорается box2
    setTimeout(() => {
        box2.style.opacity = 1;
        box2.style.backgroundColor = "#4caf50";
    }, 2000);

    // Фаза 3: Загорается box4
    setTimeout(() => {
        box4.style.opacity = 1;
        box4.style.backgroundColor = "#4caf50";
    }, 3000);

    // Фаза 4: Загорается box3
    setTimeout(() => {
        box3.style.opacity = 1;
        box3.style.backgroundColor = "#4caf50";
    }, 3500);

    // Показ сообщения "Успешно!"
    setTimeout(() => {
        status.style.opacity=1;
    }, 4500);

    // Удаление сообщения "Успешно!" через 2 секунды
    setTimeout(() => {
        status.style.opacity=0;
    }, 7000);

    // Плавное исчезновение прелоадера и отображение основного контента
    setTimeout(() => {
        document.body.classList.remove("no-scroll");
        preloader.classList.add("faded-out");
        mainContent.classList.remove("hidden");

        // Включение скролла

    }, 8000);
});