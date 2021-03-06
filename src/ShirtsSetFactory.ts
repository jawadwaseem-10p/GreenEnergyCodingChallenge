import { ShirtsSetDiscount } from "./ShirtsSetDiscount";
import { BasketItem } from "./BasketItem";
import { ShirtsSet } from "./ShirtsSet";
import { Shirt } from "./Shirt";
export class ShirtsSetFactory {
    private discounts: ShirtsSetDiscount[];

    constructor(discounts: ShirtsSetDiscount[]) {
        this.discounts = discounts; // [{differentCopies: number, discount:number}]
    }

    getDifferentShirtSetWithMaxTotalDiscount(basketItems: BasketItem[]): ShirtsSet[] {

        const differentShirtsSetsCombinations: any[] = [];

        for (let i = basketItems.length; i >= 1; i--) {
            differentShirtsSetsCombinations.push(this.calculateDifferentShirtsSetsBySize(basketItems, i));
        }
        if (differentShirtsSetsCombinations.length > 1) {
            // console.log('selecting');
            return this.selectShirtsSetsWithMaxDiscount(differentShirtsSetsCombinations)
        } else {
            return differentShirtsSetsCombinations[0];
        }
    }


    calculateDifferentShirtsSetsBySize(basketItems: BasketItem[], maxSizeSet: number) {
        const remainingBasketItems = this.copyBasketItems(basketItems);

        const setsOfDifferentShirts: any[] = [];

        while (remainingBasketItems.length > 0) {
            const oneSetOfDifferentShirts = this.createNextSet(remainingBasketItems, maxSizeSet);
            setsOfDifferentShirts.push(oneSetOfDifferentShirts);
        }
        return setsOfDifferentShirts;
        
    }

    copyBasketItems(basketItems: BasketItem[]): BasketItem[] {
        const basketItemsCopy = [];

        for (const item of basketItems) {
            basketItemsCopy.push(new BasketItem(item.getShirt(), item.getQuantity()));
        }
        return basketItemsCopy;
    }
    createNextSet(remainingBasketItems: BasketItem[], maxSizeSet: number): ShirtsSet {
         
        const shirts: Set<Shirt> = new Set();
        let itemIndex = remainingBasketItems.length-1;
        while(remainingBasketItems.length!= 0) {
            shirts.add(remainingBasketItems[itemIndex]?.getShirt());
            if(shirts.size == maxSizeSet) {
                remainingBasketItems.splice(itemIndex, 1);
                break;
            }

            if(remainingBasketItems[itemIndex].getQuantity() ==1) {

                remainingBasketItems.splice(itemIndex, 1);
                itemIndex--;
            } else {
                remainingBasketItems[itemIndex].changeQuantity(remainingBasketItems[itemIndex].getQuantity() -1);
                
            }
        }
        const shirtsSet: ShirtsSet = new ShirtsSet(new Set(shirts), this.getDiscount(shirts.size))
        return shirtsSet;
    
    }

    getDiscount(differentShirtsCount: number) {
        const defaultDiscount = 0;

        for (const discount of this.discounts) {
            if (differentShirtsCount == discount.getDifferentCopies()) {
                return discount.getDiscount();
            }
        }
        return defaultDiscount;
    }
    selectShirtsSetsWithMaxDiscount(shirtsSetCombination: ShirtsSet[][]) {
        console.log('shirtsStCombination', JSON.stringify(shirtsSetCombination))
        let maxDiscountShirtsSets = null;

        let maxShirtsSetDiscount = 0;
        let totalShirtsSetDiscount = 0;

        for (const shirtsSet of shirtsSetCombination) {

            for(const set of shirtsSet) {
                
                totalShirtsSetDiscount += set.getDiscount();
            }
            
    
            if (maxShirtsSetDiscount < totalShirtsSetDiscount) {
                maxDiscountShirtsSets = shirtsSet;
                maxShirtsSetDiscount = totalShirtsSetDiscount
            }
            totalShirtsSetDiscount = 0;
        }
        return maxDiscountShirtsSets;
        
    }
}