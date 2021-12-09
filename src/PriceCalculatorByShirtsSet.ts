import { BasketItem } from "./BasketItem";
import { ShirtsSetFactory } from "./ShirtsSetFactory";

export class PriceCalculatorByShirtsSet {
    private shirtsSetFactory: ShirtsSetFactory;

    constructor(shirtsSetFactory: ShirtsSetFactory) {
        this.shirtsSetFactory = shirtsSetFactory; //{discounts: [{differentcopies, discount}]}
        // console.log('shirtsSetFactory', shirtsSetFactory);
    }

    calculate(basketItems: BasketItem[]) {
        // console.log('calculating', basketItems);
        const setsOfDifferentShirts = this.shirtsSetFactory.getDifferentShirtSetWithMaxTotalDiscount(basketItems);
        // console.log('setsOfDifferentShirts', setsOfDifferentShirts);
        let totalPrice = 0.0;
        let setPrice = 0.0;
        if(setsOfDifferentShirts) {
            setsOfDifferentShirts.forEach((shirtsSet) => {
            
                for(const shirt of shirtsSet.getShirts()) {
                    setPrice += shirt.getPrice();
                }
                setPrice = setPrice * (1.0 - shirtsSet.getDiscount()/100.0);
                totalPrice +=setPrice;
                setPrice = 0;
            });
        }
        
        console.log('totalPrice', totalPrice);
        return totalPrice;
    }
}