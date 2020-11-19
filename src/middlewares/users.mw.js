const { hashPassword } = require('../libs/password');

module.exports = {
  hashPassword() {
    return (context) => {
      context.data.password = hashPassword(context.data.password);
      return context;
    };
  },
};
