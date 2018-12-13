// import mongoDB
let mongo = require('mongodb');

let conn = function(){
	console.log('entrou na função de Connection');
	let db = new mongo.Db(
			'game',
			new mongo.Server(
				'localhost', //string server database
				27017, //porta padrao
				{}
				),
			{}
		);
	return db;
}
module.exports = function(){
	return conn;
}