
exports.up = function(knex) {
    return knex.schema.createTable("Componente",function (table) {
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
    return knex.schema.dropTable("Componente")
};