const {conn,Recipe,Diet} = require('../../src/db');

describe ('Testeo de modelos', () => {
    beforeAll(async () => {
        await conn.sync({ force: true });
    });

    describe ('Recipe', () => {
        it ('La propiedad title no puede ser null', async () => {
            expect.assertions(1);
            try {
                await Recipe.create({
                    title: null,
                    summary: 'recipe a summary',
                    healthScore: 50,
                    steps: 'recipe a steps'
                });
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });
        it ('La propiedad title debe ser única', async () => {
            expect.assertions(1);
            try {
                await Recipe.create({
                    title: 'recipe A title',
                    summary: 'recipe A summary',
                    healthScore: 50,
                    steps: 'recipe A steps'
                });
                await Recipe.create({
                    title: 'recipe A title',
                    summary: 'recipe B summary',
                    healthScore: 50,
                    steps: 'recipe B steps'
                });
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });
        it ('La propiedad summary no puede ser null', async () => {
            expect.assertions(1);
            try {
                await Recipe.create({
                    title: 'recipe a title',
                    summary: null,
                    healthScore: 50,
                    steps: 'recipe a steps'
                });
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });
        it ('La propiedad healthScore no puede ser null', async () => {
            expect.assertions(1);
            try {
                await Recipe.create({
                    title: 'recipe a title',
                    summary: 'recipe a summary',
                    healthScore: null,
                    steps: 'recipe a steps'
                });
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });
        it ('El valor de healthScore debe ser de entre 0 y 100', async () => {
            expect.assertions(1);
            try {
                await Recipe.create({
                    title: 'recipe a title',
                    summary: 'recipe a summary',
                    healthScore: 200,
                    steps: 'recipe a steps'
                });
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });
        it ('La propiedad steps no puede ser null', async () => {
            expect.assertions(1);
            try {
                await Recipe.create({
                    title: 'recipe a title',
                    summary: 'recipe a summary',
                    healthScore: 50,
                    steps: null
                });
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });
    });

    describe ('Diet', () => {
        it ('La propiedad name no puede ser null', async () => {
            expect.assertions(1);
            try {
                await Diet.create({
                  name: null,
                });
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });
        it ('La propiedad name debe ser única', async () => {
            expect.assertions(1);
            try {
                await Diet.create({name:'Veggie'});
                await Diet.create({name:'Veggie'});
            } catch (error) {
                expect(error.message).toBeDefined();
            }
        });
    });

    afterAll(async () => {
        await conn.sync({ force: true });
        conn.close();
    });
})