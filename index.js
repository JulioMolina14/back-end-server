const expres=require('express');
const app= expres();
const path = require('path');
require('dotenv').config();

//SERVIDOR
const server = require('http').createServer(app);
module.exports.io  = require('socket.io')(server);

require('./sockets/socket')



const publicPath = path.resolve(__dirname,'public')

app.use(expres.static(publicPath));


server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err);
    console.log('servidor corriendo en puerto' ,process.env.PORT)
});