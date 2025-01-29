
import { Cart } from "../model/Cart.schema";
import BaseEntity from "./base.entity";

class UserEntity1 extends BaseEntity{
    constructor(){
        super(Cart
        )
    }
    async orderuser(payload:any)
    {
        try {
      
          const result = await new this.modelName(payload).save();
            if(result)
            return "order success";
          } catch (error: any) {
            console.error("Error in orderuser:", error);
            return "Error occurred while placing the order.";
          }
        }
      }
export const UserE2 = new UserEntity1();