/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = "social_pages";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.string("username", 50).notNullable();
    table.string("platform", 50).notNullable();
    table
      .integer("influencer_id")
      .unsigned()
      .references("id")
      .inTable("influencers")
      .onDelete("SET NULL");
    table.timestamps(true, true); // adds created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
