const Table = require('../model/TableModel');
const User = require('../model/UserModel')

const createTable = async (newTable) => {
    try {
        const existingTable = await Table.findOne({ tableNumber: newTable.tableNumber });
        if (existingTable) {
          return { status: 'ERR', message: 'Table already exists' };
        }
    
        const createdTable = await Table.create(newTable);
        return { status: 'OK', message: 'Table created successfully', data: createdTable };
      } catch (error) {
        console.error(error);
        return { status: 'ERR', message: 'Error creating table' };
      }
}

const updateTable = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTable = await Table.findOne({
                _id: id
            })
            if (checkTable === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Table is not defined'
                })
            }

            const updatedTable = await Table.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedTable
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteTable = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkTable = await Table.findOne({
                _id: id
            })
            if (checkTable === null) {
                resolve({
                    status: 'ERR',
                    message: 'The Table is not defined'
                })
            }

            await Table.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete Dish success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getAllTable = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allTable = await Table.find()
            resolve({
                status: 'OK',
                message: 'Success',
                data: allTable
            })
        } catch (e) {
            reject(e)
        }
    })
}

const bookTable = async (tableNumber, userId) => {
    
    try {
      const table = await Table.findOneAndUpdate(
        { tableNumber, isAvailable: true },  // Find available table matching number
        { isAvailable: false, booking: userId },
        { new: true } // Return the updated document
      );
  
      if (!table) {
        // No available table found, return specific error code and message
        return { status: 'ERR_TABLE_NOT_AVAILABLE', message: 'The requested table is currently unavailable.' };
      }
  
      console.log(`Table ${table.tableNumber} booked successfully by user ${userId}`); // Log success message (optional)
      return { status: 'OK', message: 'Table booked successfully.' };
    } catch (error) {
      console.error('Error booking table:', error.message);
      // Re-throw or handle the error appropriately based on your application logic
      throw error; // Re-throw for caller to handle
    }
  };


  const unBookTable= async (tableNumber, userId) => {  
    try {
      const table = await Table.findOneAndUpdate(
        { tableNumber, isAvailable: false },  // Find available table matching number
        { isAvailable: true, booking: null },
        { new: true } // Return the updated document
      );
  
      if (!table) {
        // No available table found, return specific error code and message
        return { status: 'ERR_TABLE_NOT_AVAILABLE', message: 'Something went wrong here' };
      }
  
      console.log(`Table ${table.tableNumber} is now available, user ${userId} have checked out`); // Log success message (optional)
      return { status: 'OK', message: 'Table unbooked successfully.' };
    } catch (error) {
      console.error('Error booking table:', error.message);
      // Re-throw or handle the error appropriately based on your application logic
      throw error; // Re-throw for caller to handle
    }
  };



module.exports = {
    createTable,
    updateTable,
    deleteTable,
    getAllTable,
    bookTable,
    unBookTable
}