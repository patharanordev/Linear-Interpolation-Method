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

console.log(ana.test());