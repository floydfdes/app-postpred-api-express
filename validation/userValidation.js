import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(255).required().messages({
    "string.min": "First name must be at least 3 characters long",
    "string.max": "First name cannot exceed 255 characters",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().min(3).max(255).required().messages({
    "string.min": "Last name must be at least 3 characters long",
    "string.max": "Last name cannot exceed 255 characters",
    "any.required": "Last name is required",
  }),
  age: Joi.number().min(1).max(200).required().messages({
    "number.min": "Age must be at least 1",
    "number.max": "Age cannot exceed 200",
    "any.required": "Age is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "Gender must be one of 'male', 'female', or 'other'",
    "any.required": "Gender is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export const editUserSchema = Joi.object({
  firstName: Joi.string().min(3).max(255).optional(),
  lastName: Joi.string().min(3).max(255).optional(),
  age: Joi.number().min(1).max(200).optional(),
  email: Joi.string().email().optional(),
  profilePicture: Joi.string()
    .optional()
    .allow('', null)
    .pattern(/^data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+$/)
    .messages({
      "string.pattern.base": "Profile picture must be a valid Base64 string",
    }),
});


export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "New password must be at least 6 characters long",
    "any.required": "New password is required",
  }),
});
