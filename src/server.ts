import express, { Application } from "express";
import routes from "./routes";

const app: Application = express();

app.use(express.json());

const port: number = 3000;

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
