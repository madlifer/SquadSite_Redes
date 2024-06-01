const internal = document.getElementById('internal');
internal.addEventListener('click', (event) => {
    if (event.target.innerText == 'Normal') {
        internal.innerText = 'Internal';
    } else {
        internal.innerText = 'Normal';
    }
});

import { PageName } from './vicPage.js';
const internal2 = document.getElementById('internal2');
if (PageName.length > 1) {
    internal2.addEventListener('click', (event) => {
        if (event.target.innerText == 'Normal') {
            internal2.innerText = 'Internal';
        } else {
            internal2.innerText = 'Normal';
        }
    });
}
