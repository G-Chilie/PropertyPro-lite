import flagModel from '../models/flag';

class FlagController {
  static async createFlag(req, res) {
    try {
      const { property_id, reason, description } = req.body;
      const values = [property_id, reason, description];
      const flag = await flagModel.create(values);
      if (flag) {
        return res.status(201).json({
          status: 'success',
          data: flag
        });
      }
    } catch (err) {
      console.log(err)

      return res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }
}

export default FlagController;
