const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const marcas = await connection('marcas')
        .select('*');
    
        return response.json(marcas);
    },

    async searchMar (request, response) {
        let id = request.params.idMar;
        const marca = await connection('marcas')
        .where('marId', id)
        .select('*');
    
        return response.json(marca);
    },

    async updMarca(request, response) {
        let id = request.params.idMar;         
        const { marDescricao } = request.body;
        
        await connection('marcas').where('marId', id)   
        .update({
            marDescricao                  
        });
           
        return response.status(204).send();
    },

    async create(request, response) {
        const { marDescricao } = request.body;
 
        const [marId] = await connection('marcas').insert({
            marDescricao
        });
           
        return response.json({marId});
    },
};
