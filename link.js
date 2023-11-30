let MixString = ["ec12fa0", "17790", "6e4fd6", "72cd83", "defab"];
let secretOne  = "76";
let secretTwo = "2a490";
let secret = secretTwo.split("").reverse().join("");

stepOne = MixString.join("").split("").reverse().join("");
stepTwo = stepOne.split(secretOne);                 
stepThree = stepTwo[0] + stepTwo[1];

key = stepThree + secret;






