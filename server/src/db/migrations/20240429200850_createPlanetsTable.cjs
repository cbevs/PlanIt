/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("planets", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable().unique()
        table.string("description")
        table.string("imageUrl").notNullable().defaultTo("https://tinyurl.com/mrx6rpwy")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())

    })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists("planets")
};
