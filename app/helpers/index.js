class Helpers {
    static extractErrors(errors) {
      const validationErrors = [];
      errors.map(error => validationErrors.push(error.msg));
      return validationErrors;
    }
  
    static isANumber(num) {
      return Number.isInteger(Number(num));
    }
  
    static updateType(req, res, type, data, id, name) {
      for (let i = 0; i < type.length; i += 1) {
        if (type[i].id === id) {
          type.splice(i, 1);
          type.push(data);
          return res.status(200).json({
            status: 200,
            data: [data],
            message: `${name} Ad updated successfully`,
          });
        }
      }
    }
}

export default Helpers;
