import storage from 'electron-json-storage';

const dataPath = storage.getDataPath();
console.log(dataPath);
// We can move storage function here when things get
// more complicated, for now it's ok to write directly
// inside vuex, but I leave this file here, for future
