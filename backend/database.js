const { Pool } = require('pg');

class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    this.init();
  }

  async init() {
    try {
      // Create bookings table if it doesn't exist
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS bookings (
          id SERIAL PRIMARY KEY,
          order_id VARCHAR(255) UNIQUE NOT NULL,
          customer_name VARCHAR(255) NOT NULL,
          customer_email VARCHAR(255) NOT NULL,
          customer_phone VARCHAR(20) NOT NULL,
          room_type VARCHAR(50) NOT NULL,
          room_title VARCHAR(255) NOT NULL,
          flat_number VARCHAR(10),
          check_in DATE NOT NULL,
          check_out DATE NOT NULL,
          guests INTEGER NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          payment_status VARCHAR(20) DEFAULT 'PENDING',
          booking_status VARCHAR(20) DEFAULT 'PENDING',
          booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          special_requests TEXT,
          payment_time TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log('✅ Database tables initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing database:', error);
    }
  }

  async createBooking(bookingData) {
    const {
      order_id,
      customer_name,
      customer_email,
      customer_phone,
      room_type,
      room_title,
      flat_number,
      check_in,
      check_out,
      guests,
      total_amount,
      special_requests
    } = bookingData;

    const query = `
      INSERT INTO bookings (
        order_id, customer_name, customer_email, customer_phone,
        room_type, room_title, flat_number, check_in, check_out,
        guests, total_amount, special_requests
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
      order_id,
      customer_name,
      customer_email,
      customer_phone,
      room_type,
      room_title,
      flat_number,
      check_in,
      check_out,
      guests,
      total_amount,
      special_requests
    ];

    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async updateBookingPayment(order_id, payment_status, payment_time = null) {
    const query = `
      UPDATE bookings 
      SET payment_status = $1, 
          booking_status = CASE 
            WHEN $1 = 'PAID' THEN 'CONFIRMED'
            WHEN $1 = 'FAILED' THEN 'CANCELLED'
            ELSE booking_status
          END,
          payment_time = $2,
          updated_at = CURRENT_TIMESTAMP
      WHERE order_id = $3
      RETURNING *
    `;

    try {
      const result = await this.pool.query(query, [payment_status, payment_time, order_id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating booking payment:', error);
      throw error;
    }
  }

  async getBookingByOrderId(order_id) {
    const query = 'SELECT * FROM bookings WHERE order_id = $1';
    try {
      const result = await this.pool.query(query, [order_id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error getting booking:', error);
      throw error;
    }
  }

  async getAllBookings() {
    const query = `
      SELECT * FROM bookings 
      ORDER BY created_at DESC
    `;
    
    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error getting all bookings:', error);
      throw error;
    }
  }

  async getAvailableFlats(check_in, check_out) {
    // Get all occupied flats during the requested period
    const query = `
      SELECT DISTINCT flat_number 
      FROM bookings 
      WHERE booking_status IN ('CONFIRMED', 'UPCOMING')
        AND (
          (check_in <= $1 AND check_out > $1) OR
          (check_in < $2 AND check_out >= $2) OR
          (check_in >= $1 AND check_out <= $2)
        )
    `;

    try {
      const result = await this.pool.query(query, [check_in, check_out]);
      const occupiedFlats = result.rows.map(row => row.flat_number);
      
      // All available flats
      const allFlats = [
        '101', '102', '103', '104',
        '201', '202', '203', '204',
        '301', '302', '303', '304'
      ];

      const availableFlats = allFlats.filter(flat => !occupiedFlats.includes(flat));
      return availableFlats;
    } catch (error) {
      console.error('Error getting available flats:', error);
      throw error;
    }
  }

  async assignFlatToBooking(order_id, flat_number) {
    const query = `
      UPDATE bookings 
      SET flat_number = $1, updated_at = CURRENT_TIMESTAMP
      WHERE order_id = $2
      RETURNING *
    `;

    try {
      const result = await this.pool.query(query, [flat_number, order_id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error assigning flat to booking:', error);
      throw error;
    }
  }
}

module.exports = Database;
