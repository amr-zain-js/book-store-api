import { Router } from "express";
import { authorizePermissions } from "../middleware/requireUser";
import { createOrder, getUserOrders } from "../contrallers/order";



const orderRouter = Router()

orderRouter.route('/')
    .get([authorizePermissions(['user','admin'])],getUserOrders)
    .post([authorizePermissions(['user'])],createOrder)


export default orderRouter;

