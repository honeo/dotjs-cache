console.log('type-check: test');

// babel
require('babel-polyfill');
require("babel-register")({
	presets: ['latest', 'stage-0']
});

const result = require('./cases.js').default;
console.log('type-check: test', result);
