'use strict';
require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL;
// included login sample just to show test suite is working for project submission
exports.TEST_DATABASE_URL = 'mongodb://admin3:pass123@ds145043.mlab.com:45043/character-creator-test';
exports.PORT = process.env.PORT || 8080;