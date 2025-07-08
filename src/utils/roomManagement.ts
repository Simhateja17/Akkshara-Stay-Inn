export interface RoomAvailability {
  '2bhk': number;
  '1bhk': number;
  'standard': number;
}

export interface FlatStatus {
  flatNumber: string;
  floor: number;
  isOccupied: boolean;
  bookedBy?: string;
  checkIn?: string;
  checkOut?: string;
  bookingType?: '2bhk' | '1bhk' | 'standard';
}

export interface Booking {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  roomType: '2bhk' | '1bhk' | 'standard';
  roomTitle: string;
  flatNumber: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  bookingStatus: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'UPCOMING';
  bookingDate: string;
  specialRequests?: string;
}

// All available flats (3 floors, 4 flats per floor)
export const ALL_FLATS = [
  '101', '102', '103', '104',
  '201', '202', '203', '204',
  '301', '302', '303', '304'
];

export const TOTAL_FLATS = 12;

// Room pricing
export const ROOM_PRICES = {
  '2bhk': 4479,
  '1bhk': 3359,
  'standard': 2239
};

// Room titles
export const ROOM_TITLES = {
  '2bhk': '2-BHK Apartment',
  '1bhk': '1-BHK Apartment',
  'standard': 'Standard Room'
};

/**
 * Calculate room availability based on current bookings
 * Any booking type (2BHK, 1BHK, Standard) blocks the entire flat
 */
export const calculateRoomAvailability = (bookings: Booking[]): RoomAvailability => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Get all currently occupied flats (active bookings)
  const occupiedFlats = bookings.filter(booking => {
    return (
      (booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'UPCOMING') &&
      booking.checkIn <= currentDate && booking.checkOut > currentDate
    );
  });

  const occupiedCount = occupiedFlats.length;
  const availableCount = TOTAL_FLATS - occupiedCount;

  return {
    '2bhk': availableCount,
    '1bhk': availableCount,
    'standard': availableCount
  };
};

/**
 * Get flat status for each flat
 */
export const getFlatStatuses = (bookings: Booking[]): FlatStatus[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return ALL_FLATS.map(flatNumber => {
    const currentBooking = bookings.find(booking => {
      return (
        booking.flatNumber === flatNumber &&
        (booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'UPCOMING') &&
        booking.checkIn <= currentDate && booking.checkOut > currentDate
      );
    });

    return {
      flatNumber,
      floor: Math.floor(parseInt(flatNumber) / 100),
      isOccupied: !!currentBooking,
      bookedBy: currentBooking?.customerName,
      checkIn: currentBooking?.checkIn,
      checkOut: currentBooking?.checkOut,
      bookingType: currentBooking?.roomType
    };
  });
};

/**
 * Get next available flat for booking
 */
export const getNextAvailableFlat = (bookings: Booking[]): string | null => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const occupiedFlats = new Set(
    bookings
      .filter(booking => 
        (booking.bookingStatus === 'CONFIRMED' || booking.bookingStatus === 'UPCOMING') &&
        booking.checkIn <= currentDate && booking.checkOut > currentDate
      )
      .map(booking => booking.flatNumber)
  );

  // Find first available flat
  for (const flat of ALL_FLATS) {
    if (!occupiedFlats.has(flat)) {
      return flat;
    }
  }
  return null; // No flats available
};

/**
 * Check if a specific flat is available for given dates
 */
export const isFlatAvailable = (
  flatNumber: string, 
  checkIn: string, 
  checkOut: string, 
  bookings: Booking[]
): boolean => {
  const existingBooking = bookings.find(booking => {
    if (booking.flatNumber !== flatNumber) return false;
    if (booking.bookingStatus === 'CANCELLED' || booking.bookingStatus === 'COMPLETED') return false;
    
    const bookingCheckIn = booking.checkIn;
    const bookingCheckOut = booking.checkOut;
    
    // Check for date overlap
    return !(checkOut <= bookingCheckIn || checkIn >= bookingCheckOut);
  });

  return !existingBooking;
};

/**
 * Get available flats for given dates
 */
export const getAvailableFlatsForDates = (
  checkIn: string, 
  checkOut: string, 
  bookings: Booking[]
): string[] => {
  return ALL_FLATS.filter(flat => 
    isFlatAvailable(flat, checkIn, checkOut, bookings)
  );
};

/**
 * Format flat number for display
 */
export const formatFlatNumber = (flatNumber: string): string => {
  const floor = Math.floor(parseInt(flatNumber) / 100);
  const unit = parseInt(flatNumber) % 100;
  return `${flatNumber} (Floor ${floor}, Unit ${unit})`;
};
