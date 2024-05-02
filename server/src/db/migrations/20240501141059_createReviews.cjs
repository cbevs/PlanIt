/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("reviews", (table) => {
      table.bigIncrements("id")
      table.string("body").notNullable()
      table.bigInteger("planetId").unsigned().notNullable().index().references("planets.id")
      table.bigInteger("userId").unsigned().notNullable().index().references("users.id")
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
};

/**
* @param {Knex} knex
*/
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("reviews")
};