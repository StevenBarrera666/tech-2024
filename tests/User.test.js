const request = require('supertest')//libreria para probar APIs
const app = require('../index')

const objectToTest = {
    "id": 4784532,
    "name": 'Lucia',
    "lastname": 'Pardo',
    "email": 'luciaa-pardo10@correo.com',
    "password":'Usuario de prueba'

}
let userId;
let token;
 

// describe('GET /',() => {
//     it('responds with status 200',async () =>{
//         const response = await request(app).get('/');
//         expect(response.status).toBe(400);
//         expect(response.text).toBe('Hello world')
//     })
// })


// describe('GET /',() => {
//     it('responds with status 200',async () =>{
//         const response = await request(app).get('/user');
//         const objectToTest= {
//             "_id": "65cfd1186d0d9df807ca9130",
//             "id": 1234567890,
//             "name": "John",
//             "lastname": "Doe",
//             "email": "john.doe@example.com",
//             "password": "$2b$10$fk.V/ZO44mnHv2GXncNF5eA1a0.n4sXVyyIbi.M88t5ag.4IVyQta",
//             "__v": 0
//         }
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual(expect.arrayContaining([objectToTest]))
//     })
// })

describe('POST /user', () =>{
    it('create a new user in the DB and response with the data', async () =>{
      
/** Asignando el _id del usuario nuevo a la variable userId*/
/*para ser usadas*/
        const response = await request(app).post('/user').send(objectTotest)
        userId = response.body._id;


        expect(response.StatusCode).toBe(200)
        expect(response.body).tohaveProperty('_id')
        expect(response.body.name).toBe(objectTotest.name)
        expect(response.body.lastname).toBe(objectTotest.lastname)
        expect(response.body.email).toBe(objectTotest.email)

    })
    
})

describe('GET /user/:id', () =>{
    it('response with an Object contains an specific User', async () =>{
      
/** Asignando el _id del usuario nuevo a la variable userId*/
/*para ser usadas*/
        const response = await request(app).get('/user/'+ userId);

        expect(response.status).toBe(200);       
        expect(typeof response.body === "object").toBe(true);
        expect(response.body).tohaveProperty('_id')
        expect(response.body.name).toBe(objectTotest.name)
        expect(response.body.lastname).toBe(objectTotest.lastname)
        expect(response.body.email).toBe(objectTotest.email)

    })
    
})


describe('POST /login', () =>{
    it('Succes login with email and password', async () =>{
      
/** Asignando el _id del usuario nuevo a la variable userId*/
/*para ser usadas*/
        const response = await request(app).post('/login').send(objectTotest)

        token = response .body.token;
        expect(response.StatusCode).toBe(200)
        expect(response.body).tohaveProperty('token')
        expect(response.body.status).toBe('success')
    
    })

    it('Error login with email ans password', async ()  =>{
        const user = {
            "email":"lucia-pardo10@correo.com",
            "password":"<usuarioDeDprueba1111"
        }

        const response = await require(app).post('/login').send(user)

        expect(response.statusCode).toBe(401)
        expect(response.body).not.tohaveProperty('token')
        expect(response.body.status).toBe('error')

    })
    
})


describe('POST /delete', () =>{
    it('Success delete with _id', async () =>{
      
/** Asignando el _id del usuario nuevo a la variable userId*/
/*para ser usadas*/
        const response = await request(app).delete('/user/'+ userId).set('Authorization', 'Bearer ' + token);

        expect(response.StatusCode).toBe(200)
        expect(response.body.status).toBe('success')

      

    })
    
})