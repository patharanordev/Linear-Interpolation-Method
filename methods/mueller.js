var mueller = function(){
	return {
		situation: function(){
			return 'Found: more curve, non-linear';
		},
		pseudoCode:function(){
			return 'coming soon...';
		},
		cal:function(f, x2, x0, x1) {
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

module.exports = mueller();
