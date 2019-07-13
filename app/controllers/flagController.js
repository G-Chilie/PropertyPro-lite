import flagModel from '../models/flag';

class FlagController {
  static async createFlag(req, res) {
    try {
      const { propertyId, reason, description } = req.body;
      const values = [propertyId, reason, description];
      const flag = await flagModel.create(values);
      if (flag) {
        return res.status(201).json({
          status: 201,
          data: [flag],
          message: 'Property Ad has been flaged successfully'
        });
      }
    } catch (err) {
      return res.status(500).json({ error: true, message: 'Internal server error' });
    }
  }
}

export default FlagController;
