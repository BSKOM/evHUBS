/* import { answer, curtim, durat, next, play, settime, setvolume, topage } from './handlers';  example for module used */

/* ========= handlers (pref. in any module) ============== */

const durat = (e) => {
  const audioSlider = document.querySelector('.play-input');
  audioSlider.style.setProperty('--gr-vall', `${audioSlider.value}%`)
  audioSlider.style.setProperty('--gr-valr', `${Math.floor(audioSlider.value / 2)}%`)
};

const curtim = (e) => {
  const audio = e.target;
  const audioSlider = document.querySelector('.play-input');
  audioSlider.style.setProperty('--gr-vall', `${audioSlider.value}%`)
  audioSlider.style.setProperty('--gr-valr', `${Math.floor(audioSlider.value / 2)}%`)
  audioSlider.value = (audio.currentTime * audioSlider.max / audio.duration).toFixed(3)
};

const play = (e) => {
  const audio = document.getElementById('song');
  const icon = audio.paused ? 'pause' : 'play';
  audio.paused ? audio.play() : audio.pause();
  e.target.style = `background-image: url( './${icon}.svg');`
};
/* ==================== end handlers ================= */
/* ===== start my "event HUBS technology" ============
   ===== https://github.com/BSKOM/eventHBS =========== */

const onEvent = (e) => disp(e);

/* list for events: */
const setListeners = () => {
  const listeners = document.querySelectorAll('*[handler]');
  [...listeners].map((el) => {
    const evtArr = el.getAttribute('evt').split(' ');
    const handlerArr = el.getAttribute('handler').split(' ');
    // check attr evt handler
    if (evtArr.length !== handlerArr.length) console.log('evt !== handler error!!!');
    [...evtArr].map((elm) => el.addEventListener(elm, onEvent));
  });
};

/* ======= FUll Events Handlers List ========*/

const evHUB = {
  curtim,    //handler audio currenttime
  durat,     //handler audio duration
  play       //handler audio play/stop
};

/* dispatcher all events */

function disp(ev) {
  /* get the handler name from the element attribute */
  const evtArr = ev.target.getAttribute('evt').split(' ');
  const indexEvt = [...evtArr].indexOf(ev.type);
  if (indexEvt < 0) { console.log('event type error'); return };
  const handlerName = ev.target.getAttribute('handler').split(' ')[indexEvt];
  evHUB[handlerName](ev); /* call handler*/
  setListeners();   /* set all listerers (may be handler add active elements) */
};

/*========= Start app ==============*/

setListeners();
