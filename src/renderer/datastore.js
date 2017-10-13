import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';

export default new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db')
});

// got error that can not read length of
