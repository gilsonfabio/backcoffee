const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const linhas = await connection('linhas')
        .select('*');
    
        return response.json(linhas);
    },

    async searchLnh (request, response) {
        let id = request.params.idLnh;
        const linha = await connection('linhas')
        .where('idLinha', id)
        .select('*');
    
        return response.json(linha);
    },

    async updLinha(request, response) {
        let id = request.params.idLnh;         
        const { lnhDescricao, lnhGrpId } = request.body;
        
        await connection('linhas').where('idLinha', id)   
        .update({
            lnhDescricao,
            lnhGrpId                  
        });
           
        return response.status(204).send();
    },

    async create(request, response) {
        const { lnhDescricao, lnhGrpId } = request.body;
 
        const [idLinha] = await connection('linhas').insert({
            lnhDescricao,
            lnhGrpId
        });
           
        return response.json({idLinha});
    },
};
