export interface IUser{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}
interface ICartItem {
    id: number;
    name: string;
    price: number;
    category: string;
  }
  
  interface IUser2 {
    fullname: string;
    phoneno: string;
  }
  
  export interface ICart extends Document {
    user: IUser2;
    item: ICartItem[];
  }