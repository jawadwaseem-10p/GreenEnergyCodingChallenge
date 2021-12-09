import { Shirt } from "./Shirt";

export class ShirtsSet {
    private shirts: Set<Shirt>;
    private discount: number;

    constructor(shirts: Set<Shirt>, discount: number) {
        this.shirts = shirts;
        this.discount = discount;
    }

    getShirts(): Set<Shirt> {
        return this.shirts;
    }

    getDiscount(): number {
        return this.discount;
    }
}