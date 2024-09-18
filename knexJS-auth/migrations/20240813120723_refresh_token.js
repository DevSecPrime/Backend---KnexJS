/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable('refresh_token', (table) => {
    table.string('id', 191).primary()
    table.boolean('rovked').defaultTo(false)
    table
      .string('accessTokenId')
      .references('id')
      .inTable('access_token')
      .unsigned()
      .onDelete('CASCADE')

    table.timestamps('expiresAt')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists('refresh_token')
}
