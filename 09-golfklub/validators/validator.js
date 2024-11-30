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
        return res.status(400).json({success: false, message: error.details[0].message });
      }
      next();
    };
  };
  
 export default validateRequest;
  