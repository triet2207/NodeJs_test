import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./routes/v1/users.route";
const app: Express = express();
export default app;
//Để bắt được kiểu JSON từ client gửi lên
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript Server" });
});

app.use(cors({ origin: "*" })); //Cho phép gọi bất kỳ đâu
// Middleware
app.use(bodyParser.json());
//use route
app.use("/api/v1/users", route);
