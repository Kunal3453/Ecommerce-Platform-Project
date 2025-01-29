import { ApplicationError } from "../common/ApplicationError";
import { UserE } from "../entity/user.entity";
import {UserE2} from "../entity/user2.entity"
import { IUser } from "../interface/user.interface";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import { SessionStatus, session } from "../model/admin.session.model";

const SECRET_KEY = process.env.SECRET_KEY ||"Kunal";

class UserService {
  async Signup(payload: IUser) {
    
   const hashpassword = await bcrypt.hash(payload.password,10)
   const data={
    email:payload.email,
    password:hashpassword,
    firstName:payload.firstName,
    lastName:payload.lastName
   }
    const result = await UserE.createUser(data);
    return result;
  }

  async loginService(payload: any) {
    console.log(payload);
    const userData = await UserE.findOne({ email: payload.email });
    // Handle case where userData is null
    if (!userData) {
      return "not a valid user" ;
    }

    const isPassword = await bcrypt.compare(payload.password, userData.password);
    if (!isPassword) {
      return "password is incorrect" ;
    }

    const accessToken = jwt.sign(
      { aid: payload.admin_id, session: payload.session_id },
      SECRET_KEY,
      { expiresIn: "2d" }
    );
    // Your session logic here
    return accessToken;
  }
async orderuser(payload:any)
{
  console.log(payload.cartData);
  // if (!payload.user || !payload.user.fullname || !payload.user.phoneno || !payload.item) {
  //   return "error";
  // }
  const cartData = {
    user: {
      fullname:payload.cartData.user.fullname,
      phoneno: payload.cartData.user.phoneno,
    },
    item:
      payload.cartData.item,
  }
  try{
  const result = await UserE2.orderuser(cartData);
  return result; // or any specific success message
} catch(error:any) {
  console.error("Error in orderuser:", error);
}
}

  async forgotPssswordService(email: string) {
    const user = await UserE.findOne({ email: email });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(otp);

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "kunalagrawaljvm@gmail.com",
          pass: "kunal1122@",
        },
      });
      const mailOptions = {
        from: "kunalagrawal7055@gmail.com",
        to: user.email,
        subject: "Verification Code",
        text: `Your OTP is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.error("Error occurred while sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
  }
}
export const User = new UserService();
