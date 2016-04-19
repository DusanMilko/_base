'use strict';

module.exports = function parseJSON(data, options) {
  return options.fn(JSON.parse(data));
};
