import Helpers from '../helpers';
import propertyModel from '../models/property';
const { extractErrors } = Helpers;

class PropertyValidator {
  static validateProperty(req, res, next) {
    req.checkBody('state', 'Property state is required').notEmpty().trim().isAlpha()
      .withMessage('Property state can only contain alphabets');
    req.checkBody('price', 'Property price is required').notEmpty().isCurrency({ allow_negatives: false, require_decimal: false })
      .withMessage('Property price must be a valid number');
    req.checkBody('address', 'Property address is required').notEmpty().trim();
    req.checkBody('type', 'Property type is required').notEmpty();
    const error = req.validationErrors();
    if (error) {
      return res.status(400).json({ status: 400, error: extractErrors(error) });
    }
    return next();
  }

  static isPropertyExist(req, res, next) {
    const propertyId = req.params.propertyId || req.body.property_id;
    try {
      const property = propertyModel.getById(propertyId);
      if (!property) {
        return res.status(404).json({ status: 404, error: `Property Ad with id: ${propertyId} does not exist`});
      }
      next();
    } catch (error) {
      console.log(error)
      return res.status(500).json({ status: 500, error: 'Inernal server error'})
    }
  }

  static validateStatus(req, res, next) {
    req.checkBody('status', 'Property status is required').notEmpty().trim().isIn(['sold', 'available'])
      .withMessage('Property status can only be sold or available')
      .isString()
      .withMessage('Property status must be a string');

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ status: 400, error: extractErrors(errors) });
    }
    return next();
  }

  static validatePrice(req, res, next) {
    req.checkBody('price', 'Property price is required').notEmpty().trim().isFloat()
      .withMessage('Property price must contain decimal point');

      const errors = req.validationErrors();
      if (errors) {
        return res.status(400).json({ status: 400, error: extractErrors(errors) });
      }
      return next();
  }
}

export default PropertyValidator