const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1
  `, [email])
  .then(res => res.rows[0]);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, [id])
  .then(res => res.rows[0]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => res.rows);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*, avg(rating) AS average_rating
  FROM properties
  JOIN reservations ON properties.id = property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE (now()::date > end_date AND reservations.guest_id = $1)
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows)
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  let queryStr = `
  SELECT properties.*, avg(rating) AS average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;

  //Search page always returns options object with at least 4 key-value pairs
  if (options) {
    let optionStr = ``;
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      optionStr += `WHERE city LIKE $${queryParams.length} `;
    }

    if (options.owner_id) {

      if (optionStr.length === 0) {
        optionStr += `WHERE `;
      } else {
        optionStr += `AND `;
      }

      queryParams.push(options.owner_id);
      optionStr += `owner_id = $${queryParams.length} `;
    }

    if (options.minimum_price_per_night) {

      if (optionStr.length === 0) {
        optionStr += `WHERE `;
      } else {
        optionStr += `AND `;
      }

      queryParams.push(options.minimum_price_per_night);
      optionStr += `cost_per_night > $${queryParams.length} `;
    }

    if (options.maximum_price_per_night) {

      if (optionStr.length === 0) {
        optionStr += `WHERE `;
      } else {
        optionStr += `AND `;
      }

      queryParams.push(options.maximum_price_per_night);
      optionStr += `cost_per_night < $${queryParams.length} `;
    }

    queryStr += optionStr;
  }

  queryStr += `
  GROUP BY properties.id
  `

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryStr += `HAVING avg(rating) > $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryStr += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `
  // Included for debugging purposes
  // console.log(queryStr, queryParams);
  return pool.query(queryStr, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyParams = []
  for (const param in property) {
    propertyParams.push(property[param]);
  }
  return pool.query(`
  INSERT INTO properties (title, description, number_of_bedrooms,number_of_bathrooms, parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code, owner_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `, propertyParams)
  .then(res => res.rows);
}
exports.addProperty = addProperty;
