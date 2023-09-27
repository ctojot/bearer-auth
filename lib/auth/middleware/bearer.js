'use strict';

const { userSchema } = require('../models');

async function bearerAuth(req, res, next) {

  if (!req.headers.authorization) {
    next('Invalid Login');
  }

  const token = req.headers.authorization.split(' ')[1];
  const userRecord = await userSchema.authenticateToken(token);
  if (userRecord) {
    req.user = validUser;
    req.token = validUser.token;

  } else {
    next('Invalid token');
  }
}

module.exports = bearerAuth;