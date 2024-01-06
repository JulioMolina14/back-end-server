
const {io} = require('../index');

io.on('connection', client => {
   
    console.log('Cliente conectado');
   client.on('disconnect', () => { 
     console.log('Cliente desconectado');
    });
 
    client.on('mensaje emitido' ,(payload)=>{
      console.log(`nombre : ${payload['nombre']}, apellido : ${payload['apellido']}`);
 
 
      io.emit('mensaje emitido2',{admin: 'numero mensaje'});
    });
 
 
 
 
 });