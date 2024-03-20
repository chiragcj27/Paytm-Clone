const z = require("zod");

const signupSchema = z.object({
    username: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string().min(6)
})

const signinSchema = z.object({
    username: z.string().email(),
    password: z.string()
})

const updateBodySchema = z.object({
    password: z.string().min(6),
    firstname: z.string(),
    lastname: z.string()
})

module.exports = {signupSchema, signinSchema, updateBodySchema};
