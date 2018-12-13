function UsersDAO(conn){
	//recebe objeto de conexão com database mongo
	console.log(conn);
	this._conn = conn();
}
// recebe parametro dos dados do formulário
UsersDAO.prototype.inserirUser = function(user){
		console.log(this._conn);
		//abrir conexão com o banco de dados MONGODB
		this._conn.open(function(error, mongoClient){
		//função collection() permite manipular os documentos dentro das coleções, espera 2 parametros. Coleção e função de callback.
		mongoClient.collection("users", function(error, collection){
			collection.insert(user);
			mongoClient.close();
		});
	});
}
UsersDAO.prototype.autenticar = function(user, req, res){
	console.log(user);
	this._conn.open(function(error, mongoClient){
		mongoClient.collection("users", function(error, collection){
			// collection.find({usuario:{$eq: user.usuario}, senha:{$eq: user.senha}});
			collection.find(user).toArray(function(error, result){
				if (result[0] != undefined) {
					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;

					req.session.casa = result[0].casa;
				}
				if (req.session.autorizado) {
					res.redirect('jogo');
				}else{
					res.render('index', {validacao:{}});
				}
			});
			mongoClient.close();
		});
	});
}
module.exports = function(){
	return UsersDAO;
}