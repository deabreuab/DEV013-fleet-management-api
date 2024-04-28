import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Fleet Management API',
        description: 'Proyecto para manejar la flota de taxis de una compañia China',
    },
    servers: [
        {
            url: 'http://localhost:3000/api/',
            description: '',
        },
    ],
    tags: [
        {
            name: 'taxis',
            description: 'Taxis routes',
        },
        {
            name: 'trajectories',
            description: 'Trajectories routes',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
        schemas: {
            createTaxi: {
                $id: 12,
                $plate: 'ABC-123',
            },
            getTaxi: { $ref: '#/components/schemas/createTaxi' },
            trajectory: {
                $id: 12,
                $latitude: 12.123123,
                $longitude: -72.123123,
            },
            trajectoryResult: {
                $id: 1234,
                $taxi_id: 322,
                $latitude: 12.123123,
                $longitude: -72.123123,
                $date: '2023-08-02',
            },
        },
    },
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['../routes/index.ts']

// eslint-disable-next-line @typescript-eslint/no-floating-promises
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
