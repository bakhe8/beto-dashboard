import { version } from '@core';

const root = document.getElementById('modal-root')!;
root.innerHTML = `<p>Core version: ${version}</p>`;

