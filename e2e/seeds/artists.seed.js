const pool = require('../../server/db');

const upSeed = async () => {

  //  Artists
  await pool.query(`
    CREATE TABLE artists (
      id SERIAL NOT NULL UNIQUE PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      createdat DATE NOT NULL DEFAULT NOW(),
      updatedat DATE NOT NULL DEFAULT NOW()
    )`
  )
    .then((result) => {
      pool.query(`
      INSERT INTO artists(name) VALUES 
        ('El Cuarteto De Nos'),
        ('Arctic Monkeys'),
        ('Airbag'),
        ('Architects'),
        ('Three Days Grace')
      `);
    })
    .catch((err) => {
      console.error(err);
    });
}

const downSeed = async () => {
  await pool.query('DROP TABLE artists CASCADE');
}

module.exports = { upSeed, downSeed }