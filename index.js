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

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 1337;

// Routes
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/comment", commentRouter);
app.use("/contact", contactRouter);

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to InterestHub API</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f7fa;
            color: #333;
            text-align: center;
            padding: 50px;
          }
          h1 {
            font-size: 3rem;
            color: #4caf50;
            margin-bottom: 20px;
          }
          p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .cta {
            background-color: #007bff;
            color: #fff;
            padding: 15px 30px;
            font-size: 1.2rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .cta:hover {
            background-color: #0056b3;
          }
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .features {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 30px;
          }
          .feature {
            font-size: 1.1rem;
            background-color: #e0f7fa;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to InterestHub API</h1>
          <p>
            InterestHub is the place to share and explore your passions with others. Whether you're into sports, music, technology, or anything else, our API lets you engage with a vibrant community of like-minded individuals.
          </p>
          
          <div class="features">
            <div class="feature">
              <strong>Post about your personal interests:</strong> Share what excites you and let others discover your passions.
            </div>
            <div class="feature">
              <strong>Like and comment on other users' posts:</strong> Engage with the community by interacting with their posts.
            </div>
            <div class="feature">
              <strong>Discover new interests and connect with others:</strong> Explore a variety of topics and connect with like-minded individuals.
            </div>
          </div>
          
          <p>
            Ready to dive in and explore the API? Visit the documentation below:
          </p>
          <a href="/api" class="cta">Go to API Docs</a>
        </div>
      </body>
    </html>
  `);
});


// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "InterestHub API",
      description: "This is a CRUD API for the InterestHub app",
      version: "2.0.0",
      contact: {
        name: "Floyd Fernandes",
        url: "https://interesthub.netlify.app/",
        email: "floydprogrammer@gmail.com",
      },
    },
    servers: [
      {
        url: "https://interesthub-api.herokuapp.com", // Updated Base API URL
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["index.js", "./routes/posts.js", "./routes/comments.js", "./routes/auth.js", "./routes/contact.js"], // Adjust paths to your route files
};

const swaggerDocs = swaggerDoc(swaggerOptions);

app.use(
  "/api",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, {
    swaggerOptions: {
      displayRequestDuration: true, // Displays request duration in Swagger UI
      persistAuthorization: true,  // Persists authorization data after refresh
    },
    customSiteTitle: "InterestHub API Docs", // Custom title for Swagger UI
  })
);

// Database Connection and Server Start
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
