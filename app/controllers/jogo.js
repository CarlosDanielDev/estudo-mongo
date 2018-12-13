module.exports.jogo = function(application, req, res){
	if (req.session.autorizado !== true) {
		res.send('Usuário precisa fazer Login');
		return;
	}
	let user = req.session.usuario;
	let casa = req.session.casa;
	let conn = application.config.dbConn;
	let JogoDAO = new application.app.models.JogoDAO(conn);

	JogoDAO.iniciaJogo(res, user, casa);
	res.render('jogo', {img_casa:req.session.casa});
	
}
module.exports.sair = function(application, req, res){
	// res.send('saiu da seção');

	req.session.destroy(function(error){
		res.render('index', {validacao:{}});
	});
}