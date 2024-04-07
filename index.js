const express = require('express') //Importo la libreria
const app = express() //Inicializacion de la variable que usara la libreria
const router = express.Router(); // Enrutar los servicios web
const port = 3000; // Escuchar la ejecucion del servidor
require('dotenv').config() // Obetenmos las variables de entorno

/**web Sockets*/
const socket = require('socket.io')//importamos la libreria socket
const cors = require('cors');
app.use(cors());
const http = require('http').Server(app)//vamos a requerir la libreria http
const io = socket(http)// se le asocia el servidor al web socket

/** Importar la libreria server de graphQL */
const { createYoga } = require('graphql-yoga');
const schema = require('./graphql/schema');

/** Conexion a BD */
const DB_URL = process.env.DB_URL || '';
const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect(DB_URL)
// Creo la cadena de conexion


/**importacion de rutas */
const userRoutes = require('./routes/UserRoutes');
const houseRoutes = require('./routes/HouseRoutes');
const messageRoutes = require('./routes/MessageRoutes');

const MessageSchema = require('./models/Mensajes')
// const { log } = require('console');


//Metodo [GET, POST, PUT, PATCH, DELETE]
// Nombre del servicio [/]
router.get('/', (req, res) => {
    //Informacion a modificar
    res.send("Hello world")
})

/**Metodos Websocket */
io.on('connect',(socket) => {
    console.log("connected")
    //Escuchando eventos desde el servidor
    socket.on('message',(data) => {
        try{
                 /**Almacenamos el mensaje en la BD */
        const payload = JSON.parse(data);
        console.log(payload)

        '//IMPORTANT: Almacenamos el mensaje en la BD '
        
        MessageSchema(payload).save().then((result)=>{
            //ENVIAMOS EL MENSAJE A TODOS LOS CLIENTES CONECTADOS AL WEBSOCKET
        socket.broadcast.emit('message-receipt',payload)
        }).catch((err)=>{
            console.log({"status": "error", "message":err.message})
        })
        }catch(error){
            console.log('Error parsing JSON:',error);
        }
   
        
    })
    //Con el metodo emit, se emiten eventos hacia el cliente.
    //En el postman para que funcione el servicio, se debe configurar como socket.io y configurarlo con http://localhost:9090
    

    socket.on('disconnect', (socket) => {
        console.log('Usuario desconectado')
    })


})

/** Configuraciones express */
app.use(express.urlencoded({extended: true})) // Acceder a la informacion de las urls
app.use(express.json()) // Analizar informacion en formato JSON
app.use((req,res,next)=> {
    res.io = io 
    next()
})

const yoga = new createYoga({ schema });
app.use('/graphql', yoga);


//Ejecuto el servidor
app.use(router)
app.use('/uploads', express.static('uploads'));
app.use('/', userRoutes)
app.use('/', houseRoutes)
app.use('/', messageRoutes)
http.listen(port, () => {
    console.log('Listen on ' + port)
})

module.exports = http