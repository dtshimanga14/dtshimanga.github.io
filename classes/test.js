
function tester() {
    var account = new Account(614243);
    account.deposit(50);
    var savingsAccount = new SavingsAccount(614243,10);
        savingsAccount.deposit(100);
        savingsAccount.addInterest();
    var checkingAccount = new CheckingAccount(614243,20);
        checkingAccount.deposit(100);
    
        var bank = new Bank();
            bank.addAccount(614243);
            bank.addAccount(614144);
            bank.endOfMonth();

    describe("account class methods test",() =>{
        it("test getBalance methods should return the current balance",
          () => {
            assert.equal(account.getBalance(),50);
        });
        it("test getNumber methods should return the current account number",
          () => {
            assert.equal(account.getNumber(),614243);
        });
        it("test withdraw methods should return the current amount of money after withdrawing",
          () => {
            account.withdraw(10);
            assert.equal(account.getBalance(),40);
        });
        it("test toString methods should return the account description as follow",
          () => {
            assert.equal(account.toString(),"Account " + account._number + ": balance " + account._balance);
        });
        it("does nothing",
          () => {
            assert.equal(account.endOfMonth(),"");
        });
        it("method which deposits the interest amount into the account",
          () => {
            assert.equal(savingsAccount.getBalance(),110);
        });
        it("test toString methods should return the saving account description as follow",
          () => {
            assert.equal(savingsAccount.toString(),"Account " + savingsAccount._number + ": balance " 
            + savingsAccount._balance + ": interest" + savingsAccount._interest);
        });
        it("test getOverdraft methods should return the getOverdraft limit",
          () => {
            assert.equal(checkingAccount.getOverdraft(),20);
        });
        it("test withdraw methods that should allow withdraw of balance +  overdraft limit",
          () => {
            checkingAccount.withdraw(checkingAccount.getBalance()+checkingAccount.getOverdraft());
            assert.equal(checkingAccount.getBalance(),-20);
        });
        it("test toString methods should return the checking account description as follow",
          () => {
            assert.equal(checkingAccount.toString(),"Account " + checkingAccount._number + ": balance " 
            + checkingAccount._balance + ": overdraft" + checkingAccount._overdraft);
        });
        it("test addAccount methods should return the count of bank accounts",
          () => {

            assert.equal(bank.addAccount(614244),3);
        });
        it("test addSavingsAccount method should return the total count of bank accounts",
          () => {
            assert.equal(bank.addSavingsAccount(611214,13),4);
        });
        it("test addCheckingAccount method should return the total count of bank accounts",
          () => {
            assert.equal(bank.addCheckingAccount(621214,24),5);
        }); 
        it("test addCheckingAccount method should return the total count of bank accounts",
          () => {
            bank.closeAccount(621214)
            assert.equal(bank.Accounts.length,4);
        });
    });
    mocha.run();
}

window.onload = function() {
    tester();
}