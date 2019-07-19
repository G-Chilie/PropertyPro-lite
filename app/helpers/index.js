class Helpers {
    static extractErrors(errors) {
      const validationErrors = [];
      errors.map(error => validationErrors.push(error.msg));
      return validationErrors;
    }
}

export default Helpers;
