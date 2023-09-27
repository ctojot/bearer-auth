'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../models/index.js');

const app = express();
const secretKey = 'your-secret-key';
const Router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

async function handleSignup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(200).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: request.user,
      token: request.user.token
    };
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    };
    const token = jwt.sign({ user: authenticatedUser }, secretKey, { expiresIn: '1h' });
    const userId = {
      _id: user._id, 
      username: user.username,
    };
    res.status(200).json({
      user,
      token,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await Users.findAll({});
    const list = users.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).text("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}