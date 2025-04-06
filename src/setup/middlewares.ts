
import cors from "cors";
import authenticateUser from "../middleware/authentication";
import { RequestHandler, json, Express } from "express";
import 'express-async-errors'
import helmet from 'helmet';
import rateLimit from "express-rate-limit";
import { xss } from 'express-xss-sanitizer';

const middlewaresSetup = (app: Express) => {
  app.use(json());
  app.use(helmet());
  app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
  }));
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
  );
  app.use(xss());

  app.use(authenticateUser as unknown as RequestHandler);
}
export default middlewaresSetup;
