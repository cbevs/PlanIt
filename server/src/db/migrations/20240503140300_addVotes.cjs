/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("votes", table => {
    table.bigIncrements("id")

    table.bigInteger("userId")
      .unsigned()
      .notNullable()
      .index()
      .references("users.id")

    table.bigInteger("reviewId")
      .unsigned()
      .notNullable()
      .index()
      .references("review.id")

    table.integer("voteValue").defaultTo(0)

    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("votes")
};
