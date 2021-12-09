import { ShirtsSetDiscount } from '../src/ShirtsSetDiscount';
import { ShirtsSetFactory } from '../src/ShirtsSetFactory';
import { PriceCalculatorByShirtsSet } from '../src/PriceCalculatorByShirtsSet';
import { Basket } from '../src/Basket';
import { ShirtCatalog } from '../src/ShirtsCatalog'


describe('Discount calculator', () => {

  let basket: Basket;

  // Act before assertions
  beforeAll(async () => {
    
    const differentCopiesDiscountList = [];
    differentCopiesDiscountList.push(new ShirtsSetDiscount(1, 0))
    differentCopiesDiscountList.push(new ShirtsSetDiscount(2, 5));
    differentCopiesDiscountList.push(new ShirtsSetDiscount(3, 10));
    differentCopiesDiscountList.push(new ShirtsSetDiscount(4, 20));
    differentCopiesDiscountList.push(new ShirtsSetDiscount(5, 25));

    const shirtsSetFactory = new ShirtsSetFactory(differentCopiesDiscountList);
    basket = new Basket(new PriceCalculatorByShirtsSet(shirtsSetFactory));
  });
  afterEach((async () => {
    basket.removeAll();
  }))
  it('should have normal price when bought one type', () => {
    const shirtTypeA = ShirtCatalog.typeAShirt();
    basket.add(shirtTypeA);
    expect(basket.getTotalPrice()).toBe(8.0);
  })

  it('should have normal price when bought two copies of same shirt', () => {
    const shirtTypeA = ShirtCatalog.typeAShirt();
    basket.add(shirtTypeA);
    basket.add(shirtTypeA);
    expect(basket.getTotalPrice()).toBe(16.0);
  })

  it('should apply 10% of discount when bought three different shirt', () => {
    const shirtTypeA = ShirtCatalog.typeAShirt();
    const shirtTypeB = ShirtCatalog.typeBShirt();
    const shirtTypeC = ShirtCatalog.typeCShirt();
    basket.add(shirtTypeA)
    basket.add(shirtTypeB);
    basket.add(shirtTypeC)

    expect(basket.getTotalPrice()).toBe(21.6)
  })

  it('should apply 20% of discount when bought four different shirts', () => {
    const shirtTypeA = ShirtCatalog.typeAShirt();
    const shirtTypeB = ShirtCatalog.typeBShirt();
    const shirtTypeC = ShirtCatalog.typeCShirt();
    const shirtTypeD = ShirtCatalog.typeDShirt();
    const shirtTypeE = ShirtCatalog.typeEShirt();
    basket.add(shirtTypeA)
    basket.add(shirtTypeB);
    basket.add(shirtTypeC);
    basket.add(shirtTypeD);
    basket.add(shirtTypeE);
    basket.add(shirtTypeE)
    expect(basket.getTotalPrice()).toBe(36)
  })
});
