const express = require('express');

const routes = express.Router();

const GruposController = require('./controllers/GruposController');
const LinhasController = require('./controllers/LinhasController');
const MarcasController = require('./controllers/MarcasController');
const MovimentosController = require('./controllers/MovimentosController');
const UsersController = require('./controllers/UsersController');
const ProdutosController = require('./controllers/ProdutosController');

routes.get('/', (request, response) => {
    response.json({
        message: 'Bem-vindo ao servidor Coffee Tech!',
    });
});

routes.get('/grupos', GruposController.index);
routes.get('/searchGrupo/:idGrp', GruposController.searchGrp);
routes.put('/updgrupo/:idGrp', GruposController.updGrupo);
routes.post('/newgrupo', GruposController.create);

routes.get('/linhas', LinhasController.index);
routes.get('/searchLinha/:idLnh', LinhasController.searchLnh);
routes.put('/updlinha/:idLnh', LinhasController.updLinha);
routes.post('/newlinha', LinhasController.create);

routes.get('/marcas', MarcasController.index);
routes.get('/searchMarca/:idMar', MarcasController.searchMar);
routes.put('/updmarca/:idMar', MarcasController.updMarca);
routes.post('/newmarca', MarcasController.create);

routes.get('/movimentos', MovimentosController.index);
routes.get('/searchMovim/:idMov', MovimentosController.searchMov);
routes.put('/updmovim/:idMov', MovimentosController.updMovim);
routes.post('/newmovim', MovimentosController.create);

routes.post('/signIn', UsersController.signIn);
routes.post('/newuser', UsersController.newuser);

routes.get('/produtos', ProdutosController.index);
routes.get('/searchPro/:idPro', ProdutosController.searchPro);
routes.put('/updProduto/:idPro', ProdutosController.updProduto);
routes.post('/newproduto', ProdutosController.create);

module.exports = routes;
