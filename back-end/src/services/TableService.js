const BookingTable = require('../model/TableModel');
const User = require('../model/UserModel')


exports.createBooking = async (bookingData) => {
  try {
      const { name, bookingTime, numberTable } = bookingData;
      
      const user = await User.findOne({ name });
      if (!user) {
          throw new Error('User not found');
      }

      const userID = user._id;

      const startTime = new Date(bookingTime);
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1); 
      endTime.setMinutes(endTime.getMinutes() + 30); 

      const existingBookings = await BookingTable.find({
          numberTable,
          bookingTime: {
              $gte: startTime, 
              $lte: endTime    
          }
      });

      if (existingBookings.length > 0) {
          throw new Error('There is already a booking for this table at the specified time.');
      }

      bookingData.UserID = userID;

      return await BookingTable.create(bookingData);
  } catch (error) {
      throw new Error('Error creating booking: ' + error.message);
  }
};


exports.getBookingById = async (userId) => {
  try {
    // Find all bookings where UserID matches the provided ID
    const bookings = await BookingTable.find({ UserID: userId });

    // Check if any bookings were found
   

    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    throw new Error('An error occurred while fetching bookings.'); // Re-throw a more generic error for handling in the calling code
  }
}

exports.getBooking = async () => {
  try {
    // Find all bookings where UserID matches the provided ID
    const bookings = await BookingTable.find();

    // Check if any bookings were found
   

    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    throw new Error('An error occurred while fetching bookings.'); // Re-throw a more generic error for handling in the calling code
  }
}


exports.deleteBooking = async (id) => {
  try {
    // Find all bookings where UserID matches the provided ID
    const bookings = await BookingTable.findByIdAndDelete(id);

    // Check if any bookings were found
   

    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    throw new Error('An error occurred while fetching bookings.'); // Re-throw a more generic error for handling in the calling code
  }
}