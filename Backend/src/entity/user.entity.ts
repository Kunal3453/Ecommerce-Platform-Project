import { User } from "../model/user.schema";
import BaseEntity from "./base.entity";

class UserEntity extends BaseEntity{
    constructor(){
        super(User
        )
    }
    async createUser(payload:any){
        const result = await new this.modelName(payload).save();

        return result;
    }
}
export const UserE = new UserEntity();