/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("dashboard", (table) => {
        table.increments("id").primary();
        table
            .integer("day_id")
            .unsigned()
            .references("day.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("meal_id")
            .unsigned()
            .references("meal.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table
            .integer("recipe_id")
            .unsigned()
            .references("recipes.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("dashboard");
};
