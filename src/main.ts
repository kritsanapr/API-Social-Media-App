import express from "express";
import { urlencoded, json } from "body-parser";

const app = express();

const port = process.env.PORT || 8080;

// app.use(
//   urlencoded({
//     extended: true,
//   })
// );
// app.use(json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => console.log(`Server listening on ${port}`));
