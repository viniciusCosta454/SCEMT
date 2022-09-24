
exports.up = function(knex) {
<<<<<<< Updated upstream:backend/src/database/migrations/20220907230746_create_componente.js
    return knex.schema.createTable("Componente",function (table) {
=======
    return knex.schema.createTable("Effort",function (table) {
>>>>>>> Stashed changes:backend/src/database/migrations/20220923195732_create_effort.js
        table.increments()
        table.string("nome").notNullable()
        table.string("tipo").notNullable()
        table.string("iPlan").notNullable()
        table.string("tRelPlan").notNullable()
        table.string("tamPlan").notNullable()
        table.string("tamR").notNullable()

        table.string("projeto_id").notNullable()

        table.foreign("projeto_id").references("id").inTable("Projeto")
    })
};

exports.down = function(knex) {
<<<<<<< Updated upstream:backend/src/database/migrations/20220907230746_create_componente.js
    return knex.schema.dropTable("Componente")
=======
    return knex.schema.dropTable("Effort")
>>>>>>> Stashed changes:backend/src/database/migrations/20220923195732_create_effort.js
};