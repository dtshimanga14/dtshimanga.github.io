class Bank {
    constructor() {
        this.Accounts = [];
        this.nextNumber = 0;
    }
    addAccount(number){ 
        this.Accounts.push(new Account(number));
        this.nextNumber++;
        return this.Accounts.length;

    } 
    addSavingsAccount(number,interest){ 
        this.Accounts.push(new SavingsAccount(number,interest));
        this.nextNumber++;
        return this.Accounts.length;
    } 
    addCheckingAccount(number,overdraft) {
        this.Accounts.push(new CheckingAccount(number,overdraft));
        this.nextNumber++;
        return this.Accounts.length;
    } 
    closeAccount(number) {
        this.Accounts = this.Accounts.filter(acc => acc.getNumber() !== number);
        this.nextNumber--;
    }
    accountReport() {
        this.Accounts.forEach(
            acc => console.log(acc.toString())
        );
    }
    endOfMonth() {
        this.Accounts.forEach(acc => console.log(acc.endOfMonth()));
    }
}