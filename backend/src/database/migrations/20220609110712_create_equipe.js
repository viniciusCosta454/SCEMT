
exports.up = function(knex) {
    return knex.schema.createTable("Equipe",function (table) {
        table.increments()
        table.string("nome").notNullable()
        table.string("membro").notNullable()

        table.string("empresa_id").notNullable()

        table.foreign("empresa_id").references("id").inTable("Empresas")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("Equipe")
};
