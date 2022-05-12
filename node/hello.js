
// 1. Modify the provided code to create a program that asks the user for his name, and after printing
// “Welcome ${name}” asks the user for his age. If the age < 16 it should output “You’re not
// allowed to drive in Iowa” otherwise it should output “You’re allowed to get a drivers license in
// Iowa”.

// const readline1 = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
//    });
   
//    readline1.question('What is your name? ', name => {
//     console.log(`Welcome ${name}`);
//         readline1.question('What is your age? ', age => {
//             console.log(`Welcome ${age}`);
//             if(age < 16) {
//                 console.log("You’re not allowed to drive in Iowa");
//             } else {
//                 console.log("You’re allowed to get a drivers license in Iowa");
//             }
//             readline1.close();
//         });
//    });

//    2. Write a Node.js program that uses readline to keep on asking the user for a number until they
// enter “stop”. The program should then output the sum of all the numbers that the user has
// entered. 
   

const readline2 = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
   });
   
   let result = 0;

    readline2.question('Enter a number ? ', num => {
        if(num == "stop") {
            readline2.close();
        } else {
            result += parseInt(num);
            getNumber() ;
        }
    });

    function getNumber() {
        readline2.question('Enter a number ? ', num => {
            if(num == "stop") {
                console.log("the sum is "+ result);
                readline2.close();
            } else {
                result += parseInt(num);
                getNumber() ;
            }
        });
    }

   
