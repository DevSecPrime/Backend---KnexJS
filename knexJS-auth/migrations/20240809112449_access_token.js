/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable('access_token', (table) => {
    table.string('id', 191).primary()
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unsigned()
      .onDelete('CASCADE')
    table.boolean('revoked').defaultTo(false);
    table.timestamps('createdAt').defaultTo(knex.fn.now())
    table.timestamps('updatedAt').defaultTo(knex.fn.now())
    table.timestamps('expiresAt')
  })
}

/**x
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists('access_token')
}
