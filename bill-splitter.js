// Dynamic Code
let bill = Number(process.argv[4]);
let tipPercentage = Number(process.argv[3]) / 100;
let numGuests = Number(process.argv[2]);

let tipAmount = bill * tipPercentage;
let total = bill + tipAmount;
let amountOwedPerGuest = total / numGuests;

console.log("Each guest owes: $" + amountOwedPerGuest);


// Hard Code
/* let bill = 100;
let tipPercentage = 0.2;
let numGuests = 4;
let tipAmount = bill * tipPercentage;
let total = bill + tipAmount;
let amountOwedPerGuest = total / numGuests;

console.log("Each guest owes: $" + amountOwedPerGuest); */