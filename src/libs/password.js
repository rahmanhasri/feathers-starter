const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(0);
    return bcrypt.hashSync(plainPassword, salt);
  },
  comparePassword(hashedPassword, plainPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  },
};
