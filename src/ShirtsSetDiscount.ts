export class ShirtsSetDiscount {
    differentCopies: number;
    discount: number;

    constructor(differentCopies: number, discount: number) {
        this.differentCopies = differentCopies;
        this.discount = discount;
    }

    getDifferentCopies() {
        return this.differentCopies;
    }

    getDiscount() {
        return this.discount;
    }
}