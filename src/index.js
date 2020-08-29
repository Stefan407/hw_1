/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve }, seconds)
  })
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  return new Promise((resolve) => {

    // 1. Создаём новый XMLHttpRequest-объект
    let xhr = new XMLHttpRequest();

    // 2. Настраиваем его: GET-запрос
    xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');

    // 3. Отсылаем запрос
    xhr.send();

    // 4. Этот код сработает после того, как мы получим ответ сервера
    xhr.onload = function () {
      if (xhr.status == 200) {
        // если всё прошло гладко, выводим результат
        let newArray = xhr.response.sort();
        resolve(newArray);
      }
    };

  })
}

export {
  delayPromise,
  loadAndSortTowns
};
