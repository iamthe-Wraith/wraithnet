import fs from 'fs';
import path from 'path';
import { ipcRenderer } from 'electron';

(async () => {
  const watcher = fs.watch(path.resolve('.', 'dist'));
  watcher.on('change', () => {
    ipcRenderer.send('re-render');
  });
})();
