/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = "influencers";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id").primary();
    table.string("first_name", 50).notNullable();
    table.string("last_name", 50).notNullable();
    table
      .integer("manager_id")
      .unsigned()
      .references("id")
      .inTable("users")
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
