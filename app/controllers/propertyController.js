import shortId from 'shortid';
import propertyModel from '../models/property';
import Helper from '../helpers/index'

class PropertyController {
  /**
         *
         * @param {object} req - request
         * @param {object} res - response
         */
  static async createPropertyAd(req, res) {
    const id = shortId.generate();
    const status = 'available';
    const createdOn = new Date();
    try {
      const { id: owner } = req.body.tokenPayload;
      const { state, price, address, type } = req.body;
      const property = {
        id, owner, createdOn, state, status, price, address, type
      };
      propertyModel.push(property);
      return res.status(201).json({
        status: 201,
        data: [property],
        message: 'Property Ad created successfully',
      });
    } catch (err) {
      return res.status(500).json({ error: true, message: 'Internal server error' });
    }
  }


  static async updatePropertyAdPrice(req, res) {
    const { propertyId } = req.params;
    const { price } = req.body;
    try {
      let property = propertyModel.find(property => property.id === propertyId);
      property = { ...property, price };
      Helper.updateType(req, res, propertyModel, property, propertyId, 'property')
      return res.status(500).json({ status: 500, error: 'Oops, something happend, try again' });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Internal Server error' });
    }
  }

  static async updatePropertyAdStatus(req, res) {
    const { propertyId } = req.params;
    const { status } = req.body;
    try {
      let property = propertyModel.find(property => property.id === propertyId);
      property = { ...property, status };
      Helper.updateType(req, res, propertyModel, property, propertyId, 'property')
      return res.status(500).json({ status: 500, error: 'Oops, something happend, try again' });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
  }

  static async getAllPropertys(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'propertys retrieved successfully',
      todos: propertyModel,
    });
  }

  static async getPropertysByType(req, res) {
    const { propertyType } = req.params;
    try {
      const property = propertyModel.filter(property => property.type === propertyType);
      if (property) {
        return res.status(200).json({ status: 200, data: [property] });
      }
      return res.status(404).json({
        status: 404,
        error: `Property with type: ${propertyType} does not exist`,
      });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Interal server error' });
    }
  }
  static async getPropertysByType(req, res) {
    const { propertyType } = req.params;
    try {
      const property = propertyModel.filter(property => property.type === propertyType);
      if (property) {
        return res.status(200).json({ status: 200, data: [property] });
      }
      return res.status(404).json({
        status: 404,
        error: `Property with type: ${propertyType} does not exist`,
      });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Interal server error' });
    }
  }

  static async getAProperty(req, res) {
    const { propertyId } = req.params;
    try {
      const property = propertyModel.find(property => property.id === propertyId);
      if (property) {
        return res.status(200).json({ status: 200, data: [property] });
      }
      return res.status(404).json({
        status: 404,
        error: `Property with id: ${propertyId} does not exist`,
      });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Interal server error' });
    }
  }
}

export default PropertyController;
