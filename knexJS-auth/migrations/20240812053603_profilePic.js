/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable("profilePic", (table) => {
    table.increments("id").unsigned().primary();
    table.string("name").notNullable();
    table.string("fileType").notNullable();
    table.string("filePath").notNullable();
    table.string("user_id").references("id").inTable("users");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists("profilePic");
};
