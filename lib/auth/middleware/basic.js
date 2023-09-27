'use strict';

const base64 = require('base-64');
const { userSchema } = require('../models');

async function  basicAuth(req, res, next) {

  if (!req.headers.authorization) { 
    next('Invalid Login'); 
  }
  let encodedString = req.headers.authorization.split(' ')[1];
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');
  let validUser = await UserModel.authenticateBasic(username, password);
  try {
    req.user = await user.authenticateBasic(username, pass)
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

}

module.exports = basicAuth;