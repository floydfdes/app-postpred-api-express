import express from "express";
import { sendContactUsEmail } from "../controllers/contact.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: API to send contact mail.
 *
 */

/**
 * @swagger
 * /contact:
 *  post:
 *   summary: send contacts us email
 *   tags: [Contact]
 *   parameters:
 *   - in: formData
 *     name: firstName
 *     type: string
 *     description: Enter first name.
 *   - in: formData
 *     name: lastName
 *     type: string
 *     description: Enter last name.
 *   - in: formData
 *     name: email
 *     type: email
 *     description: Enter email address.
 *   - in: formData
 *     name: message
 *     type: text
 *     description: Enter message.
 *   responses:
 *     '201':
 *       description: email was sent
 */
router.post("/", sendContactUsEmail);

export default router;
