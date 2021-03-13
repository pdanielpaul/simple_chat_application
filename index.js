const path = require('path');
const express = require('express');
const app = express();
const mongo = require('./helper/mongoDB_queries');

// Require static assets from public folder
app.use(express.static('../public'));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views','../chat_application');

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res)=>{
    res.render('./views/index.ejs');
});

app.post('/view',async (req, res)=>{
    let userData = mongo.allDocsinCollection();
    res.render('./views/index.ejs',{
        data : userData
    });
})

io.sockets.on('connection', function(socket) {
    socket.on('username', async function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
        let userData = {
            username : socket.username,
            status : "ONLINE",
            date : new Date()
        }
        let insertData = await mongo.insertData("Users",userData);
    });

    socket.on('disconnect', async function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
        let userData = {
            username : socket.username,
            status : "OFFLINE",
            date : new Date()
        }
        let insertData = await mongo.insertData("Users",userData);
    })

    socket.on('chat_message', async function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
        let userData = {
            username : socket.username,
            message : message,
            date : new Date()
        }
        let insertData = await mongo.insertData("Messages",userData);
    });

});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});