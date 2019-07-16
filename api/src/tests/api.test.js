const assert = require('assert');
const api = require('../api');


const MOCK_QUERY = 'membro=true';
let MOCK_ID = '';
const MOCK_ITEM_DEFAULT = {
    nome: `Test - ${Date.now()}`,
    idade: 22,
    telefone: 31978458285,
    email: 'teste@teste.com',
    dataNascimento: '1997-05-23 00:00:00',
    membro: true,
    pago: false,
    compareceu: false
};

describe('Test suit of all festival people', function () {
    this.timeout(Infinity)
    this.beforeAll(async () => {
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/festival',
            payload: JSON.stringify(MOCK_ITEM_DEFAULT)
        });
        const { _id } = JSON.parse(result.payload);
        MOCK_ID = _id;
    })
    it('Get all festival people', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/festival'
        });
        const data = JSON.parse(result.payload);
        assert.ok(Array.isArray(data));
    });
    it('Get festival people with query', async () => {
        const result = await app.inject({
            method: 'GET',
            url: `/festival?${MOCK_QUERY}`
        });

        const [{ tags }] = JSON.parse(result.payload);
        assert.deepStrictEqual(tags, MOCK_ITEM_DEFAULT.tags);
    });
    it('Get festival people by Id', async () => {
        const result = await app.inject({
            method: 'GET',
            url: `/festival/${MOCK_ID}`
        });

        const { _id } = JSON.parse(result.payload);
        assert.deepStrictEqual(_id, MOCK_ID);
    });
    it('Create a new person', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/festival',
            payload: MOCK_ITEM_DEFAULT
        });

        const { message } = JSON.parse(result.payload);

        assert.ok(message === 'Pronto, voce foi cadastrado(a)!');
    });
    it('Update a festival person', async () => {
        const newItem = { nome: `newItem - ${Date.now()}` }
        const result = await app.inject({
            method: 'PATCH',
            url: `/festival/${MOCK_ID}`,
            payload: newItem
        });

        const statusCode = result.statusCode;
        assert.ok(statusCode === 200);
    });
    it('Delete festival person', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/festival/${MOCK_ID}`
        });

        const { ok } = JSON.parse(result.payload)
        assert.ok(ok === 1);
    });
})