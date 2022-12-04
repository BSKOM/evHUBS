/* import { answer, curtim, durat, next, play, settime, setvolume, topage } from './handlers';  example for module used */

/* start my "event HUBS technology"
https://github.com/BSKOM/eventHBS */

const onEvent = (e) => disp(e);

//list for events:
const els = () => document.querySelectorAll('*[handler]');

const answer=(e) => {};
const durat=(e) => {};
const curtim=(e) => {};
const play=(e) => {};

const evHUB = {
  answer,    //handler answers quiz
  curtim,    //handler audio currenttime
  durat,     //handler audio duration
  play       //handler audio play/stop
};

function disp(ev) {
  const listeners = els(); // listeners collection
  const evtArr = ev.target.getAttribute('evt').split(' ');
  const indexEvt = [...evtArr].indexOf(ev.type);
  if (indexEvt < 0) { console.log('event type error'); return };
  const handlerName = ev.target.getAttribute('handler').split(' ')[indexEvt];

  evHUB[handlerName](ev); /* call handler*/

  /* set multiple listerers (may be handler  add active elements) */
  [...listeners].map((el) => {
    const evtArr = el.getAttribute('evt').split(' ');
    const handlerArr = el.getAttribute('handler').split(' ');
    if (evtArr.length !== handlerArr.length) console.log('evt !== handler error!!!'); // check attr evt handler
    [...evtArr].map((elm) => el.addEventListener(elm, onEvent) );
  });
}
