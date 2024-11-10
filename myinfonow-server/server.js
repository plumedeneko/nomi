import express from 'express';
import usersRouter from "./routes/users.js";
import infoRouter from "./routes/info.js";
import cors from 'cors';

const app = express();
const port = 5050;

app.use(cors());

app.use(express.json());

app.use('/users', usersRouter);
app.use('/users', infoRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
