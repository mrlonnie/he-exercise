'use strict';

const Hapi = require('@hapi/hapi');
const {
    searchRepositories,
    getRepository,
} = require('./src/controllers/github')

const init = async () => {
    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with', 'X_AUTH_TOKEN']   
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/searchRepositories',
        handler: (request, h) => {
            console.log(request.query)
            return searchRepositories(request.query.q);
        },
    });
    server.route({
        method: 'GET',
        path: '/getRepository',
        handler: (request, h) => {
            console.log(request.query);
            return getRepository(request.query);
        },
    });

    await server.register({
        plugin: require('@hapi/inert')
      })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();