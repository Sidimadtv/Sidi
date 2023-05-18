const { ipcRenderer } = require('electron');

document.getElementById('minimize').addEventListener('click', () => {
    ipcRenderer.send('min');
})

document.getElementById('maximize').addEventListener('click', () => {
    ipcRenderer.send('max');
})