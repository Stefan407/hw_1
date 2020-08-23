/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(fn(array[i], i, array))
  }
  return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  let result = initial || array[0];
  for (let i = initial ? 0 : 1; i < array.length; i += 1) {
    let value = array[i];
    result = fn(result, value, i, array);
  }
  return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let names = Object.keys(obj);
  names.map((item, i, arr) => {
    arr[i] = item.toUpperCase();
  })
  return names;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
  if ((from === undefined && to === undefined) || (from === 0 && to === undefined) || (from === undefined &&
      to === 0)) {
    return array;
  }

  const result = [];
  let internalForm = from;

  if (from === undefined) {
    internalForm = 0;
  }
  if (internalForm < 0) {
    internalForm = 0;
  }
  if (internalForm >= array.length) {
    return [];
  }

  let internalTo = to;
  if (to === undefined) {
    internalTo = array.length;
  }
  if (internalTo < 0) {
    internalTo = array.length + to;
  }
  if (to > array.length) {
    internalTo = array.length;
  }
  for (let position = internalForm; position < internalTo; position++) {
    result.push(array[position]);
  }
  return result;
}
/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  const handler = {
    get: function (obj, prop) {
      return obj[prop] * obj[prop];
    }
  }
  return new Proxy(obj, handler)
}

export {
  forEach,
  map,
  reduce,
  upperProps,
  slice,
  createProxy
};