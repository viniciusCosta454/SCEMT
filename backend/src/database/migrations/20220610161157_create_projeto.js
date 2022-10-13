
exports.up = function(knex) {
    return knex.schema.createTable("Projeto",function (table) {
        table.increments()
        table.string("nome").notNullable()
        table.string("dataI").notNullable()
        table.string("dataF").notNullable()

        table.string("equipe_id").notNullable()

        table.string("empresa_id").notNullable()

        table.foreign("empresa_id").references("id").inTable("Empresas")
        table.foreign("equipe_id").references("id").inTable("Equipe")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("Projeto")
};
