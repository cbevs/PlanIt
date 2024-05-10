/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("planets", (table) => {
    table.string("imageUrl").alter().notNullable().defaultTo("https://plan-it-production.s3.us-east-2.amazonaws.com/planetPlaceholder.png")
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.alterTable("planets", (table) => {
    table.string("imageUrl").alter().notNullable().defaultTo("https://tinyurl.com/mrx6rpwy")
  })
};
