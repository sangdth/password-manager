import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';

export default new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db'),
  afterSerialization: function (doc) {
    // const msg = doc.split('').reverse().join('');
    
		console.log('this is afterSerialization with ' + doc );
    return doc;
		// var encrypted = doc;
		
		// try{
		// 	var ef;
		// 	if(JSON.parse(doc) && isNaN(doc)){
		// 		var cipher = crypto.createCipher(algorithm, key);
		// 		encrypted=cipher.update(JSON.stringify(doc), 'utf8', 'hex') + cipher.final('hex');
		// 		ef = encrypted;
		// 		console.log("Ser" +encrypted);
		// 		return encrypted;
		// 		}
		// }catch(e){
		// 		
		// }
		// da=encrypted;
		
	},
  beforeDeserialization: function(doc) {
    // const msg = doc.split('').reverse().join('');
    
		console.log('this is beforeDeserialization with ' + doc );
    return doc;
  }
});
