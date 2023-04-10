const pool = require('../../server/db');

const upSongsSeed = async () => {

  //  Songs
  await pool.query(`
    CREATE TABLE songs (
      id SERIAL NOT NULL UNIQUE PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      artistid INTEGER NOT NULL REFERENCES artists(id),
      createdat DATE NOT NULL DEFAULT NOW(),
      updatedat DATE NOT NULL DEFAULT NOW()
    )`
  )
    .then((result) => {
      pool.query(`
      INSERT INTO songs(name, artistid) VALUES
        ('Lo malo de ser bueno', 1),
        ('Así Soy Yo', 1),
        ('Do I Wanna Know?', 2),
        ('Teddy Picker', 2),
        ('Por Mil Noches', 3),
        ('Cicatrices', 3),
        ('Doomsday', 4),
        ('Impermanence', 4),
        ('Home', 5),
        ('Animal I Have Become', 5)
      `)
    })
    .catch((err) => {
      console.error(err);
    });
}

const downSongsSeed = async () => {
  await pool.query('DROP TABLE songs CASCADE');
}

module.exports = { upSongsSeed, downSongsSeed }