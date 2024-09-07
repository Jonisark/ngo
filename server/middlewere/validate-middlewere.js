const validate = (schema) => async (req, res, net) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody
        net()
    } catch (err) {
        
        console.log(err.errors?.[0]?.message || 'validation error');
        res.status(400).json({msg: 'validation failed'})
    }
}

module.exports = validate;