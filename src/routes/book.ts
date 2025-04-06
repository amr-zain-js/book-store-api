import { Router } from "express";
import { deleteABook, getBook, listBooks, postABook, updateBook } from "../contrallers/book";
import { authorizePermissions } from "../middleware/requireUser";



const bookRouter = Router();

bookRouter.route('/')
    .get(listBooks)
    .post([authorizePermissions(['admin'])], postABook);


bookRouter.route('/:id')
    .get(getBook)
    .put([authorizePermissions(['admin'])], updateBook)
    .delete([authorizePermissions(['admin'])], deleteABook);



export default bookRouter;