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

}

export default PropertyController;
