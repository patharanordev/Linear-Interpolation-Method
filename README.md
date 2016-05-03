# Applied Numerical Analysis
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=A8YE92K9QM7NA) ![Coverage](https://img.shields.io/badge/Coverage-10%-red.svg)

## Require

- [x] [math.js ( [matrix](http://mathjs.org/docs/datatypes/matrices.html), ... )](http://mathjs.org/)

## Chapter
### 1. Solving `Nonlinear` Equations
   - [x] Secant method
   - [x] Regular Falsi (false position) method
   - [x] Newton's method
   - [x] Mueller's method
   - [x] Fixed-Point Iteration method

### 2. Solving `Sets` of Equations
   - [ ] Coming soon...

### 3. Interpolation and Curve Fitting
   - [ ] Coming soon...

### 4. Approximation of Functions 
   - [ ] Coming soon...

### 5. Numerical Differentiation and Integration
   - [ ] Coming soon...

### 6. Numerical Solution of Ordinary Differential Equations
   - [ ] Coming soon...

### 7. Optimization
   - [ ] Coming soon...

### 8. Partial-Differential Equations
   - [ ] Coming soon...

### 9. Finite-Element Analysis
   - [ ] Coming soon...

## Usage

Run javascript file with NodeJS `node app`

```javascript
/* Example cal.js */ 
var ana = require('./ana.js');
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

//var result = ana.secant(f, 1, 0, 0.0000001);
//var result = ana.regulaFalsi(f, 0, 1, null);
//var result = ana.newton(f, -1, null, null);
//var result = ana.mueller(f, 0.8, 0.9, 1);
var result = ana.fixedPointIteration(g, 4, null);
console.log(result);

// Testing Matrics using math.js
console.log(ana.test());
```

## Donation
If this project help you reduce time to develop, you can give me a cup of coffee :) 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=A8YE92K9QM7NA)

## Note

I convert pseudo code from 'Applied Numerical Analysis (7th Edition)' to javascript for my work. I will be happy, if it works for you too.
