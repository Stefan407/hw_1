/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
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

        let dataResponse = JSON.parse(xhr.response);
        resolve(dataResponse.sort((a, b) => a.name.localeCompare(b.name)));
      }
    };

  })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок ошибки */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function () {
  updateFilter(this.value)
});
retryButton.addEventListener('click', function () {
  tryToLoad();
});
loadingFailedBlock.style.display = "none";
filterBlock.style.display = "none";

async function tryToLoad() {
  try {
    towns = await loadTowns();
    loadingBlock.classList.add('hidden');
    loadingFailedBlock.classList.add('hidden');
    filterBlock.classList.remove('hidden');
  } catch (e) {
    loadingBlock.classList.add('hidden');
    loadingFailedBlock.classList.remove('hidden');
  }
}

function updateFilter(filterValue) {
  filterResult.innerHTML = '';

  const fragment = document.createDocumentFragment();

  for (const town of towns) {
    if (filterValue && isMatching(town.name, filterValue)) {
      const townDiv = document.createElement('div');
      townDiv.textContent = town.name;
      fragment.append(townDiv);
    }
  }

  filterResult.append(fragment);
}

tryToLoad();

export {
  loadTowns,
  isMatching
};
