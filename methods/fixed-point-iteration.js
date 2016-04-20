var fixedPointIteration = function(){
	return {
		situation: function(){
			return 'coming soon...';
		},
		pseudoCode:function(){
			return 'convert f(x) -> g(x) by determine x ...';
		},
		cal:function(g, x1, TOL) {
			var objResult = { isSuccess:false, result:'' };

			if (typeof g === "function") {
				var x2;
				var gx1;
				var iteration = 1;
				var prevGx;
				var fiveSignificantFigures = 0;

				console.log('|  Iteration  | x1 |  g(x1)  |');
				while(true){

					x2 = x1;
					gx1 = g(parseFloat(x1));
					
					console.log('| ' + 
						iteration + ' | ' + 
						x1.toFixed(5) + ' | ' + 
						gx1.toFixed(5) + ' |');


					if(TOL!=null){
						if(Math.abs(x1-x2)<TOL) break;
					} else {
						if(parseFloat(gx1).toFixed(5)==parseFloat(prevGx).toFixed(5)){
							fiveSignificantFigures += 1;

							if(fiveSignificantFigures==5 || (isNaN(gx1) && fiveSignificantFigures>0)){
								objResult.isSuccess = true;
								objResult.result = parseFloat(prevGx).toFixed(5);
								break;
							}
						} else {
							fiveSignificantFigures = 0;
							prevGx = gx1;
						}
					}
					
					x1 = gx1;
					iteration++;
				}
			} else {
				objResult.isSuccess = false;
				objResult.result += ' - Error in Secant method : ' + g + ' is not function';
				console.log(' - Error in Secant method : ' + g + ' is not function');
			}

			return objResult;
		},
		checkResult:function(g_diff, x){
			var result = { isSuccess:false, result:'true' };
			if (typeof g_diff === "function") {
				if(g_diff(x)<1) {
					objResult.isSuccess = true;
				}
			} else {
				objResult.isSuccess = false;
				objResult.result += ' - Error in Secant method : ' + g_diff + ' is not function';
				console.log(' - Error in Secant method : ' + g_diff + ' is not function');
			}
			return result;
		}
	};
};

module.exports = fixedPointIteration();
