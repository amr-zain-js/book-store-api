import express from "express";
import env from 'dotenv';
import connectDB from "./db/connection";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/error";

import firebasCofig from "./setup/firebase";
import routesSetup from "./setup/routes";
import middlewaresSetup from "./setup/middlewares";

const port = process.env.PORT || 3030;



env.config()

const app = express();
// middleware

firebasCofig();
middlewaresSetup(app); 
routesSetup(app);

app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  await connectDB(process.env.DB_URL)
  console.log(`app listening on port ${port}`);
});
export default app;