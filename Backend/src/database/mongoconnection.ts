import mongoose from "mongoose";

class DaoConnection{
    async connectionwithMongodb(){
        try{
            await mongoose.connect("mongodb://localhost:27017/Upgrade")
            console.log("mongo connnection successfully created");
        }
        catch(error){
            console.error("errorr in mongoconnection",error)
        }
    }
}
export const mongoConnection = new DaoConnection();