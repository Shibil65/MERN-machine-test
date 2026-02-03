function Pyramid(n) {
  if (typeof n !== 'number' || n < 1 || n > 31 || n % 2 === 0) {
    console.error("Error: The number must be an odd integer between 1 and 31.");
    return;
  }

  for (let i = 1; i <= n; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += j + " ";
    }
    console.log(row.trim());
  }
}
 
Pyramid(5);