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
        
        let totalPrice = 0.0;
        let shirtsSetPrice = 0.0;
        if(setsOfDifferentShirts) {
            setsOfDifferentShirts.forEach((shirtsSet) => {
                
                for(const shirt of shirtsSet.getShirts()) { 
                    shirtsSetPrice += shirt.getPrice();
                    if(setsOfDifferentShirts.length == 1) {
                        const shirtType = shirt.getType();
                        const basketShirt = basketItems.filter((item) => item.getShirt().getType() == shirtType);
                        shirtsSetPrice = shirtsSetPrice * basketShirt[0].getQuantity() 

                    }
                }
                shirtsSetPrice = shirtsSetPrice * (1.0 - shirtsSet.getDiscount()/100.0);
                totalPrice +=shirtsSetPrice;
                shirtsSetPrice = 0;
            });
        }
        
        return totalPrice;
    }
}