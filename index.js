var driver = require('./lib/driver');
var Migrator = require('./lib/migrator');

exports.dataType = require('./lib/data_type');

exports.connect = function(config, callback) {
  driver.connect(config, function(err, db) {
    if (err) { callback(err); return; }
    callback(null, new Migrator(db, config['migrations-dir']));
  });
};

exports.createMigration = function(title, callback) {
  var migration = new Migration(title, new Date());
  migration.write(function(err) {
    if (err) { callback(err); return; }
    callback(null, migration);
  });
};
