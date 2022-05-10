

window.onload = function() {
    tester();
};

function tester() {
    
let teacher = new Teacher();
teacher.initialize("daniel",31);

    describe("test teacher teach function",() => {
        it("should return teacher's name is now teaching subject",() => {
            assert.equal(teacher.teach("WAP"),"daniel is now teaching WAP");
        });
    });
    mocha.run();
}