const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Academic Training Center API',
            version: '1.0.0',
            description: 'API documentation for the Academic Training Center project'
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./routes/*.js'] // Path to your API route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
