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

					console.log('| ' + 
						iteration + ' | ' + 
						x0.toFixed(10) + ' | ' + 
						x1.toFixed(10) + ' | ' + 
						x2.toFixed(10) + ' | ' + 
						fn_x0.toFixed(10) + ' | ' + 
						fn_x1.toFixed(10) + ' | ' + 
						fn_x2.toFixed(10) + ' |');
					
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
				objResult.result += ' - Error in Secant method : ' + f + ' is not function';
				console.log(' - Error in Secant method : ' + f + ' is not function');
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

					console.log('| ' + 
						iteration + ' | ' + 
						x0.toFixed(10) + ' | ' + 
						x1.toFixed(10) + ' | ' + 
						x2.toFixed(10) + ' | ' + 
						fn_x0.toFixed(10) + ' | ' + 
						fn_x1.toFixed(10) + ' | ' + 
						fn_x2.toFixed(10) + ' |');

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
				objResult.result += ' - Error in Regula Falsi method : ' + f + ' is not function';
				console.log(' - Error in Regula Falsi method : ' + f + ' is not function');
			}

			return objResult;
		},
		newton:function(f, x, TOL1, TOL2) {
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
		},
		mueller:function(f, x2, x0, x1) {
			var objResult = { isSuccess:false, result:'' };

			if (typeof f === "function") {
				var h1, h2;
				var r; // r is gramma symbol
				var f0, f1, f2;
				var a, b, c;
				var _root;
				var iteration = 1;
				var tmp_x2, tmp_x0, tmp_x1;
				var prevRoot;
				var fiveSignificantFigures = 0;

				console.log('|  Iteration  | Root |  x2  |  x0  |  x1  |  h1  |  h2  |  r  |');
				while(true){
					h1 = x1 - x0;
					h2 = x0 - x2;
					r = parseFloat(h2)/parseFloat(h1);
					f0 = f(parseFloat(x0));
					f1 = f(parseFloat(x1));
					f2 = f(parseFloat(x2));
					c = f0;
					a = parseFloat(r*f1 - f0*(1+r) + f2)/parseFloat((r*Math.pow(h1, 2))*(1+r));
					b = (f1 - f0 - a*Math.pow(h1, 2))/h1;

					tmp_x2 = x2;
					tmp_x0 = x0;
					tmp_x1 = x1;

					if(b>0){
						_root = x0 - ((2*c)/(b + Math.sqrt(Math.pow(b, 2) - (4*a*c))));
					} else if(b<0){
						_root = x0 - ((2*c)/(b - Math.sqrt(Math.pow(b, 2) - (4*a*c))));
					}

					if(parseFloat(_root).toFixed(7)==parseFloat(prevRoot).toFixed(7)){
						fiveSignificantFigures += 1;

						if(fiveSignificantFigures==5 || (isNaN(_root) && fiveSignificantFigures>0)){
							objResult.isSuccess = true;
							objResult.result = parseFloat(prevRoot).toFixed(7);
							break;
						}
					} else {
						fiveSignificantFigures = 0;
						prevRoot = _root;
					}

					console.log('| ' + 
						iteration + ' | ' + 
						_root.toFixed(7) + ' | ' + 
						x2.toFixed(7) + ' | ' + 
						x0.toFixed(7) + ' | ' +
						x1.toFixed(7) + ' | ' +
						h1.toFixed(7) + ' | ' +
						h2.toFixed(7) + ' | ' +
						r.toFixed(7) + ' |');

					if(_root>x0){
						x2 = tmp_x1;
						x0 = _root;
						x1 = tmp_x0;
					} else {
						x2 = tmp_x2;
						x0 = _root;
						x1 = tmp_x0;
					}

					iteration++;
				}
			} else {
				objResult.isSuccess = false;
				objResult.result += ' - Error in Secant method : ' + f + ' is not function';
				console.log(' - Error in Secant method : ' + f + ' is not function');
			}

			return objResult;
		}
	};
};

module.exports = linearInterpolation();
