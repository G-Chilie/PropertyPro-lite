import propertyModel from '../models/property';

class PropertyController {
  /**
         *
         * @param {object} req - request
         * @param {object} res - response
         */
  static async createPropertyAd(req, res) {
      try {
      const { id: owner } = req.body.tokenPayload;
      const { state, price, address, type, image_url} = req.body;
      const values = [owner, price, state, address, type, image_url];
      const property = await propertyModel.create(values);
      if (property) {
        return res.status(201).json({
          status: 201,
          data: [property],
        });
      }
    } catch (err) {
      return res.status(500).json({ error: true, message: 'Internal server error' });
    }
  }

  static async updatePropertyAdStatus(req, res) {
    const { propertyId } = req.params;
    const { status } = req.body;
    const data = { name: 'status', value: status };
    try {
      const property = await propertyModel.update(propertyId, data);
      if (property) {
        return res.status(200).json({
          status: 200,
          data: [property],
          message: 'Property Ad updated successfully',
        });
      }
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Internal Server error' });
    }
  }


  static async updatePropertyAdPrice(req, res) {
    const { propertyId } = req.params;
    const { price } = req.body;
    const data = { name: 'price', value: price };
    try {
      const property = await propertyModel.update(propertyId, data);
      if (property) {
        return res.status(200).json({
          status: 200,
          data: [property],
        });
      }
      return res.status(500).json({ status: 404, error: `Property with id: ${propertyId} does not exist` });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Internal Server error' });
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

  static async getAllPropertys(req, res) {
    try {
      const propertys = await propertyModel.getAll();
      if (propertys) {
        return res.status(200).json({ status: 200, data: [propertys] });
      }
      return res.status(404).json({
        status: 404,
        error: 'No property exist',
      });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
  }

  static async getAProperty(req, res) {
    try {
      const { propertyId } = req.params;
      const property = await propertyModel.getById(propertyId);
      if (property) {
        return res.status(200).json({ status: 200, data: [property] });
      }
      return res.status(404).json({
        status: 404,
        error: `Property with id: ${propertyId} does not exist`,
      });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
  }

  static async deletePropertyAd(req, res) {
    const { propertyId } = req.params;
    try {
      const property = await propertyModel.delete(propertyId);
      if (property) {
        return res.status(200).json({
          status: 204,
          data: [],
          message: 'Property Ad deleted successfully',
        });
      }
      return res.status(404).json({ status: 404, message: `Property with id: ${carId} not found` });
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Internal Server error' });
    }
  }
}

export default PropertyController;
