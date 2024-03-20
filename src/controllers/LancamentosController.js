const moment = require('moment');
const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const lancamentos = await connection('lancamentos')
        .join('procoffee', 'proId', 'lancamentos.lanProId')
        .join('tipmovim', 'tpmId', 'lancamentos.lanTpmId')
        .select(['lancamentos.*', 'procoffee.proDescricao', 'procoffee.proReferencia', 'tipmovim.tpmDescricao'])
        .orderBy('lanData');
    
        return response.json(lancamentos);
    },

    async searchLanc (request, response) {
        let id = request.body.idPro;
        let datinicial = request.body.dtInicial;
       
        const lancprod = await connection('lancamentos')
        .where('proId', id)
        .where('lanData', '>=', datinicial)
        .join('procoffee', 'proId', 'lancamentos.lanProId')
        .join('tipmovim', 'tpmId', 'lancamentos.lanTpmId')
        .select(['lancamentos.*', 'procoffee.proDescricao', 'procoffee.proReferencia', 'tipmovim.tpmDescricao']);
        
        return response.json(lancprod);
    },

    async create(request, response) {
        const {lanProId, lanTpmId, lanEstMovim, lanResId} = request.body;

        let datProcess = new Date();
        let year = datProcess.getFullYear();
        let month = datProcess.getMonth();
        let day = datProcess.getDate();
        let datMovim = new Date(year,month,day);
        let horMovim = moment().format('hh:mm:ss');

        let status = 'A';

        const produto = await connection('procoffee')
        .where('proId', lanProId)
        .select('*');
        
        let estDisponivel = produto[0].proEstDisponivel;

        const tipmov = await connection('tipmovim')
        .where('tpmId', lanTpmId)
        .select('*');

        let operacao = tipmov[0].tpmOperacao;
        
        let estAtual = parseInt(0);
        if (operacao === 'A') {
            estAtual = parseInt(estDisponivel) + parseInt(lanEstMovim)
        }else {
            if (operacao === 'S') {
                estAtual = parseInt(estDisponivel) - parseInt(lanEstMovim)
            }else {
                if (operacao === 'M') {
                    estAtual = parseInt(lanEstMovim)
                }
            }
        }
         
        const [lanId] = await connection('lancamentos').insert({
            lanProId, 
            lanTpmId, 
            lanData: datMovim, 
            lanHora: horMovim, 
            lanEstAnterior: estDisponivel, 
            lanEstMovim, 
            lanEstAtual: estAtual, 
            lanResId, 
            lanStatus: status
        });

        const updProd = await connection('procoffee').where('proId', lanProId)   
        .update({
            proEstDisponivel: estAtual                  
        });

        return response.status(200).send();
    },
};
