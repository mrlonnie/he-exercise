'use strict';

const Hapi = require('@hapi/hapi');
const {
    searchRepositories,
} = require('./src/controllers/github')

const init = async () => {
    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });
    
    server.route({
        method: 'GET',
        path: '/searchRepositories',
        handler: (request, h) => {
            console.log(request.params)
            console.log(request.query)
            return searchRepositories(request.query.q);
        },
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with', 'X_AUTH_TOKEN']
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/getRepository/{owner}/{repo}',
        handler: (request, h) => {
            console.log(request.params);
            return searchRepositories(request.params);
        },
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with', 'X_AUTH_TOKEN']
            }
        }
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