var newton = function(){
	return {
		situation: function(){
			return 'coming soon...';
		},
		pseudoCode:function(){
			return 'coming soon...';
		},
		cal:function(f, x, TOL1, TOL2) {
			// Like 'Secant method' but support false position
			var objResult = { isSuccess:false, result:'' };
			if (typeof f === "function") {
				var xnArr = [];
				var xn = x;
				var xn_minus1 = 0;
				var fxn = null;
				var fxn_d = null;
				var iteration = 0;

				var prev_xn = 0;
				var fiveSignificantFigures = 0;

				var _f = function(f, x, n){
					var result = null;
					if(x===undefined) {
						result = null;
					} else {
						if(x.length>n){
							if(x[n]===undefined) {
								result = null;
							} else{
								var x_n = x[n];
								var x_n_minus1 = ((n-1)>-1)?((x[n-1]===undefined)?0:x[n-1]):0;
								var f_x_n = f(parseFloat(x_n));
								var f_x_n_minus1 = f(parseFloat(x_n_minus1));

								result = parseFloat(f_x_n - f_x_n_minus1) / parseFloat(x_n - x_n_minus1);
							}
						}
					}
					return result;
				};

				console.log('|  n  |  xn  |  xn-1  |  f(xn)  | f\'(x) |');
				while(true){

					xnArr.push(xn);
					prev_xn = xn;

					fxn = f(parseFloat(xnArr[iteration]));
					fxn_d = _f(f, xnArr, iteration);
					xn = xn - parseFloat(fxn / fxn_d);
					xn_minus1 = ((iteration-1)>-1)?((xnArr[iteration-1]===undefined)?0:xnArr[iteration-1]):0;

					if(TOL1==null && TOL2==null){
						if(fiveSignificantFigures==5 || (isNaN(xn) && fiveSignificantFigures>0)){
							objResult.isSuccess = true;
							objResult.result = parseFloat(prev_xn).toFixed(5);
							break;
						}
					} else if((TOL1!=null && Math.abs(xn_minus1-xn)<TOL1) || 
						(TOL2!=null && Math.abs(fxn)<TOL2)) {
						objResult.isSuccess = true;
						objResult.result = parseFloat(prev_xn).toFixed(5);
						break;
					}

					if(parseFloat(prev_xn).toFixed(5)==parseFloat(xn).toFixed(5)) {						
						fiveSignificantFigures += 1;
					} else {
						fiveSignificantFigures = 0;
					}
					
					console.log('| ' + 
						iteration + ' | ' + 
						xn.toFixed(5) + ' | ' + 
						xn_minus1.toFixed(5) + ' | ' + 
						fxn.toFixed(5) + ' | ' + 
						fxn_d.toFixed(5) + ' |');

					iteration++;
				}
			} else {
				objResult.isSuccess = false;
				objResult.result += ' - Error in newton method : ' + f + ' is not function';
				console.log(' - Error in newton method : ' + f + ' is not function');
			}

			return objResult;
		}
	};
};

module.exports = newton();
