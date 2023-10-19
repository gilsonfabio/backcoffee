const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv/config');

module.exports = {       
    
    async signIn(request, response) {
        let email = request.body.email;
        let senha = request.body.password;

        console.log('Email:', email);
        console.log('Password:', senha);

        const usuario = await connection('usuarios')
            .where('usrEmail', email)
            .select(`usrId`, `usrNome`, `usrEmail`, `usrPassword`)
            .first();
        
        if (!usuario) {            
            return response.status(400).json({ error: 'Não encontrou usuário com este ID'});
        } 

        //console.log(user.usrPassword)
        //let pass = usuario.usrPassword;
        //const match = await bcrypt.compare(senha, pass)

        //if(!match) {
        //    return response.status(403).send({ auth: false, message: 'User invalid!' });
        //}

        const user = {
            id: usuario.usrId,
            name: usuario.usrNome,
            email: usuario.usrEmail
        }

        //let token = jwt.sign({ id: user.usrId, name: user.usrNome, email: user.usrEmail, nivel: user.usrNivAcesso }, process.env.SECRET_JWT, {
        //    expiresIn: '1h'
        //});
        //let refreshToken = jwt.sign({ id: user.usrId, name: user.usrNome, email: user.usrEmail, nivel: user.usrNivAcesso  }, process.env.SECRET_JWT_REFRESH, {
        //    expiresIn: '2h'
        //});
        console.log(user);
        
        return response.json(user);

    },

    async newuser(request, response) {
        console.log(request.body);
        const {name, cpf, nascimento, email, phone , password} = request.body;
        let status = 'A'; 
        let snhCrypt = await bcrypt.hash(password, saltRounds);

        const [usrId] = await connection('usuarios').insert({
            usrNome: name,
            usrEmail: email, 
            usrPassword: snhCrypt,
            usrCelular: phone, 
            usrStatus: status
        });
           
        return response.json({usrId});
    },
    
};