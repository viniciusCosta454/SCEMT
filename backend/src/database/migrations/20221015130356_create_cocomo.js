
exports.up = function(knex) {
    return knex.schema.createTable("Cocomo",function (table) {
        table.increments()
        table.string("precedencia").notNullable()
        table.string("flexibilidade").notNullable()
        table.string("arquitetura").notNullable()
        table.string("coesao").notNullable()
        table.string("maturidade").notNullable()


        table.string("projeto_id").notNullable()
        table.string("empresa_id").notNullable()

        table.foreign("empresa_id").references("id").inTable("Empresas")
        table.foreign("projeto_id").references("id").inTable("Projeto")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("Cocomo")
};
