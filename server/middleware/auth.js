import base64 from 'base-64';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import models from '../database/models';


/**
 * Express middleware to verify if request has jwt auth token
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {function} next express middleware next() function
 * @returns {function} express next() function
 */
export default async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const basicAuthCredentials = base64.decode(req.headers.authorization.split(' ')[1]).split(':');
      const user = await models.User.findOne({ where: { email: basicAuthCredentials[0] } });
      if (user) {
        const isCorrectPassword = await bcrypt.compare(basicAuthCredentials[1], user.password);
        if (isCorrectPassword) {
          req.authUser = user.get();
          return next();
        }

        throw new Error('Wrong password.');
      }

      throw new Error('Wrong credentials.');
    } catch (error) {
      return res.sendFailureResponse({ message: 'Unauthenticated.' }, 401);
    }
  }

  const accessToken = req.body.access_token || req.query.access_token || req.headers['x-access-token'];

  try {
    const userData = jwt.verify(accessToken, config.JWT_SECRET);
    const user = await models.User.findOne({ where: { email: userData.email } });
    if (user) {
      req.authUser = user.get();
      req.authUserObj = user;
      return next();
    }
  } catch (error) {
    return res.sendFailureResponse({ message: 'Unauthenticated.' }, 401);
  }
};
