import { Shirt } from "./Shirt"
export class ShirtCatalog {
    static typeAShirt (): Shirt {
        return new Shirt("typeA");
    }

    static typeBShirt(): Shirt {
        return new Shirt("typeB");
    }

    static typeCShirt(): Shirt {
        return new Shirt("typeC");
    }

    static typeDShirt(): Shirt{
        return new Shirt("typeD");
    }

    static typeEShirt(): Shirt{
        return new Shirt("typeE");
    }
}