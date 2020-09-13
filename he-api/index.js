'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
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
            additionalHeaders: ['x-requested-with', 'X_AUTH_TOKEN']   
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
        options: {
            cache: {
                expiresIn: 30 * 1000,
                privacy: 'private'
            },
            validate: {
              query: Joi.object({
                  q: Joi.string().alphanum()
              })
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/getRepository',
        handler: (request, h) => {
            console.log(request.query);
            return getRepository(request.query);
        },
        options: {
            cache: {
                expiresIn: 30 * 1000,
                privacy: 'private'
            },
            validate: {
              query: Joi.object({
                  owner: Joi.string(),
                  repo: Joi.string(),
              })
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