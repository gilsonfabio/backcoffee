const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const grupos = await connection('grupos')
        .select('*');
    
        return response.json(grupos);
    },

    async searchGrp (request, response) {
        let id = request.params.idGrp;
       
        const grupo = await connection('grupos')
        .where('grpId', id)
        .select('*');
        
        return response.json(grupo);
    },

    async updGrupo(request, response) {
        let id = request.params.idGrp;         
        const { grpDescricao } = request.body;
        
        await connection('grupos').where('grpId', id)   
        .update({
            grpDescricao                  
        });
           
        return response.status(204).send();
    },

    async create(request, response) {
        const { grpDescricao } = request.body;
 
        const [grpId] = await connection('grupos').insert({
            grpDescricao
        });
           
        return response.json({grpId});
    },
};
