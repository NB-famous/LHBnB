/*
Average Length Of Reservation

Get the average duration of all reservations.

match LHL
*/

SELECT AVG(end_date - start_date) as average_duration
FROM reservations;