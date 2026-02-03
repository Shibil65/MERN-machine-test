function Palindrome(x) {
  if (x < 0) return false;

  let orig = x;
  let rev = 0;

  while (x > 0) {
    rev = rev * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  return orig === rev;
}
 
module.exports = Palindrome;


console.log(Palindrome(141));
console.log(Palindrome(-141));
console.log(Palindrome(1421));