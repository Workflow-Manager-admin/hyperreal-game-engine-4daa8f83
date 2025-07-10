const { v4: uuidv4 } = require('uuid');

/**
 * Setup WebSocket server event handlers for chat/collab.
 * @param {WebSocketServer} wsServer
 */
function websocketHandlers(wsServer) {
    wsServer.on('connection', (ws, req) => {
        ws.id = uuidv4();
        ws.send(JSON.stringify({ type: "system", message: "WebSocket connection established." }));

        ws.on('message', (msg) => {
            // Parse and route messages: {type, ...}
            let data;
            try {
                data = JSON.parse(msg);
            } catch {
                ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
                return;
            }
            switch (data.type) {
                case "chat":
                    broadcast(wsServer, { ...data, from: ws.id });
                    break;
                case "collaboration":
                    // Real-time collab ops (broadcast for now)
                    broadcast(wsServer, { ...data, from: ws.id });
                    break;
                case "ai_request":
                    // AI request, STUB response
                    ws.send(JSON.stringify({ type: "ai_response", message: "AI not implemented yet." }));
                    break;
                default:
                    ws.send(JSON.stringify({ type: "error", message: "Unknown message type" }));
            }
        });
        ws.on('close', () => {});
    });
}

/**
 * Helper: Broadcast message to all clients
 */
function broadcast(wsServer, data) {
    wsServer.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = websocketHandlers;
