'use strict';

// Base numbers from which others will be derived
const dict = JSON.parse('{"0":"zero","1":"one","2":"two","3":"three","4":"four","5":"five","6":"six","7":"seven","8":"eight","9":"nine","10":"ten","11":"eleven","12":"twelve","13":"thirteen","14":"fourteen","15":"fifteen","16":"sixteen","17":"seventeen","18":"eighteen","19":"nineteen","20":"twenty","30":"thirty","40":"forty","50":"fifty","60":"sixty","70":"seventy","80":"eighty","90":"ninety"}');

// Power words
const powers = JSON.parse('{"3":"thousand","6":"million","9":"billion","12":"trillion","15":"quadrilion"}');

// Convert string to number
const num = n => parseInt(n) || 0;

// Convert negative number to words
const minus = n => 'Minus ' + represent(Math.abs(n));

// Convert digit to words
const digits = n => dict[n];

// Convert 2 digit number to words
const tens = n =>
  `${dict[~~(n/10)+'0']}`+
  (n%10 == 0 ? '' : `-${dict[n%10]}`);

// Convert 3 digit number to words
const hundreds = n =>
  `${dict[~~(n/100)]} hundred `+
  (n%100 == 0 ? '' : `and ${represent(n%100)}`);

// Convert multi digit number to words
const power_word = n => {
  let result = 'Out of range';
  const pow_arr = Object.entries(powers).map(([a,b])=>[+a, b]);
  for(let [exp, word] of pow_arr) {
    if (n < 10**(exp+3)) {
      const pow = 10**exp;
      result = `${represent(~~(n/pow))} ${word}`;
      if (n%pow) {
        result += (n%pow < 100 ? ' and' : ',') +
          ' ' + represent(n%pow);
      }
      break;
    }
  }
  return result;
};

// Capitalize string
const capitalize = s => {
  s = s.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Represent a number as words
const represent = n => {
  n = num(n);
  let word = 'Error';
  if (n < 0) {
    word = minus(n);
  } else if (n <= 20) {
    word = digits(n);
  } else if (n < 100) {
    word = tens(n);
  } else if (n < 1000) {
    word = hundreds(n);
  } else {
    word = power_word(n);
  }
  return word;
};

// Convert a safe integer to words
const num_to_words = n =>
  Math.abs(n) > Number.MAX_SAFE_INTEGER
    ? 'Exceeds or below maximum safe integer'
    : capitalize(represent(n));
