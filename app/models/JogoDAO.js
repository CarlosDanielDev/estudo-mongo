function JogoDAO(conn){
	this._conn = conn();
}
JogoDAO.prototype.gerarParametros = function(user){
	this._conn.open(function(error, mongoClient){
		mongoClient.collection('jogo', function(error, collection){
			collection.insert({
				usuario:user,
				moeda: 15,
				suditos:10,
				temor:Math.floor(Math.random()* 1000),
				sabedoria:Math.floor(Math.random()* 1000),
				comercio:Math.floor(Math.random()* 1000),
				magia:Math.floor(Math.random()* 1000)
			});
			mongoClient.close();
		});
	});
}

JogoDAO.prototype.iniciaJogo = function(res, user, casa){
	this._conn.open(function(error, mongoClient){
		mongoClient.collection('jogo', function(error, collection){
			collection.find({usuario: user}).toArray(function(error, result){
				// console.log(result);
				console.log(result[0]);
				res.render('jogo', {img_casa: casa, jogo: result[0]});
				mongoClient.close();
			});
		});
	});
}
module.exports = function(){
	return JogoDAO;
}