import Joi from "joi";

export const registerValidation = (data) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(6).required(),
    lastName: Joi.string().min(6).required(),
    age: Joi.string()
      .min(1)
      .pattern(/^[0-9]+$/)
      .required(),
    gender: Joi.string().min(1).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
