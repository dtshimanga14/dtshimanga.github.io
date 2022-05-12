
module.exports = {
    break : function() {
        console.log("the car stops");
    }
    ,drive : function() {
        console.log("The car moves forward");
     }
    ,turn : function(degrees) {
        console.log(`The car turns ${degrees}`);
    }
};