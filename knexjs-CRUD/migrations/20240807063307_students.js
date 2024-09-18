/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("students",(table)=>{
    table.increments("id").unsigned().primary();
    table.string("name").nullable();
    table.string("email",255).unique().notNullable();
    table.string("phone").unique();
    table.text("description").nullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").nullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  knex.schema.dropTableIfExists("students");
}
