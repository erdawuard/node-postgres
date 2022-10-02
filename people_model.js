const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chatbot',
  password: 'postgres',
  port: 5432,
});

const getPeople = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM people ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createPeople = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      pool.query('INSERT INTO people (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new person has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deletePeople = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM people WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Person deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getPeople,
    createPeople,
    deletePeople,
  }