export const validateRequest = (schema) => async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query
      });
      return next();
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.log(error);
        return res.status(400).json({success: false, message: error.errors });
      }
      next();
    };
  };
  
 export default validateRequest;
  