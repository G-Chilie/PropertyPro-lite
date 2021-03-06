import propertyModel from '../models/property';
import userModel from '../models/users'
import shortid from 'shortid'

class PropertyController {
  /**
         *
         * @param {object} req - request
         * @param {object} res - response
         */
  static async createPropertyAd(req, res) {
    try {
      let owner_email = null
      const { id: owner } = req.body.tokenPayload;
      const ownerData = await userModel.findById(owner)
      if (ownerData) {
        owner_email = ownerData.email
      }
      const id = shortid.generate()
      const state = req.body.state || null
      const price = req.body.price || 0
      const address = req.body.address || null
      const type = req.body.type || null
      const image_url = req.body.image_url || null
      const city = req.body.city || null
      const values = [id, owner, price, state, address, type, image_url, owner_email, city];
      const property = await propertyModel.create(values);
      if (property) {
        return res.status(201).json({
          status: 'success',
          data: property
        });
      }
    } catch (err) {
      console.log(err)
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
          data: {
            status: 'available',
            ...property
          }
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
        return res.status(200).json({ status: 200, data: { status: 'available', ...property } });
      }
      return res.status(404).json({
        status: 404,
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
      if (propertys) {
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
