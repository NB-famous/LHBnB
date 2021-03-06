//const properties = require('./json/properties.json');
//const users = require('./json/users.json');
const { Pool } = require('pg');

/// Users

//const pool = new Pool();

const pool = new Pool({
  user: 'development',
  password: 'development',
  host: 'localhost',
  database: 'lightbnb',
  port: 5432
}); 

//pool.connect();


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

/* ///// getUserWithEmail B4 the update 

const getUserWithEmail = function(email) {
  let user;
  for (const userId in users) {
    user = users[userId];
    if (user.email.toLowerCase() === email.toLowerCase()) {
      break;
    } else {
      user = null;
    }
  }
  return Promise.resolve(user);
} */

const getUserWithEmail = function(email) {

  return pool.query(`
  SELECT email 
  FROM users
  WHERE email = $1
  `,[email])
  .then(res => res.rows[0])
};


exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
/* const getUserWithId = function(id) {
  return Promise.resolve(users[id]);
} */

const getUserWithId = function(id) {

  return pool.query(`
  SELECT id 
  FROM users
  WHERE id = $1
  `, [id])
  .then(res => res.rows[0])
}

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
/* const addUser =  function(user) {
  const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return Promise.resolve(user);
} */

const addUser =  function(user) {

  return pool.query(`
  INSERT INTO users(name, email, password)
  VALUES($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => res.rows[0])
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
/* 
Before query update

const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
} */

const getAllReservations = function(guest, limit = 10){

  return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `, [guest, limit])
  .then(res => res.rows);
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

/* BEFORE THE CHANGE ////
const getAllProperties = function(options, limit = 10) {
  const limitedProperties = {};
  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
} 
*/

/* const getAllProperties = function(options, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
} */

const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id`;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    queryString += `AND owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    if (queryParams.length >= 1) queryString += 'AND ';
    queryParams.push(Number(options.minimum_price_per_night));
    queryString += `cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    if (queryParams.length >= 1) queryString += 'AND ';
    queryParmas.push(Number(options.maximum_price_per_night));
    queryString += `cost_per_night >= $${queryParams.length}`;
  }

  // 4
  queryString += `GROUP BY properties.id`;

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING avg(rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  //console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
/*  Before the update

const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
} */

const addProperty = function(property) {
  return pool.query(`
    INSERT INTO properties (
      owner_id,title,description,thumbnail_photo_url, cover_photo_url, cost_per_night, street,
      city, province, post_code, country, parking_spaces, number_of_washrooms, number_of_bedrooms,active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *;`,
    [
    property.owner_id, property.title, property.description, property.thumbnail_photo_url,property.cover_photo_url,
    property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country,
    property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms,true])
    .then(res => res.rows[0]);
};

exports.addProperty = addProperty;
