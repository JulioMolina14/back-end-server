
const {io} = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands');

const bandas= new Bands();
bandas.addBand(new Band('Queen'));
bandas.addBand(new Band('Metalica'));
bandas.addBand(new Band('Link Park'));
bandas.addBand(new Band('System of Dowm'));
console.log(bandas);

io.on('connection', client => {
   
    console.log('Cliente conectado');

    client.emit('bandasactivas',bandas.getBands());
   client.on('disconnect', () => { 
     console.log('Cliente desconectado');
    });
 
    client.on('mensaje emitido' ,(payload)=>{
      console.log(`nombre : ${payload['nombre']}, apellido : ${payload['apellido']}`);
 
 
      io.emit('mensaje emitido2',{admin: 'numero mensaje'});
    });

    client.on('emitir-mensaje',(payload)=>{
      console.log(payload);
      io.emit('new-mensaje',payload);
     
    });

    client.on('votando-bandas', function(paylod){
      bandas.voteBand(paylod.id);
      io.emit('bandasactivas',bandas.getBands());
    });

    client.on('añandiendo-banda',function(payload){
      const bandanew=new Band(payload.name);
      bandas.addBand(bandanew);
      io.emit('bandasactivas',bandas.getBands())
    });

    client.on('eliminate-banda', function(payload){
      bandas.deleteBand(payload.id);
      io.emit('bandasactivas',bandas.getBands());
      
    });
 
 
 
 
 });