import pool from "../../backend/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      location,
      pickUpDate,
      dropOffDate,
      pickUpTime,
      dropOffTime,
      phone,
      carId,
    } = req.body;

    try {
      console.log("Received form data:", req.body);

      const result = await pool.query(
        `
        INSERT INTO rentals (car_id, store_loc, pick_up_date, drop_off_date, pick_up_time, drop_off_time, phone)
        VALUES ($1, (SELECT id FROM store_location WHERE address = $2), $3, $4, $5, $6, $7)
        RETURNING id;        
        `,
        [
          carId,
          location,
          pickUpDate,
          dropOffDate,
          pickUpTime,
          dropOffTime,
          phone,
        ]
      );

      const rentalId = result.rows[0].id;
      console.log("Rental ID:", rentalId);

      res.status(201).json({ rentalId });
    } catch (error) {
      console.error("Error inserting data into the database", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }
}
