import Joi from "joi";

export const createPostSchema = Joi.object({
    title: Joi.string().required().messages({
        "string.empty": "Title is required",
    }),
    description: Joi.string().min(10).required().messages({
        "string.empty": "Description is required",
        "string.min": "Description must be at least 10 characters long",
    }),
    tags: Joi.array().items(Joi.string()).optional().messages({
        "array.base": "Tags must be an array of strings",
    }),
    postImage: Joi.string()
        .optional()
        .pattern(/^data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+$/)
        .messages({
            "string.pattern.base": "Post image must be a valid Base64 string",
        }),
});

export const updatePostSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().min(10).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    postImage: Joi.string()
        .optional()
        .pattern(/^data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+$/),
    likes: Joi.array().items(Joi.string()).optional(),
});
