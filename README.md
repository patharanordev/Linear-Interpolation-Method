# Linear-Interpolation-Method

Now support 2 methods below:

1. Secant method
2. Regular Falsi (false position) method
3. Newton's method

## Usage

Run javascript file with NodeJS `node app`

```
/* Example app.js */ 

var li = require('./linearInterpolation.js');

var f = function(x){
	// Example
	//return 3*x + Math.sin(x) - Math.exp(x);
	
	// Exercises : Section 1.3 | 13
	return ((4*Math.pow(x, 3)) - 1 - Math.exp(parseFloat(Math.pow(x,2))/2));
};

//var result = li.secant(f, 1, 0, 0.0000001);
//var result = li.regulaFalsi(f, 0, 1, null);
var result = li.newton(f, 1, null, null);
console.log(result);
```

## Note

I convert pseudo code from 'Applied Numerical Analysis (7th Edition)' to javascript for my work. I will be happy, if it works for you too.
