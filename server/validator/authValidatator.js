const { z } = require('zod');

// Zod schema for registration validation
const registrationSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

// Zod schema for login validation
const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

module.exports = {
    registrationSchema,
    loginSchema
};


