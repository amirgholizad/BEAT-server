/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("blog", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("user.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.string("links").notNullable();
    table.string("files").notNullable();
    table.string("content", 1000).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("blog");
}
