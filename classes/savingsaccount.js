class SavingsAccount extends Account {
    constructor(number, _interest) {
        super(number);
        this._interest = _interest;
    }
    getInterest() {
        return this._interest;
    }
    setInterest(_interest) {
        this._interest = _interest;
    }
    addInterest() {
        this.deposit(this.getBalance() * this._interest / 100);
    }
    toString() {
        return "Account " + this._number + ": balance " 
            + this._balance + ": interest" + this._interest;
    }
    endOfMonth() {
        let _interest = this.getBalance() * this._interest / 100;
        this.addInterest();
        return _interest;
    }
}