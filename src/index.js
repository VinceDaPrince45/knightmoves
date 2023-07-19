import './style.css';
import { createBoard } from './board';

createBoard();
const body = document.querySelector('body');
body.addEventListener('click', (e) => {
    console.log(e.target)
})