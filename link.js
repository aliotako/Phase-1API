let MixString = ["ec12fa0", "17790", "6e4fd6", "72cd83", "defab"];
let numOne  = "76";
let numTwo = "2a490";
let num = numTwo.split("").reverse().join("");

stepOne = MixString.join("").split("").reverse().join("");
stepTwo = stepOne.split(numOne);                 
stepThree = stepTwo[0] + stepTwo[1];

key = stepThree + num;






