
import bookRouter from "../routes/book";
import orderRouter from "../routes/order";
import adminRouter from "../routes/admin";
import { Express } from "express";


const routesSetup = (app: Express) => {

    app.use('/api/v1/books', bookRouter);
    app.use('/api/v1/orders', orderRouter);
    app.use('/api/v1/admin', adminRouter);
}
export default routesSetup;
