SELECT reservations.*, properties.*, avg(rating) AS average_rating
FROM properties
JOIN reservations ON properties.id = property_id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE (now()::date > end_date AND reservations.guest_id = 1)
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;