import { Shirt } from "./Shirt"

export class BasketItem {
    private shirt: Shirt;
    private quantity: number;

    constructor(shirt: Shirt, quantity: number) {
        this.shirt = shirt;
        this.quantity = quantity;
    }

    getShirt() {
        return this.shirt;
    }

    getQuantity() {
        return this.quantity;
    }

    changeQuantity(quantity: number) {
        this.quantity = quantity;
    }
}