const request = require('request');
const qs = require('querystring');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

app.use(cookieParser());

const githubController = {};

// request a user's github identity
githubController.authenticate = (req, res, next) => {
  // client id is the required parameter to get authorized
  res.locals.url = 'https://github.com/login/oauth/authorize?' + 'redirect_uri=http://localhost:3000/oauth2/github/callback&' + 'client_id=5495937af1a3594b747b';
  return next();
}

githubController.accessToken = (req, res, next) => {
  console.log('req.query',req.query);
  // client id, client secret, and code are required parameters in the post request for access token
  var tokenQuery = {
    client_id: '5495937af1a3594b747b',
    client_secret: 'ba14f931515684e762767711e0e3800712e9750e',
    // save code so that it can be exchanged for access token
    code: req.query.code,
    accept:'application/json'
  }
  // this time we're using the built-in "querystring" module to serialize an object to a query string
  var url = 'https://github.com/login/oauth/access_token?' + qs.stringify(tokenQuery);
  var options = {
    url: url,
    headers: {
      'user-agent': 'articuno'  // this is required by GitHub API. but it can be ANY string
    },
    json: true
  };
  // http post request to provide the code to exchange for access token
  request.post(options, function(err, resp, body) {
    if (err) return res.send(500, err);
    console.log('body', body);
    // set cookie and specify expiration time
    res.cookie('Gcookie', body.access_token, {maxAge: 360000});
    // use access token to access api
    var options = {
      url: 'https://api.github.com/user',
      // specify required header by github
      headers: {
        'user-agent': 'articuno',
        'Accept': 'application/json',
        'Authorization': 'token ' + body.access_token
      },
      json: true
    };
    // http get request to access api
    request(options, function(err, resp, body) {
      console.log('secondBody', body);
      res.send(body);
    });
  });
  next();
}

module.exports = githubController;
