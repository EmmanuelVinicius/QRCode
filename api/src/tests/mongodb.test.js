const assert = require('assert');
const ToolsSchema = require('../database/mongodb/schemas/personSchema');
const MongoDb = require('./../database/mongodb/mongodb');

const MOCK_DEFAULT_ITEM = {
    nome: `Test ${Date.now()}`,
    idade: 22,
    telefone: 31978458285,
    email: 'teste@teste.com',
    dataNascimento: '1997-05-23 00:00:00',
    membro: true,
    pago: true,
    compareceu: true
};

let baseTool = '';

describe('MongoDb test suit', function () {
    this.timeout(4000);
    this.beforeAll(async () => {
        const connection = MongoDb.connect();
        context = new MongoDb(connection, ToolsSchema);

        baseTool = await context.create(MOCK_DEFAULT_ITEM);
    });
    this.afterAll(async () => {
        await context.delete(baseTool._id);
    });

    it('Verify the mongo connection', async () => {
        const result = await context.isConected();

        assert.ok(result === 1 || result === 2);
    });
    it('Create a test person', async () => {
        const { title } = await context.create(MOCK_DEFAULT_ITEM);

        assert.deepStrictEqual(title, MOCK_DEFAULT_ITEM.title);
    });
    it('Read the people', async () => {
        const [{ title }] = await context.read({ title: MOCK_DEFAULT_ITEM.title });

        assert.deepStrictEqual(title, MOCK_DEFAULT_ITEM.title);
    })
    it('Update any field of a person by ID', async () => {
        const result = await context.update(baseTool._id, { nome: `nome ${Date.now()}` });

        assert.deepStrictEqual(result.nModified, 1);
    });
    it('Delete a person by ID', async () => {
        const result = await context.delete(baseTool._id);

        assert.deepStrictEqual(result.n, 1);
    });
})