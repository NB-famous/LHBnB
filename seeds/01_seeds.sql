INSERT INTO users (id,name, email, password)
VALUES 
(1,'Nick Gomez', 'ng@me.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(2,'Rick Gutierez', 'rg@me.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
(3,'Bob Lee', 'bl@me.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO 
properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES 
(1, 'Mr.', 'description', 'http://images.pexels.com/342313/pexels-photo-342313.png','http://images.pexels.com/342313/pexels-photo-342313.png',200, 5, 2, 3, 'Canada','crecent','Montreal', 'QC', 'h2hk3l', true),
(2, 'Mr.', 'description', 'http://images.pexels.com/342313/pexels-photo-342313.png','http://images.pexels.com/342313/pexels-photo-342313.png',300, 5, 2, 3, 'Canada','main','Toronto', 'ON', 'h2hk3l', true),
(3, 'Mr.', 'description', 'http://images.pexels.com/342313/pexels-photo-342313.png','http://images.pexels.com/342313/pexels-photo-342313.png',400, 5, 2, 3, 'Canada','guy','Montreal', 'QC', 'hkl123', true);      

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES 
(1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(1,1,1,5,'message'),
(2,2,2,6,'message'),
(3,3,3,7,'message');

