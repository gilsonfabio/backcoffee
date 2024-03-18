const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const movimentos = await connection('tipmovim')
        .select('*');
    
        return response.json(movimentos);
    },

    async searchMov (request, response) {
        let id = request.params.idMov;
        const movimento = await connection('tipmovim')
        .where('tpmId', id)
        .select('*');
    
        return response.json(movimento);
    },

    async updMovim(request, response) {
        let id = request.params.idMov;         
        const { tpmDescricao, tpmOperacao } = request.body;
        
        await connection('tipmovim').where('tpmId', id)   
        .update({
            tpmDescricao,       
            tpmOperacao        
        });
           
        return response.status(204).send();
    },

    async create(request, response) {
        const { tpmDescricao, tpmOperacao } = request.body;
 
        const [tpmId] = await connection('tipmovim').insert({
            tpmDescricao,
            tpmOperacao
        });
           
        return response.json({tpmId});
    },
};
