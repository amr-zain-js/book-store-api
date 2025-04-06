import { Router } from "express";
import { statistics } from "../contrallers/admin";
import { authorizePermissions } from "../middleware/requireUser";

const adminRouter = Router();

adminRouter.get("/",[authorizePermissions(['admin'])],statistics)

export default adminRouter;
