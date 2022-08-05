
export interface ICategory {
    __typename: string;
    title: string;
}

export interface ILocation {
    __typename: string;
    state: string;
    country: string;
    city: string;
    address1: string;
    address2: string;
    address3: string;
    postal_code?: any;
}

type TPriceLevel = '$' | '$$' | '$$$'

export interface IBusiness {
    __typename: string;
    id: string;
    name: string;
    price: TPriceLevel;
    photos: string[];
    categories: ICategory[];
    location: ILocation;
    rating: number;
}
