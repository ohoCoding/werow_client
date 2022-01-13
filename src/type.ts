export interface User {
    username: string;
    name: string;
    email: string;
    phone: string;
}

export interface UserInfo {
    user: null | User;
    isLogin: boolean;
}

export interface ProductItem {
    productId?: number;
    amount?: number;
    cartId?: number;
    imageUrl: string;
    price: string;
    title: string;
}
export interface ProductInfo {
    list: ProductItem[];
    bestList: ProductItem[];
    newList: ProductItem[];
    danoList: ProductItem[];
    thriftyList: ProductItem[];
    freeList: ProductItem[];
    isLoading: boolean;
}
