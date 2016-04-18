var li = require('./linearInterpolation.js');

var f = function(x){
	return 3*x + Math.sin(x) - Math.exp(x);
};

var result = li.secant(f, 1, 0, 0.0000001);
//var result = linearInterpolation().regulaFalsi(f, 0, 1, null);
console.log(result);
