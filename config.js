'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://admin:Password1!@ds255784.mlab.com:55784/character-creator';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:Password1!@ds145043.mlab.com:45043/character-creator-test';
exports.PORT = process.env.PORT || 8080;