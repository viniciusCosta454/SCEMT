
exports.up = function(knex) {
    return knex.schema.createTable("Projeto",function (table) {
        table.increments()
        table.string("nome").notNullable()
        table.string("dataI").notNullable()
        table.string("dataF").notNullable()
        table.string("salario").notNullable()
        table.string("gastos").notNullable()
        table.string("lucro").notNullable()
        table.string("equipe").notNullable()

        table.string("empresa_id").notNullable()

        table.foreign("empresa_id").references("id").inTable("Empresas")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("Projeto")
};