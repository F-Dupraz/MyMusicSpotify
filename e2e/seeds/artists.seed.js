const pool = require('../../server/db');

const upSeed = async () => {

  //  Artists
  await pool.query(`
  CREATE TABLE artists (
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    createdat DATE NOT NULL DEFAULT NOW(),
    updatedat DATE NOT NULL DEFAULT NOW()
  )`)
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

    //  Songs
    await pool.query(`
    CREATE TABLE songs (
      id SERIAL NOT NULL UNIQUE PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      artistid INTEGER NOT NULL REFERENCES artists,
      createdat DATE NOT NULL DEFAULT NOW(),
      updatedat DATE NOT NULL DEFAULT NOW()
    )`)
      .then((result) => {
        pool.query(`
        INSERT INTO artists(name, artistid) VALUES 
          ('Lo malo de ser bueno', 1),
          ('Así Soy Yo', 1),
          ('Do I Wanna Know?', 2),
          ('Why'd You Only Call Me When You're High?', 2),
          ('Por Mil Noches', 3),
          ('Cicatrices', 3),
          ('Doomsday', 4),
          ('Impermanence', 4),
          ('Home', 5),
          ('Animal I Have Become', 5)
        `);
      })
      .catch((err) => {
        console.error(err);
      });
}

const downSeed = async () => {
  await pool.query('DROP TABLE artists CASCADE');
  await pool.query('DROP TABLE songs CASCADE');
}

module.exports = { upSeed, downSeed }