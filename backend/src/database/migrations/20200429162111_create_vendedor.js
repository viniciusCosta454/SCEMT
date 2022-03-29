
exports.up = function(knex) {
    return knex.schema.createTable("Vendedor",function (table) {
        table.increments()
        table.string("nome").notNullable()
        table.string("cpf").notNullable()
        table.string("sexo").notNullable()
        table.string("nacimento").notNullable()

        table.string("empresa_id").notNullable()

        table.foreign("empresa_id").references("id").inTable("Empresas")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("Vendedor")
};