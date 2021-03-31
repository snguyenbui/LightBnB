INSERT INTO users (name, email, password)
VALUES ('Illistil Calen', 'illistilcalen@cot.fc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jisooya Fhod', 'jisooyafhod@cot.fc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Samirra Zhys', 'samirrazhys@cot.fc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Erika Okibi', 'erkiaokibi@cot.fc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jarad Dragonstone', 'jaraddragonstone@cot.fc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Roxax Saxas', 'roxaxsaxas@cot.fc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Reina Eeva', 'reinaeeva@cot.fc.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'FC Mansion', 'https://someurl.com/img/hashtag', 'https://someurl.com/img/hashtag', 12432988, 250, 30, 512, 'Othard', '60 Plot Street', 'Shirogane', 'Hingashi', '6W4 R4D', TRUE),
(6, 'Cardboard Box', 'https://someurl.com/img/hashtag', 'https://someurl.com/img/hashtag', 0, 0, 0, 0, 'Canada', '123 Fake Street', 'Vancouver ', 'BC', '1A2 B3C', FALSE),
(7, 'Yeet Haw', 'https://someurl.com/img/hashtag', 'https://someurl.com/img/hashtag', 400, 1, 2, 2, 'USA', '6th Street', 'Austin', 'Texas', '68795', TRUE),(4, 'Rogers Arena', 'https://someurl.com/img/hashtag', 'https://someurl.com/img/hashtag', 25000, 200, 20, 0, 'Canada', '800 Griffiths Way', 'Vancouver', 'BC', 'V6B6G1', TRUE),
(6, 'That House', 'https://someurl.com/img/hashtag', 'https://someurl.com/img/hashtag', 100, 3, 3, 4, 'Canada', '132 Street', 'Surrey', 'BC', 'V3T 3T8', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-01-01', '2021-05-01', 1, 6),
('2010-10-15', '2010-10-17', 3, 3),
('2020-06-01', '2020-07-01', 3, 4)
('2015-03-06', '2020-03-28', 4, 5)
('2018-12-21', '2019-01-14', 1, 6)
('2020-08-19', '2020-09-04', 5, 7)
('2020-11-01', '2020-11-29', 1, 2)
('2010-01-01', '2020-02-01', 5, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUE (6, 1, 1, 10, 'message'),
(3, 3, 2, 7, 'message'),
(4, 3, 3, 3, 'message'),
(5, 4, 4, 7, 'message'),
(6, 1, 5, 9, 'message'),
(7, 5, 6, 1, 'message'),
(2, 1, 7, 4, 'message')
(5, 1, 8, 6, 'message');