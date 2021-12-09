import {ShirtsSetDiscount} from './ShirtsSetDiscount';
import {ShirtsSetFactory} from './ShirtsSetFactory';
import { PriceCalculatorByShirtsSet } from './PriceCalculatorByShirtsSet';
import {Basket} from './Basket';
import {ShirtCatalog} from './ShirtsCatalog'

const differentCopiesDiscountList = [];
differentCopiesDiscountList.push(new ShirtsSetDiscount(2, 5));
differentCopiesDiscountList.push(new ShirtsSetDiscount(3,10));
differentCopiesDiscountList.push(new ShirtsSetDiscount(4,20));
differentCopiesDiscountList.push(new ShirtsSetDiscount(5,25));

const shirtsSetFactory = new ShirtsSetFactory(differentCopiesDiscountList);
const basket = new Basket(new PriceCalculatorByShirtsSet(shirtsSetFactory));
const shirtTypeA = ShirtCatalog.typeAShirt();
basket.add(shirtTypeA);
console.log('basketPrice', basket.getTotalPrice());