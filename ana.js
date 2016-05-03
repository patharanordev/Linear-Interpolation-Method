
var math = require('mathjs');
var Secant 				= require('./chapters/1-Solving-Nonlinear-Equations/secant.js'),
	RegulaFalsi 		= require('./chapters/1-Solving-Nonlinear-Equations/regulaFalsi.js'),
	Newton 				= require('./chapters/1-Solving-Nonlinear-Equations/newton.js'),
	Mueller 			= require('./chapters/1-Solving-Nonlinear-Equations/mueller.js'),
	FixedPointIteration = require('./chapters/1-Solving-Nonlinear-Equations/fixed-point-iteration.js'),
	GaussianElimination = require('./chapters/2-Solving-Sets-Equations/gaussian-elimination.js');


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
		},
		test:function(){

			// For GaussianElimination

			var A = math.matrix([[0, 2, 0, 1], [2, 2, 3, 2], [4, -3, 0, 1], [6, 1, -6, -5]]); 
			var b = math.matrix([[0, -2, -7, 6]]);

			// Size row x col
			var mxn = math.size(A);

			var pivot = {};
			var pvt;
			var ipvt_temp;

			for(var j=1; j<mxn[0]-1; j++){
				pvt = Math.abs(A.subset([j, j]));
				pivot[j] = j;
				ipvt_temp = j;

				for(var i=j+1; i<mxn[0]; i++){
					if(A.subset([i, j])>pvt){
						pvt = Math.abs(A.subset([i, j]));
						ipvt_temp = i;
					}
				}

				// Switch rows if necessary
				if(pivot[j]!=ipvt_temp){
					// <------- Add 'Switch rows' fn 
				}

				for(var i=j+1; i<mxn[0]; i++){
					var multipliers = parseFloat(A.subset([i, j]))/parseFloat(A.subset([j, j]));
					A.subset(math.index(i, j), multipliers);
				}

				// Create zeros below the main diagonal
				for(var i=j+1; i<mxn[0]; i++){
					var val;
					for(var k=j+1; k<mxn[0]; k++){
						val = A.subset([i, k]) - A.subset([i, j]) * A.subset([j, k]);
						A.subset(math.index(i, k), val);
					}

					val = b.subset([i, 0]) - A.subset([i, j]) * b.subset([j, 0]);
					b.subset(math.index(i, 0), val);
				}
			}


			// <-------- Add remaining fn 
			return math.square(A);
		}
	};
};

module.exports = linearInterpolation();
