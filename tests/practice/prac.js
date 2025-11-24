let a = Math.random() * 100
a = Math.round(a)
let b = prompt("guess the number")
let chances = 1
while (a != b) {
  console.log("the number is ", a < b ? "less than " + b : "greater than " + b)
  b = prompt("guess the number again")
  chances += 1
}
console.log("you guessed it right")
console.log("you took "+chances+" chances to guess the right number")
