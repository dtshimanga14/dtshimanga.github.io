class CheckingAccount extends Account {
    constructor(number, _overdraft) {
        super(number);
        this._overdraft = _overdraft;
    }
    getOverdraft() {
        return this._overdraft;
    }
    setOverdraft(_overdraft) {
        this._overdraft = _overdraft;
    }
    toString() {
        return "Account " + this._number + ": balance " 
            + this._balance + ": overdraft" + this._overdraft;
    }
    withdraw(amount) {
        if (amount <= 0) {
            throw new RangeError("Withdraw amount has to be greater than zero");
        }
        if (amount > (this._balance + this._overdraft)) {
            throw Error("Insufficient funds");
        }
        this._balance -= amount;
    }
    
    endOfMonth() {
        return this.getBalance() == 0 ? 
            "Warning, low balance CheckingAccount 3: balance: 0" 
            + "overdraft limit: " + this._overdraft 
            : null;
    }
}