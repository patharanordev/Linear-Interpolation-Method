var linearInterpolation = function() {
	return {
		secant:function(f, x0, x1, TOL) {
			var objResult = { isSuccess:false, result:'' };
			var x2 = 0;

			if (typeof f === "function") {
				var fn_x0 = f(parseFloat(x0));
				var fn_x1 = f(parseFloat(x1));
				var fn_x2 = null;
				var iteration = 1;

				var prevX2 = 0;
				var fiveSignificantFigures = 0;

				if(Math.abs(fn_x0) < Math.abs(fn_x1)) {
					objResult.result += ' - Found |f(x0)| < |f(x1)|, swaped x0 with x1';
					console.log(' - Found |f(x0)| < |f(x1)|, swaped x0 with x1');

					var tmp = x0;
					x0 = x1;
					x1 = tmp;
					tmp = null;
				}

				console.log('|Iteration|  x0  |  x1  |  x2  | f(x0) | f(x1) | f(x2) |');
				while(true){
					fn_x0 = f(parseFloat(x0));
					fn_x1 = f(parseFloat(x1));
					x2 = x1 - (((fn_x1*parseFloat(x0)) - (fn_x1*parseFloat(x1))) / ( fn_x0 - fn_x1 ));
					fn_x2 = f(parseFloat(x2));

					if(parseFloat(prevX2).toFixed(10)==parseFloat(x2).toFixed(10)) 
						fiveSignificantFigures += 1;
					else fiveSignificantFigures = 0;

					console.log('|' + 
						iteration + '|' + 
						x0 + '|' + 
						x1 + '|' + 
						x2 + '|' + 
						fn_x0 + '|' + 
						fn_x1 + '|' + 
						fn_x2 + '|');
					
					if(TOL==null){
						if(fiveSignificantFigures==5) {
							objResult.isSuccess = true;
							objResult.result = parseFloat(x2).toFixed(10);
							break;
						}
					} else {
						if(Math.abs(fn_x2) < parseFloat(TOL)) {
							objResult.isSuccess = true;
							objResult.result = x2;
							break;
						}
					}

					x0 = x1;
					x1 = x2;
					iteration++;
					prevX2 = x2;
				}
			} else {
				objResult.isSuccess = false;
				objResult.result += ' - Error : ' + f + ' is not function';
				console.log(' - Error : ' + f + ' is not function');
			}

			return objResult;
		},
		regulaFalsi:function(f, x0, x1, TOL) {
			// Like 'Secant method' but support false position
			var objResult = { isSuccess:false, result:'' };
			var x2 = 0;

			var prevX2 = 0;
			var fiveSignificantFigures = 0;

			if (typeof f === "function") {
				var fn_x0 = null;
				var fn_x1 = null;
				var fn_x2 = null;
				var iteration = 1;

				console.log('|Iteration|  x0  |  x1  |  x2  | f(x0) | f(x1) | f(x2) |');
				while(true){
					fn_x0 = f(parseFloat(x0));
					fn_x1 = f(parseFloat(x1))
					x2 = x1 - (((fn_x1*parseFloat(x0)) - (fn_x1*parseFloat(x1))) / ( fn_x0 - fn_x1 ));
					fn_x2 = f(parseFloat(x2));

					if(parseFloat(prevX2).toFixed(10)==parseFloat(x2).toFixed(10)) 
						fiveSignificantFigures += 1;
					else fiveSignificantFigures = 0;

					console.log('|' + 
						iteration + '|' + 
						x0 + '|' + 
						x1 + '|' + 
						x2 + '|' + 
						fn_x0 + '|' + 
						fn_x1 + '|' + 
						fn_x2 + '|');

					if(TOL==null){
						if(fiveSignificantFigures==5) {
							objResult.isSuccess = true;
							objResult.result = parseFloat(x2).toFixed(10);
							break;
						}
					} else {
						if(Math.abs(fn_x2) < parseFloat(TOL)) {
							objResult.isSuccess = true;
							objResult.result = x2;
							break;
						}
					}

					if((fn_x2 < 0 && fn_x0 > 0) || (fn_x2 > 0 && fn_x0 < 0)) {
						x1 = x2;
					} else {
						x0 = x2;
					}

					iteration++;
					prevX2 = x2;
				}
			} else {
				objResult.isSuccess = false;
				objResult.result += ' - Error : ' + f + ' is not function';
				console.log(' - Error : ' + f + ' is not function');
			}

			return objResult;
		}
	};
};

module.exports = linearInterpolation();
