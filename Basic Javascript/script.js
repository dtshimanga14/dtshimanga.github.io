
/*
             runs test to see if expected argument is === to value returned by function2test argument */
             function myFunctionTest(expected, found) {
                if (expected === found) {
                    return "TEST SUCCEEDED";
                } else {
                    return "TEST FAILED.  Expected " + expected + " found " + found;
                }
            }

            /* N-1 : max returns the maximum of 2 arguments */
            function max(a, b) {
                if (a > b) {
                    return a;
                } else {
                    return b;
                };
            }
            console.log("Expected output of max(20,10) is 20  " + myFunctionTest(20, max(20, 10)));

            /* N-2 : max3 takes 3 numbers as arguments and returns the largest */
            function maxOfThree(a, b, c) {
                return max(max(a, b), c);
            }    
            console.log("Expected output of maxOfThree(5,4,44) is 44  " + myFunctionTest(44, maxOfThree(5, 4, 44)));
            console.log("Expected output of maxOfThree(55,4,44) is 55  " + myFunctionTest(55, maxOfThree(55, 4, 44)));

            console.log("Expected output of maxOfThree(55,4,44) is 55  " + myFunctionTest(4, maxOfThree(55, 4, 44)));
        
            /* N-3 : Define a function sum() and a function multiply() that sums and multiplies (respectively) 
                all the numbers in an array of numbers. For example, sum([1,2,3,4]) should return 10, 
                and multiply([1,2,3,4]) should return 24. */
            function sum(arr) {
                var result = 0; 
                const len = arr.length;
                for (i = 0; i < len; i++) {
                    result += arr[i];
                }
                return result;
            }
            function multiply(arr) {
                var result =1; 
                const len = arr.length;

                for (i = 0; i < len; i++) {
                    result *= arr[i];
                }
                return result;
            }
            console.log(sum([1,2,3,4]));
            console.log("Expected output of sum([1,2,3,4]) is 10  " + myFunctionTest(10, sum([1,2,3,4])));
            console.assert( sum([1,2,3,4]) === 10, 
            "Expected output of sum([1,2,3,4]) is 10  "
            );
            console.log(multiply([1,2,3,4]));
            console.log("Expected output of multiply([1,2,3,4]) is 24  " + myFunctionTest(24, multiply([1,2,3,4])));
            console.assert( multiply([1,2,3,4]) === 24, 
                "Expected output of multiply([1,2,3,4]) is 24  "
            );
            /*
               N-3 : Write a function isVowel() that takes a character (i.e. a string of length 1) 
                and returns true if it is a vowel, false otherwise.
            */
            function isVowel(c) {
               const vowels = ['a','e','i','o','u','y'];
               return vowels.includes(c);
            }
            console.log(isVowel('e'));
            console.log("Expected output of isVowel('e') is true  " + myFunctionTest(true, isVowel('e')));
            console.log("Expected output of isVowel('k') is false  " + myFunctionTest(false, isVowel('k')));
            console.assert( isVowel('k') === false, 
                "Expected output of isVowel('k') is false  "
            );
            /*    
                N-4 : Define a function reverse() that computes the reversal of a string. For example, 
                reverse("jag testar") should return the string "ratset gaj".
           */
            function reverse(str) {
                return str.split('').reverse().join('');
            }
            console.log(reverse('jag testar'));
            console.log("Expected output of reverse('jag testar') is ratset gaj  " + 
                myFunctionTest("ratset gaj", reverse('jag testar'))
            );
            
            console.assert( reverse('jag testar') === "ratset gaj", 
                "Expected output of reverse('jag testar') is ratset gaj  "
            );
                /*
                    N-5 : Write a function findLongestWord() that takes an array of words and returns the length of 
                    the longest one.
                */
            function findLongestWord(arr) {
                let len = 0;
                arr.forEach(e => {
                let wordLeng = e.length;
                if(wordLeng > len) {
                    len = wordLeng;
                  }
                });
                return len;
            }
            console.log(findLongestWord(["daniel","kassampu","tshimanga"]));
            console.log("Expected output of findLongestWord([\"daniel","kassampu","tshimanga\"]) is 9  " + 
                myFunctionTest(9, findLongestWord(["daniel","kassampu","tshimanga"]))
            );
            console.assert( findLongestWord(["daniel","kassampu","tshimanga"]) == 9, 
                "Expected output of findLongestWord([\"daniel","kassampu","tshimanga\"]) is 9"
            );
            /*
                N-6 : Write a function filterLongWords() that takes an array of words and an integer i 
                and returns the array of words that are longer than i.
            */
            function filterLongWords(arr,i) {
                return arr.filter(w => w.length > i);
            }
            function arrayEquals(expected, found) {
                return Array.isArray(expected) && Array.isArray(found)
                    && expected.length == found.length
                    && found.every((value,index) => value === expected[index]);
            }
            console.log(filterLongWords(["daniel","kassampu","tshimanga"],6));
            let arrWithHeld = [2,1];//filterLongWords(["daniel","kassampu","tshimanga"]);
            console.log( arrayEquals([2,1], arrWithHeld));
            /*
                N-6 : 
            */

            const a = [1,3,5,3,3]; 
            const b = a.map(function(elem, i, array) {
                return elem * 10;
            })
            document.writeln(b.toString() + "<br/>");
            const c = a.filter(function(elem, i, array){
                return elem == 3;
            });
            document.writeln(c.toString() + "<br/>");
            const d = a.reduce(function(prevValue, elem, i, array){
                return prevValue * elem;
            });
            document.writeln(d+ "<br/>");

            const d2 = a.find(function(elem) { return elem > 1; }); //3
            const d3 = a.findIndex(function(elem) { return elem > 1; }); //1
            document.writeln(d2+ "<br/>");
            document.writeln(d3);