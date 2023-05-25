const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2d';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization; 

    //console.log("token:", token);

    if (req.headers.authorization) {
      //console.log("req.headers.authorization is good")
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      //console.log("token is falsy");
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // console.log("JWT decoded token (data):", data);
      req.user = data;
      // console.log("req.context.user:", req.context.user);
      // console.log("req.context.user_id:", req.context.user_id);
    } catch {
      console.log('Invalid token');
    }

    return req;
    
  },
  signToken: function ({ username, _id }) {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

