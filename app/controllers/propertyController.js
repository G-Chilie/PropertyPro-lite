import propertyModel from '../models/property';
import userModel from '../models/users'

class PropertyController {
  /**
         *
         * @param {object} req - request
         * @param {object} res - response
         */
  static async createPropertyAd(req, res) {
      try {
        let owner_email
      const { id: owner } = req.body.tokenPayload;
      const ownerData = await userModel.findById(owner)
      if(ownerData){
        owner_email = ownerData.email
      }
      const { state, price, address, type, image_url, city} = req.body;
      const values = [owner, price, state, address, type, image_url, owner_email, city];
      const property = await propertyModel.create(values);
      if (property) {
        return res.status(201).json({
          status: 'success',
          data: property
        });
      }
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
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
          status: 'success',
          data: property
        });
      }
      return res.status(500).json({ status: 'error', error: `Property with id: ${propertyId} does not exist` });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server error' });
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
          status: 'success',
          data: property
        });
      }
      return res.status(500).json({ status: 'error', error: `Property with id: ${propertyId} does not exist` });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal Server error' });
    }
  }


  static async getAllPropertys(req, res) {
    try {
      const propertys = await propertyModel.getAll();
      if (propertys) {
        return res.status(200).json({ status: 'success', data: propertys });
      }
      return res.status(404).json({
        status: 'error',
        error: 'No property exist',
      });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }

  static async getAProperty(req, res) {
    try {
      const { propertyId } = req.params;
      const property = await propertyModel.getById(propertyId);
      if (property) {
        return res.status(200).json({ status: 'success', data: property });
      }
      return res.status(404).json({
        status: 'error',
        error: `Property with id: ${propertyId} does not exist`
      });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }

  static async getPropertysByType(req, res) {
    const { type } = req.query;
    try {
      const propertys = await propertyModel.getByType(type);
      if(propertys) {
        return res.status(200).json({ status: 'success', data: propertys });
      }
      return res.status(404).json({
        status: 'error',
        error: `No property exist with type: ${type}, type is case sensitive`
      });
    } catch (err) {
      return res.status(500).json({ status: 'error', error: `Internal server error` });
    }
  } 

  static async deletePropertyAd(req, res) {
    const { propertyId } = req.params;
    try {
      const property = await propertyModel.delete(propertyId);
      if (property) {
        return res.status(200).json({
          status: 'success',
          data: { message: 'Property Ad deleted successfully' }
        });
      }
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Internal Server error' });
    }
  }
}

export default PropertyController;
