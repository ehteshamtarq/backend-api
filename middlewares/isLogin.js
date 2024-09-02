const verifyToken = require("../utils/verifyToken");
const Admin = require('../model/Staff/Admin');
const isLogin = async(req, res, next) => {
  // get token from header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  const verifiedToken = verifyToken(token);
  console.log(verifiedToken);
  if (verifiedToken) {
    const admin = await Admin.findById(verifiedToken.id).select('name email role')
    req.userAuth = admin;
    next();
  } else {
    const err = new Error("Token expired/invalid");
    next(err);
  }

  // verify the token
  //save the user into req.obj
};

module.exports = isLogin;
