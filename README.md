# Linear-Interpolation-Method

Now support 5 methods below:

1. Secant method
2. Regular Falsi (false position) method
3. Newton's method
4. Mueller's method
5. Fixed-Point Iteration method

## Usage

Run javascript file with NodeJS `node app`

```
/* Example app.js */ 
var li = require('./linearInterpolation.js');

var f = function(x){
	// Secant method
	//return 3*x + Math.sin(x) - Math.exp(x);
	
	// Regula Falsi
	//return Math.pow(x, 3) + (2*Math.pow(x, 2)) - x +5;

	// Newton's method : Exercises -> Section1.3 -> 13
	//return ((4*Math.pow(x, 3)) - 1 - Math.exp(parseFloat(Math.pow(x,2))/2));

	// Mueller's method : 
	return 3*x + Math.sin(x) - Math.exp(x);
};

var g = function(x){
	// Fixed-Point Iteration method
	return Math.sqrt(2*parseFloat(x)+3);
};

//var result = li.secant(f, 1, 0, 0.0000001);
//var result = li.regulaFalsi(f, 0, 1, null);
//var result = li.newton(f, -1, null, null);
//var result = li.mueller(f, 0.8, 0.9, 1);
var result = li.fixedPointIteration(g, 4, null);
console.log(result);
```

## Note

I convert pseudo code from 'Applied Numerical Analysis (7th Edition)' to javascript for my work. I will be happy, if it works for you too.
