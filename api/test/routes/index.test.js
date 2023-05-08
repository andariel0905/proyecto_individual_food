const app = require('../../src/app');
const session = require('supertest');
const agent = session(app);

describe ('Testeo de rutas', () => {
    describe ('GET /recipes', () => {
        it ('Debe responder con un status 200 si sale todo bien', async () => {
            await agent.get('/recipes').expect(200).timeout(15000);
        });
        it ('Debe responder con un array de objetos. Los objetos deben tener mínimo la propiedad "title"', async () => {
            let {body} = await agent.get('/recipes');
            expect(Array.isArray(body)).toBe(true);
            expect(body.length).toBeGreaterThan(0);
            expect(typeof body[0]).toBe('object');
            expect(body[0]).toMatchObject({title:expect.any(String)})
        });
        it ('Si se envía un string por Query debe devolver un array con objetos que tengan ese string en su propiedad title', async () => {
            let queryString = 'veg';
            let {body} = await agent.get(`/recipes?${queryString}`);
            expect(body.some(recipe => recipe.title.includes(queryString))).toBe(true);
        });
    })
    describe ('GET /recipes/:id', () => {
        it ('Debe responder con un status 200 si sale todo bien', async () => {
            await agent.get('/recipes/715497').expect(200);
        });
        it ('Debe responder con un status 400 si se le envía un ID incorrecto', async () => {
            await agent.get('/recipes/idontexist').expect(400);
        });
        it ('Si se encuentra una receta con el ID enviado por Params la receta que se recibe debe ser un objeto que tiene el mismo ID que enviamos', async () => {
            let idToSend = 715497;
            let {body} = await agent.get(`/recipes/${idToSend}`);
            expect(typeof body).toBe('object');
            expect(body.id).toEqual(idToSend.toString());
        });
    })
})