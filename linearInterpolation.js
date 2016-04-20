var Secant 				= require('./methods/secant.js'),
	RegulaFalsi 		= require('./methods/regulaFalsi.js'),
	Newton 				= require('./methods/newton.js'),
	Mueller 			= require('./methods/mueller.js');
	FixedPointIteration = require('./methods/fixed-point-iteration.js');

var linearInterpolation = function() {
	return {
		secant:function(f, x0, x1, TOL) {
			return Secant.cal(f, x0, x1, TOL);
		},
		regulaFalsi:function(f, x0, x1, TOL) {
			return RegulaFalsi.cal(f, x0, x1, TOL);
		},
		newton:function(f, x, TOL1, TOL2) {
			return Newton.cal(f, x, TOL1, TOL2);
		},
		mueller:function(f, x2, x0, x1) {
			return Mueller.cal(f, x2, x0, x1);
		},
		fixedPointIteration:function(g, x1, TOL) {
			return FixedPointIteration.cal(g, x1, TOL);
		}
	};
};

module.exports = linearInterpolation();
