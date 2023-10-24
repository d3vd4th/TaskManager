import express  from "express"
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import colors from "colors";
import routes from "./routes/routes";
import cors from "cors";
colors.enable();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
console.log("Trying to connect to mongodb".bgBlue)
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log(`Connected To MongoDB...`.bgGreen))
  .catch((err) => console.log(err));
app.use(routes);
app.listen(PORT, () => console.log(`Listening on: ${PORT}`.yellow));
