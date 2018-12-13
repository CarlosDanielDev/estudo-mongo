module.exports.cadastro = function(application, req, res){
	res.render('cadastro', {validacao: {}, dadosForm:{}});
}

module.exports.cadastrar = function(application, req, res){

	let dadosForm = req.body;

	req.assert('nome', 'Nome não pode ser vazio').notEmpty();
	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Sennha não pode ser vazio').notEmpty();
	req.assert('casa', 'Casa não pode ser vazio').notEmpty();

	let erros =	req.validationErrors();

	if (erros) {
		res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
	}
	let conn = application.config.dbConn;
	let UsersDAO = new application.app.models.UsersDAO(conn);
	let JogoDAO = new application.app.models.JogoDAO(conn);
	UsersDAO.inserirUser(dadosForm);
	JogoDAO.gerarParametros(dadosForm.usuario);
	// Geração do parâmetros


	res.send('podemos cadastrar');
}