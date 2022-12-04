Здравствуйте уважаемые поклонники JavaScript!
В этом ролике я расскажу о выложенном мною на GitHub в феврале 2022 года техническом решении Events HUBS ( https://github.com/BSKOM/eventHBS ).
Цель разработки:
 1) Получение инструмента позволяющего легко справляться со сложными логическими построениями асинхронных событий.
2) Обеспечение движения в сторону декларативной парадигмы программирования с визуализацией основных составляющих процесса
3) Само-документирование основных компонент в легкой для восприятия форме.
4) Исключение обилия переменных, наличие которых скрывает логику происходящего и значительно увеличивает размер программы.
5)Снижение сложности алгоритма ввиду исключения сравнений для выбора обработчика.

Механизм реализации.
1)	Активным элементам, которые подлежат прослушиванию добавляем кастомные атрибуты:
evt - содержит список типов событий.
handlers – содержит список программ обработчиков событий.
Пример:*
<audio hidden="" handlers="durat curtim" evt="loadedmetadata timeupdate"  id="songc"></audio>**
2)	Получаем коллекцию элементов содержащих атрибут handlers, 
(listeners).
const listeners = () => document.querySelectorAll('*[handlers]');
3)	Добавляем слушатели всем элементам коллекции *
[...listeners].map((el) => {
      const handlerArr = el.getAttribute('handler').split(' ');
      [...handlerArr].map((elm) => el.addEventListener(elm, onEvent) );
    });
4)	onEvent – универсальная программа-обработчик для  метода addEventListener:
const onEvent = (e) => disp(e);
5)	Объект evHUB – содержит перечень всех обработчиков событий а также комментарии кратко описывающие назначение каждого обработчика, Ключи объекта совпадают с названиями программ обработчиков 
Пример:
const evHUB = {
  answer,    //handler answers quiz
  curtim,    //handler audio currenttime
  durat,     //handler audio duration
  next,      //handler nextpage quiz
  play,      //handler audio play/stop
  settime,   //handler time slider
  setvolume, //handler volume slider
  topage     //handler change page
};
6)	Функция disp -диспетчер обеспечивает запуск программы обработчика событий из перечня в объекте evHUB

function disp(ev) {
,,,,
  const evtArr = ev.target.getAttribute('evt').split(' ');
  const indexEvt = [...evtArr].indexOf(ev.type);
  const handlerName = ev.target.getAttribute('handler').split(' ')[indexEvt];
  evHUB[handlerName](ev);***
,,,,
}
Ключевая строка - evHUB[handlerName](ev);
 вызывает программу обработчик,
*примеры взяты из реализации таска - Song Bird.
**вложенный map реализует возможность установки множества слушателей на одном элементе.
*** Все строки кода функции кроме последней имеют техническое значение – получение из созданных нами атрибутов типа события и названия программы обработчика.
