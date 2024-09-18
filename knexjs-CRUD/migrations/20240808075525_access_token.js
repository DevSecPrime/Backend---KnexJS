/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable("access_token", (table) => {
    table.increments("id").primary();
    table
      .integer("token_id")
      .references("id")
      .inTable("auth")
      .unsigned()
      .onDelete("CASCADE");
    table.string("token").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  knex.schema.dropTableIfExists("access_token");
}
