const isPalindromeNumber = require('./Palindrom');

test('121 is a palindrome', () => {
  expect(isPalindromeNumber(121)).toBe(true);
});

test('-121 is not a palindrome', () => {
  expect(isPalindromeNumber(-121)).toBe(false);
});

test('10 is not a palindrome', () => {
  expect(isPalindromeNumber(10)).toBe(false);
});
 
test('0 is a palindrome', () => {
  expect(isPalindromeNumber(0)).toBe(true);
});

test('12321 is a palindrome', () => {
  expect(isPalindromeNumber(12321)).toBe(true);
});

test('12345 is not a palindrome', () => {
  expect(isPalindromeNumber(12345)).toBe(false);
});