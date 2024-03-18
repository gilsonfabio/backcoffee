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
        const { tpmDescricao, tpmTipo } = request.body;
        
        await connection('tipmovim').where('tpmId', id)   
        .update({
            tpmDescricao,       
            tpmTipo           
        });
           
        return response.status(204).send();
    },

    async create(request, response) {
        const { tpmDescricao, tpmTipo } = request.body;
 
        const [tpmId] = await connection('tipmovim').insert({
            tpmDescricao,
            tpmTipo
        });
           
        return response.json({tpmId});
    },
};
