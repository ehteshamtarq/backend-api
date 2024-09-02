const bcrypt = require("bcryptjs");
//hash password

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.isPassMatched = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
