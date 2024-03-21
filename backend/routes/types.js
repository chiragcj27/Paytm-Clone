const z = require("zod");

const signupSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6)
})

const signinSchema = z.object({
    username: z.string().email(),
    password: z.string()
})

const updateBodySchema = z.object({
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string()
})

module.exports = {signupSchema, signinSchema, updateBodySchema};
