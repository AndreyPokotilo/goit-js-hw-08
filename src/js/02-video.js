import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const PLAYER__KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem(PLAYER__KEY, seconds);
}

const saveTime = Number(localStorage.getItem(PLAYER__KEY));

player.setCurrentTime(saveTime);
