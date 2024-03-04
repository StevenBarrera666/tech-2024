const express = require('express');
const router = express.Router();
const MessageSchema = require('../models/Mensajes');


router.get('/message',async(req,res) =>{
    //Traer todos los usuarios
    let messages = await MessageSchema.find()
    .populate({
        path:'from',
        select:'-password'        })
    .populate({
        path:'to',
        select:'-password' })
    res.json(messages)
});

router.post('/messages',async (req, res) =>{
    //Crear un usuario
    let user = MessageSchema({
        body: req.body.body,
        from: req.body.from,
        to: req.body.to
    })
    user.save().then((result)=>{
        res.send(result)
    }).cath((err)=>{
        res.send({"status" : "error", "message" :err.message})
    })

})

module.exports = router;





// // Importar el módulo 'express' que es un framework web para Node.js
// const express = require('express');

// // Crear una instancia del enrutador de Express
// const router = express.Router();

// // Importar el esquema de mensajes definido en '../models/Mensajes'
// const MessageSchema = require('../models/Mensajes');

// // Definir una ruta GET '/chat'
// router.get('/chat', async (req, res) => {
//     // Buscar todos los mensajes en la base de datos utilizando el modelo 'MessageSchema'
//     // y realizar una operación de población (populate) en los campos 'from' y 'to'
//     let messages = await MessageSchema.find().populate('from').populate('to');
    
//     // Responder con los mensajes encontrados en formato JSON
//     res.json(messages);
// });

// // Definir una ruta POST '/messages'
// router.post('/messages', async (req, res) => {
//     // Crear un nuevo mensaje utilizando los datos proporcionados en el cuerpo de la solicitud
//     let message = MessageSchema({
//         body: req.body.body, // El cuerpo del mensaje
//         from: req.body.from, // El remitente del mensaje
//         to: req.body.to      // El destinatario del mensaje
//     });

//     // Guardar el mensaje en la base de datos
//     message.save().then((result) => {
//         // Si se guarda correctamente, responder con el mensaje guardado
//         res.send(result);
//     }).catch((err) => {
//         // Si hay un error al guardar, responder con un mensaje de error
//         res.send({"status": "error", "message": err.message});
//     });
// });

// // Exportar el enrutador para que pueda ser utilizado por otros archivos
// module.exports = router;

