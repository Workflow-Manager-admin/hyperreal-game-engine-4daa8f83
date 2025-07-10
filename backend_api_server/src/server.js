/**
 * Entry point for backend_api_server. Sets up Express, GraphQL, WebSocket, REST, and loads all key routes and modules.
 */
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { graphqlHTTP } = require('express-graphql');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { WebSocketServer } = require('ws');

const apiRoutes = require('./routes/api');
const { typeDefs, resolvers } = require('./graphql/schema');
const websocketHandlers = require('./ws/handlers');
const { setupDocsRoutes } = require('./routes/docs');

/** 
 * Setup MongoDB
 */
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

/**
 * Create the Express app
 */
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions for OAuth2 simulation (could be swapped for production)
app.use(session({
    secret: process.env.SESSION_SECRET || "notsecure",
    resave: false,
    saveUninitialized: true
}));

/**
 * REST API
 */
app.use('/api', apiRoutes);

/**
 * GraphQL
 */
const gqlServer = new ApolloServer({ typeDefs, resolvers });
async function startApollo() {
    await gqlServer.start();
    gqlServer.applyMiddleware({ app, path: '/graphql' });
}
startApollo();

app.use('/graphiql', graphqlHTTP({
    schema: require('./graphql/schema').makeExecutableSchema(),
    graphiql: true,
}));

/**
 * Serve documentation HELP endpoints
 */
setupDocsRoutes(app);

/**
 * Asset storage static serving
 */
app.use('/assets', express.static(process.env.ASSET_STORAGE_PATH || 'assets'));

/**
 * Create HTTP Server and attach WebSocket server
 */
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server });
websocketHandlers(wsServer);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Backend API Server running on port ${PORT}`);
    console.log(`REST API available at http://localhost:${PORT}/api/`);
    console.log(`GraphQL API available at http://localhost:${PORT}/graphql/`);
    console.log(`WebSocket server running on ws://localhost:${PORT}/`);
});
