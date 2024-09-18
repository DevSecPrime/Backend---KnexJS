/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  knex.schema.createTable("user",(table)=>{
    table.increments("id").unsigned().primary();
    table.string("name").nullable();
    table.string("email",255).unique().notNullable();
    table.string("phone").unique();
    table.string("password").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now()).nullable();
    table.timestamp("updatedAt").nullable();;
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  knex.schema.dropTableIfExists("user");
}
