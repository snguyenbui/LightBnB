SELECT properties.id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active, avg(rating) AS average_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
WHERE (city = 'Vancouver' AND rating >= 4)
GROUP BY properties.id
ORDER BY cost_per_night
LIMIT 10;