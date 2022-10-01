import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import swaggerDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import contactRouter from "./routes/contact.js";

const app = express();

dotenv.config();
console.log("connected to api");

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 5000;

/**
 * security:
 *  - app_id: []
 */

/**
 * components:
 *   securitySchemes:
 *       app_id:
 *           type: apiKey
 *           description: API key to authorize requests.
 *           name: appid
 *           in: query
 */

app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("This is PostPred API");
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "PostPred API",
      description: "This is a CRUD api for the PostPred app ",
      version: "2.0.0",
      contactName: {
        name: "Floyd Fernandes",
      },
      contact: {
        name: "Floyd Fernandes",
        url: "https://postpred.netlify.app/",
        email: "floydprogrammer@gmail.com",
      },
      servers: ["https://hobbies-project.herokuapp.com/posts"],
    },
  },
  host: "https://postpred.netlify.app/",
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
  apis: ["index.js", "routes/posts.js", "routes/auth.js", "routes/contact.js"],
};

const swaggerDocs = swaggerDoc(swaggerOptions);

app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
