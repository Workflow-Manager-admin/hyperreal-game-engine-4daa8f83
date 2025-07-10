const { gql, makeExecutableSchema } = require('apollo-server-express');
const User = require('../models/User');
const Project = require('../models/Project');
const Asset = require('../models/Asset');
const Plugin = require('../models/Plugin');

const typeDefs = gql`
type User {
    id: ID!
    email: String!
    username: String!
    projects: [Project]
    assets: [Asset]
}

type Project {
    id: ID!
    name: String!
    owner: User
    collaborators: [User]
    assets: [Asset]
    plugins: [Plugin]
}

type Asset {
    id: ID!
    owner: User
    project: Project
    filename: String
    originalname: String
    type: String
    url: String
}

type Plugin {
    id: ID!
    project: Project
    author: User
    code: String
    metadata: String
}

type Query {
    users: [User]
    projects: [Project]
    project(id: ID!): Project
    myProfile: User
}

type Mutation {
    createProject(name: String!): Project
    uploadAsset(project: ID!, type: String!, filename: String!): Asset
}
`;

const resolvers = {
    Query: {
        users: async () => await User.find(),
        projects: async () => await Project.find(),
        project: async (_, { id }) => await Project.findById(id),
        myProfile: async (_, __, { user }) =>
            user ? await User.findById(user.id) : null
    },
    Mutation: {
        createProject: async (_, { name }, { user }) => {
            if (!user) throw new Error("Unauthorized");
            const project = new Project({ name, owner: user.id });
            await project.save();
            return project;
        },
        uploadAsset: async (_, { project, type, filename }, { user }) => {
            if (!user) throw new Error("Unauthorized");
            const asset = new Asset({ owner: user.id, project, type, filename });
            await asset.save();
            return asset;
        }
    },
    User: {
        projects: async (parent) => await Project.find({ owner: parent.id }),
        assets: async (parent) => await Asset.find({ owner: parent.id })
    },
    Project: {
        owner: async (parent) => await User.findById(parent.owner),
        collaborators: async (parent) => await User.find({ _id: { $in: parent.collaborators } }),
        assets: async (parent) => await Asset.find({ project: parent.id }),
        plugins: async (parent) => await Plugin.find({ project: parent.id })
    },
    Asset: {
        owner: async (parent) => await User.findById(parent.owner),
        project: async (parent) => await Project.findById(parent.project)
    },
    Plugin: {
        author: async (parent) => await User.findById(parent.author),
        project: async (parent) => await Project.findById(parent.project)
    }
};

module.exports = { typeDefs, resolvers, makeExecutableSchema: () => makeExecutableSchema({ typeDefs, resolvers }) };
