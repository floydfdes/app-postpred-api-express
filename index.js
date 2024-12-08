import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import swaggerDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import authRouter from "./routes/auth.js";
import commentRouter from "./routes/comments.js";
import contactRouter from "./routes/contact.js";
import postRouter from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 1337;

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
app.use("/comment", commentRouter);
app.use("/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("This is HobbyNest API");
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "HobbyNest API",
      description: "This is a CRUD api for the InterestHub app ",
      version: "2.0.0",
      contactName: {
        name: "Floyd Fernandes",
      },
      contact: {
        name: "Floyd Fernandes",
        url: "https://interesthub.netlify.app/",
        email: "floydprogrammer@gmail.com",
      },
      servers: ["https://hobbies-project.herokuapp.com/posts"],
    },
  },
  host: "https://interesthub.netlify.app/",
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
  apis: ["index.js", "routes/posts.js", "routes/comments.js", "routes/auth.js", "routes/contact.js"],
};

const swaggerDocs = swaggerDoc(swaggerOptions);

app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocs, {
  auth: {
    url: "/auth",
  },
}));

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
