exports.up = function(knex, Promise) {
    return knex.schema.createTable('data', function(tbl) {
      tbl.increments();
      tbl.string('title', 255).notNullable();
      tbl.string('genre', 255).notNullable();
      tbl.integer('releaseYear');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('data');
  };
