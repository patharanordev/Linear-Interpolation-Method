var gaussianElimination = function(){
	return {
		situation: function(){
			return 'To solve a system of n linear equations: Ax = b';
		},
		pseudoCode:function(){
			return 'coming soon...';
		},
		cal:function(g, x1, TOL) {
			var objResult = { isSuccess:false, result:'' };

			if (typeof g === "function") {
				var x2;
				var gx1;
				var iteration = 1;
				var prevGx;
				var fiveSignificantFigures = 0;
				
			} else {
				objResult.isSuccess = false;
				objResult.result += ' - Error in Gaussian Elimination method : ' + g + ' is not function';
				console.log(' - Error in Gaussian Elimination method method : ' + g + ' is not function');
			}

			return objResult;
		},
		checkResult:function(){
			// var result = { isSuccess:false, result:'true' };
			// if (typeof g_diff === "function") {
			// 	objResult.isSuccess = true;
			// } else {
			// 	objResult.isSuccess = false;
			// 	objResult.result += ' - Error in Gaussian Elimination method : ' + g_diff + ' is not function';
			// 	console.log(' - Error in Gaussian Elimination method : ' + g_diff + ' is not function');
			// }
			// return result;
		}
	};
};

module.exports = gaussianElimination();
