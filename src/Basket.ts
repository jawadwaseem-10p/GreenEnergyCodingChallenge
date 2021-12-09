import { BasketItem } from "./BasketItem";
import { Shirt } from "./Shirt";

export interface PriceCalculator {
    calculate(basetItems: BasketItem[]);
}
export class Basket {
    private basketItems: BasketItem [];
    private priceCalculator: PriceCalculator;

    constructor(priceCalculator: PriceCalculator) {
        this.priceCalculator = priceCalculator;
        console.log('thispriceCalculator', priceCalculator);
        this.basketItems = [];
    }
    add(shirt: Shirt) {
        let existingItem: BasketItem = null;

        this.basketItems.forEach((item) => {
            if(item.getShirt().getType() == shirt.getType()) {
                existingItem = item;
            }
        });

        if(existingItem !=null) {
            existingItem.changeQuantity(existingItem.getQuantity() + 1);

        } else {
            this.basketItems.push(new BasketItem(shirt, 1));
        }
    }

    removeAll() {
        this.basketItems = [];
    }
    getTotalPrice() {
        return this.priceCalculator.calculate(this.basketItems);
    }
    
}