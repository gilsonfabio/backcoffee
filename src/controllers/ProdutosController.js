const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const produtos = await connection('procoffee')
        .select('*')
        .orderBy('proDescricao');
    
        return response.json(produtos);
    },

    async searchPro (request, response) {
        let id = request.params.idPro;
       
        const produto = await connection('procoffee')
        .where('proId', id)
        .join('grupos', 'grpId', 'procoffee.proGrpId')
        .join('linhas', 'lnhId', 'procoffee.proLnhId')
        .select(['procoffee.*', 'grupos.grpDescricao as proDesGrupo', 'linhas.lnhDescricao as proDesLinha']);
        
        return response.json(produto);
    },

    async updProduto(request, response) {
        let id = request.params.idPro;         
        const { proDescricao } = request.body;
        
        await connection('procoffee').where('proId', id)   
        .update({
            proDescricao                  
        });
           
        return response.status(204).send();
    },

    async create(request, response) {
        const {proDescricao, proReferencia, proGrpId, proLnhId, proUnidade, proCodBarra, proVlrCusto, proVlrVenda, proEstDisponivel} = request.body;
 
        let status = 'A';
        const [proId] = await connection('procoffee').insert({
            proDescricao,
            proReferencia, 
            proGrpId, 
            proLnhId, 
            proUnidade, 
            proCodBarra, 
            proVlrCusto, 
            proVlrVenda, 
            proEstDisponivel,
            proStatus: status
        });
           
        return response.json({proId});
    },
};
