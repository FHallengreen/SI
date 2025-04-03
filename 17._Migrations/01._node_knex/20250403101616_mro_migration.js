
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema    
        .createTable('users', (table) => {
           table.integer('id').notNullable().primary();
           table.string('first_name').notNullable();
           table.string('last_name').notNullable();

        })    
        .createTable('products', (table) => {
           table.integer('id').notNullable().primary();
           table.decimal('price').notNullable();
           table.string('name').notNullable();

        });    
}

export function down(knex) {
    return knex.schema
        .dropTable('products')
        .dropTable('users');
}
