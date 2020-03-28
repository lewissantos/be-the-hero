const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async list(request, response) {
        const ongs = await connection('ong').select('*'); // QueryBuider: selectionando todas as ongs da tabela ong
        return response.json(ongs);
    },

    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
        const id = generateUniqueId();
     
        await connection('ong').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
    
        console.log('Name: ' + name);
        return response.json({id});
    
    }
};

