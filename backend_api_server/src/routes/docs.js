function setupDocsRoutes(app) {
    /**
     * @route GET /api/docs
     * @desc Get API documentation/help summary
     */
    app.get('/api/docs', (req, res) => {
        res.json({
            title: "Hyperreal Engine Backend API",
            description: "REST, GraphQL, WebSocket for project, asset, plugin, AI, and collab. Full OpenAPI and GraphQL spec provided.",
            websocket: {
                endpoint: "/",
                doc: "WebSocket at ws(s)://<host> for live collaboration & chat. See /api/docs/websocket."
            }
        });
    });

    /**
     * @route GET /api/docs/websocket
     * @desc Describe WebSocket API for clients
     */
    app.get('/api/docs/websocket', (req, res) => {
        res.json({
            websocket: {
                usage: "Connect with WebSocket for live code editing, chat, scene collaboration, AI interactions.",
                url: "ws(s)://<host>:<port>/",
                protocols: [],
                message_types: [
                    "chat",
                    "collaboration",
                    "ai_request",
                    "ai_response",
                    "plugin_operation",
                    "asset_operation"
                ],
                overview: "Refer to frontend for implementation references, or docs for events/payloads."
            }
        });
    });
}

module.exports = { setupDocsRoutes };
