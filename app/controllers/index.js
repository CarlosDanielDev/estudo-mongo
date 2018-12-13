module.exports.index = function(application, req, res){
	res.render('index', {validacao:{}});
}

module.exports.autenticar = function(application, req, res){
	// res.send('constroller ok');
	let dadosForm = req.body;

	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio').notEmpty();

	let errors = req.validationErrors();
	if(errors){
		res.render('index', {validacao:errors});
		return;
	}
	let conn = application.config.dbConn;
	let UsersDAO = new application.app.models.UsersDAO(conn);
	UsersDAO.autenticar(dadosForm, req, res);
	// res.send('Ok sessão criada');
}