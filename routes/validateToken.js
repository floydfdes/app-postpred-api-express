import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authentication = (req, res, next) => {
  console.log("authentication");

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) res.status(401).send("access denied");

    let verifiedUser;
    const isCustomAuth = token.length < 500;
    if (isCustomAuth) {
      verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
      req.userId = verifiedUser.id;
    } else {
      verifiedUser = jwt.decode(token);
      req.userId = verifiedUser.sub;
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
