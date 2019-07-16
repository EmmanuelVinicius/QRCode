const Hapi = require('hapi');
const MongoDb = require('./database/mongodb/mongodb');
const ToolsSchema = require('./database/mongodb/schemas/personSchema');
const ToolsRoutes = require('./routes/peopleRoutes');

const Swagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');

const app = new Hapi.Server({ port: process.env.PORT || 3001 });

mapRoutes = (instance, methods) => {
    return methods.map(method => instance[method]())
}
async function Api() {
    const connection = MongoDb.connect();
    const context = new MongoDb(connection, ToolsSchema);

    const swaggerOptions = {
        lang: 'pt'
    };

    await app.register([
        Vision,
        Inert,
        {
            plugin: Swagger,
            options: swaggerOptions
        }
    ]);

    app.route(
        mapRoutes(new ToolsRoutes(context), ToolsRoutes.methods())
    );

    await app.start();
    console.log(`Tô na porta ${app.info.port}`)
    process.on('unhandledRejection', (error) => {
        console.log('FAIL', error);
        process.exit(1);
    });
    return app;
}

module.exports = Api();