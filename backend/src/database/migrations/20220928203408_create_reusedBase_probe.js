
exports.up = function(knex) {
    return knex.schema.createTable("ProbeReusedBase",function (table) {
        table.increments()
        table.string("baseName").notNullable()
        table.string("planBase").notNullable()
        table.string("planDel").notNullable()
        table.string("planMod").notNullable()
        table.string("planAdd").notNullable()
        table.string("actualBase").notNullable()
        table.string("actualDel").notNullable()
        table.string("actualMod").notNullable()
        table.string("actualAdd").notNullable()

        table.string("reusedName").notNullable()
        table.string("plan").notNullable()
        table.string("actual").notNullable()

        


        table.string("projeto_id").notNullable()
        table.string("empresa_id").notNullable()

        table.foreign("empresa_id").references("id").inTable("Empresas")
        table.foreign("projeto_id").references("id").inTable("Projeto")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("ProbeReusedBase")
};
