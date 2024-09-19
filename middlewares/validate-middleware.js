const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();   
  } catch (error) {
    const message = "Fill the input Correctly";
    const status = 401;
    const extraDetails = error.errors[0].message;

    const obj = {
      status,
      message,
      extraDetails,
    };
    console.log(obj);
    // res.status(400).json({ message: error.errors[0].message });
    next(obj);
  }
};

module.exports = validate;
