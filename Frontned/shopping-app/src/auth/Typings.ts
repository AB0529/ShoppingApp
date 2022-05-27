export interface ITag {
    tagID: number,
    tag: string,
    item: IItem,
}

export interface IItem {
    price: number,
    name: string,
    image: string,
    description: string,
    tags: Array<ITag>
}

export interface ICard {
    user: IUser,
    cvc: number,
    cardNumber: string,
    type: string,
    expiration: string
}

export interface IAddress {
    street: string,
    city: string,
    state: string,
    zipcode: number
}

export interface IName {
    firstName: string,
    lastName: string
}

export interface IUser {
    userID: number
    name: IName
    userName: string,
    passWord: string,
    address: IAddress
    cart: Array<IItem>
    card: ICard
}