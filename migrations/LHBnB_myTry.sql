/* TABLES I ATTEMPTED TO MAKE MYSELF  DONT USE THeres mistakes*/

CREATE TABLE guests(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    email VARCHAR(30) NOT NULL UNIQUE,
    password TEXT NOT NULL 
);

CREATE TABLE reservations(
    id SERIAL PRIMARY KEY NOT NULL,
    start_date DATE,
    end_date DATE,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    guest_id INTEGER REFERENCES guests(id) ON DELETE CASCADE
);

CREATE TABLE property_reviews(
    id SERIAL PRIMARY KEY NOT NULL,
    guest_id INTEGER REFERENCES guests(id) ON DELETE CASCADE,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    reservation_id INTEGER REFERENCES reservations(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating <= 10),
    message TEXT
);

CREATE TABLE properties(
    id SERIAL PRIMARY KEY NOT NULL,
    owner_id INTEGER REFERENCES guests(id) ON DELETE CASCADE,
    title TEXT,
    discription TEXT,
    thumbnail_photo_url TEXT,
    cover_photo_url TEXT,
    cost_per_night INTEGER,
    parking_spaces BOOLEAN DEFAULT TRUE,
    number_of_bathrooms INTEGER,
    number_of_bedrooms INTEGER,
    country VARCHAR(30),
    street VARCHAR(255),
    city VARCHAR(30),
    provice VARCHAR(30),
    post_code VARCHAR(10),
    active BOOLEAN DEFAULT TRUE

);