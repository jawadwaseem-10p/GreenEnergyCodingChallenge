export class Shirt {
    private price: number
    private type: string;
    constructor(type: string) {
        this.price = 8;
        this.type = type;
    }
    getPrice() {
        return this.price;
    }

    getType() {
        return this.type;
    }
}