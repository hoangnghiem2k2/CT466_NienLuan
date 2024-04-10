const TableService = require('../services/TableService')

const createTable = async (req, res) => {
    try {
        const { tableNumber, maxCustomer } = req.body;
        const createdTable = await TableService.createTable({ tableNumber, maxCustomer });
        res.status(201).json(createdTable);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating table' });
      }
}
const updateTable = async (req, res) => {
    try {
        const tableId = req.params.id
        const data = req.body
        if (!tableId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The Table is required'
            })
        }
        const response = await TableService.updateTable(tableId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}



const deleteTable = async (req, res) => {
    try {
        const tableId = req.params.id
        const data = req.body
        if (!tableId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The Table is required'
            })
        }
        const response = await TableService.bookTable(tableId, data)
        console.log(req.body.id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}



const getAllTable = async (req, res) => {
    try {
        const response = await TableService.getAllTable()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
  }

  const bookTable = async (req, res) => {
    try {
        const userId = req.params.id
        const tableNumber = req.body.tableNumber
        if (!tableNumber || !userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The User ID and TableNumber are required'
            })
        }
        const response = await TableService.bookTable(tableNumber, userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
  };

  const unBookTable = async (req, res) => {
    try {
        const userId = req.params.id
        const tableNumber = req.body.tableNumber
        if (!tableNumber || !userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The User ID and TableNumber are required'
            })
        }
        const response = await TableService.unBookTable(tableNumber, userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
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