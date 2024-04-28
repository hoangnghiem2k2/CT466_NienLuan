const UserRouter = require('./UserRouter')
const DishesRouter = require('./DishesRouter')
const OrderRouter = require('./OrderRouter')
const TableRouter = require('./TableRouter')


const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/dishes', DishesRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/table', TableRouter)
}

module.exports = routes