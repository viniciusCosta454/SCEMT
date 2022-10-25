
exports.up = function(knex) {
    return knex.schema.createTable("ProbeAdd",function (table) {
        table.increments()
        table.string("addedName").notNullable()

        table.string("partType").notNullable()

        table.string("planItens").notNullable()
        table.string("planRelSz").notNullable()
        table.string("planSize").notNullable()

        table.string("actualItens").notNullable()
        table.string("actualSize").notNullable()


        table.string("projeto_id").notNullable()
        table.string("empresa_id").notNullable()

        table.foreign("empresa_id").references("id").inTable("Empresas")
        table.foreign("projeto_id").references("id").inTable("Projeto")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("ProbeAdd")
};
