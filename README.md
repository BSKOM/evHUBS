Здравствуйте уважаемые поклонники JavaScript!
В этом ролике я расскажу о выложенном мною на GitHub в феврале 2022 года техническом решении Events HUBS ( https://github.com/BSKOM/eventHBS ).
Цель разработки:
1) Получение инструмента позволяющего легко справляться со сложными логическими построениями асинхронных событий.
2) Обеспечение движения в сторону декларативной парадигмы программирования с визуализацией основных составляющих процесса
3) Само-документирование основных компонент в легкой для восприятия форме.
4) Имеет место обезличивание обработки всех видов событий (events) (повышению абстрактной составляющей) что приводит к обобщению и алгоритма их обработки за счет
исключения обилия переменных, (наличие которых скрывает логику происходящего и значительно увеличивает размер программы). 
5)Снижение сложности алгоритма ввиду исключения сравнений для выбора обработчика.
6)Работа по принципу "выстрелил и забыл" . Обеспечивается: 
  а) добавляем два атрибута (evts, handlers) в потенциально активные элементы,
  б) установка слушателей в теле функции disp после завершения процесса работы хандлера (программа обработчик события) а также вызывамых им функций в т ч изменяющих документ и добавляющих некие новые активные елементы.
7) Применение кастомных имен свойств атрибутов evt (тип события), handler 
  (имя программы-обработчика) обеспечивает возможность независимого использования технологии например только одним участником на части проекта без риска пересечения имен, при этом несомненно максимальная эффективность технологии проявляется именно когда все участники используют единый подход . Обьединение всех обработчиков "под одной крышей" (обьект evHUB с соответствующими комментариями - описание назначения программы обработчика) является важным средством визуализации позволяющим понять обшую структуру проекта.
8) Технология очень гармонично сочетается с модульной структурой проекта. Рекомендуется 
  все  программы обработчики поместисть в одном отдельной модуле с целью упрощения импорта.

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
5)	Объект evHUB – содержит перечень всех обработчиков событий а также   комментарии  
    кратко  описывающие назначение каждого обработчика, (Ключи объекта совпадают 
    с названиями программ обработчиков )
  Пример:
  const evHUB = {
    answer,    //handler answers quiz
    curtim,    //handler audio currenttime
    durat,     //handler audio duration
    play,      //handler audio play/stop
  };
6)	Функция disp -диспетчер обеспечивает запуск программы обработчика событий из перечня в объекте evHUB

function disp(ev) {
,,,,
  const evtArr = ev.target.getAttribute('evt').split(' ');
  const indexEvt = [...evtArr].indexOf(ev.type);
  const handlerName = ev.target.getAttribute('handler').split(' ')[indexEvt];
  evHUB[handlerName](ev);***
,,,,
  /* здесь установка слушателей тк возможно была модификация документа
  (такое же действие нужно произвести в стартовом модуле или в начале программы)
  потому возможно будет вынесено в отдельную функцию) */
    [...listeners].map((el) => {
    const evtArr = el.getAttribute('evt').split(' ');
...
    [...evtArr].map((elm) => el.addEventListener(elm, onEvent) );
}

Ключевая строка - evHUB[handlerName](ev);
 вызывает программу обработчик,
*примеры взяты из реализации таска - Song Bird.
**вложенный map реализует возможность установки множества слушателей на одном элементе.
*** Все строки кода функции кроме последней имеют техническое значение – получение из созданных нами атрибутов типа события и названия программы обработчика.

Изменения по сравнению с базовой версией от февраля 2022,
  a) Изменено название ресурсов с помощью которых получается тип события - теперь это атрибут evt. имя программы обработчика теперь получаем из атрибута handlers.
  б) Добавлена возможность отслеживать более одного события на елементе. 
    Для этого можно написать более одного наименования событий и обработчиков разделяя их пробелом,
  б) В disp - добавлено установка слушателей событий
