export interface User {
    nickname: string;
    email: string;
    photo: string;
    id: string,
    isFreelancer: boolean,
    provider: string,
    role: string,
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
