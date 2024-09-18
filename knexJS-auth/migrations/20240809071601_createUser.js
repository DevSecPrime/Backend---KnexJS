/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable("users", (table) => {
    table.increments("id").unsigned().primary();
    table.string("name").notNullable();
    table.string("email", 192).notNullable().unique();
    table.string("phone",10).notNullable().unique();
    table.string("password", 255).notNullable();
    table.string("account_type").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTableIfExists("users");

};
