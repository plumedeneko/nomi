import express from 'express';
import router from "./routes/users.js";

const app = express();
const port = 5050;

app.use(express.json());

app.use('/users', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
