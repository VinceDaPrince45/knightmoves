import './style.css';
import { createBoard } from './board';
import { runCheck } from './tree';

createBoard();
const body = document.querySelector('body');
body.addEventListener('click', (e) => {
    console.log(e.target)
})

runCheck();