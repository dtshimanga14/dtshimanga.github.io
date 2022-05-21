let product = class Product {
    constructor(name, description, price, pic){
        this.name = name;
        this.description = description;
        this.price = price;
        this.pic = pic;
    }
    getName() {
        return this.name;
    }
    setName() {
        this.name = name;
    }
    setPic(pic) {
        this.pic = pic;
    }
    getPic(){
        return this.pic;
    }
    getDescription(){
        return this.description;
    }
    setDescription(){
        this.description = description;
    }
    setPrice(){
        this.price = price;
    }
    getPrice(){
        return this.price;
    }
}

module.exports = product;