export interface ITag {
    tagID: number,
    tag: string,
    item: IItem,
}

export interface IOrder {
    orderID: number,
    status: number,
    cart: Array<IItem>,
    userID: number,
}

export interface IItem {
    price: number,
    name: string,
    image: string,
    description: string,
    tags: Array<ITag>,
    itemID: number
    deal?: boolean
    newPrice?: number
}

export interface ICard {
    user: IUser,
    cvc: number,
    cardNumber: string,
    type: string,
    expiration: string
}

export interface IUser {
    userID: number,
    name: string,
    email: string,
    userName: string,
    passWord: string,
    address: string,
    cart: Array<IItem>,
    card: ICard,
}