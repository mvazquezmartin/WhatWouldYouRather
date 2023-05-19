const bcrypt = require("bcrypt");

const createHash = (pw) => {
  const salt = bcrypt.genSaltSync(10);
  const passEncrypted = bcrypt.hashSync(pw, salt);

  return passEncrypted;
};

const pwValidate = (pw, user) => {
  const response = bcrypt.compareSync(pw, user.password);

  return response;
};

module.exports = {
  createHash,
  pwValidate,
};
