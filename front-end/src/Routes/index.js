import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage"
import DishesPage from "../pages/DishesPage/DishesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
export const routes = [
    {
        path: '/',
        page: HomePage
    },
    {
        path: '/order',
        page: OrderPage
    },
    {
        path: '/dishes',
        page: DishesPage
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]