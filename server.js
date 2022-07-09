import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
    port: 5000,
}, () => console.log(`Server started on 5000`))

wss.on('connection', function connection(ws) {
    ws.on('message', function (payload) {
        payload = JSON.parse(payload)
        switch (payload.event) {
            case 'message':
                broadcastMessage({...payload, id: Math.random() * 1000, createdAt: new Date().toLocaleString() })
                break;
            case 'connection':
                console.log('connection')
                broadcastMessage(payload)
                break;
        }
    })
})

function broadcastMessage(payload, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(payload))
    })
}