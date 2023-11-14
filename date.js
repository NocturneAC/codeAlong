let date = new Date();
let fullDate = date.toDateString();
let day = fullDate.slice(0, 3);

console.log("Today's date is " + fullDate + ".\n");

if (day === "Mon") {
    console.log("Happy Monday! Hope you have a great week.");
} else if ( day === "Tue") {
    console.log("Happy Tuesday! Say hello to Aries for me,")
} else if ( day === "Wed") {
    console.log("Camels");
} else if ( day === "Thr") {
    console.log("Have an abundant Thursday!");
} else if ( day === "Fri") {
    console.log("You made it to the weekend! Woohoo! Now, go take a nap.");
} else if ( day === "Sat") {
    console.log("It's the weekend!");
} else if ( day === "Sun") {
    console.log("Get ready for a new week ahead!");
} else {
    console.log("Something went wrong. Try again!");
}