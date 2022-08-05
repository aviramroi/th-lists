import { createContext } from "react";


interface IContext {
    favorites:string[],
    handleFavoritePressed:(id: string) => void,
    isFavorite:boolean,
    viewToggle:()=>void
}



const initialState = {
    favorites:[],
    handleFavoritePressed:(id:string) => {},
    isFavorite:false,
    viewToggle:()=>{}
}

export const MainContext = createContext<IContext>(initialState)