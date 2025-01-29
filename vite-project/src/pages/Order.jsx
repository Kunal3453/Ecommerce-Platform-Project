import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"
import Success from "./Success";
function Order() {
  const cartItems = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
     
    const [fullname,setfullname]=useState('')
    const [phoneno,setphoneno]=useState('')
    const [token, setToken] = useState(localStorage.getItem("token"));
const[password,setpassword]=useState('');
const[email,setemail]=useState('');
const isValidUsername = (username) => {
  // Regular expression for alphanumeric username with underscores (minimum 3 characters)
  const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,}$/;
  return usernameRegex.test(username);
};
const isValidPhoneNumber = (phoneNumber) => {
  // Regular expression for a basic phone number format (10 digits)
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isValidPassword = (value) => {
  // Password validation: At least one lowercase letter, one uppercase letter, one digit, and minimum length of 8 characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(value);
};
    async function submit(e){
        e.preventDefault();
        if (!isValidUsername(fullname)) {
          alert('Username must be at least 3 characters long and can only contain letters, numbers, and underscores.');
          return;
        }
       
        // if (!isValidPassword(password)) {
        //   alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
        //   return;
        // }
        // if(!isValidPhoneNumber(phoneno))
        //   {
        //     alert("Enter a valid Phone Number");
        //     return;
        //   }
        const isValidToken = async () => {
          if (!token) {
            alert("Token not found. Please log in.");
            return false;
          }
          // Add logic to check token validity on the server-side if needed
          return true;
        };
        if (await isValidToken()) {
        try{
          const itemsArray = cartItems.map((cartItem) => ({
            id: cartItem.id,
            name: cartItem.name,
            price: cartItem.price,
            category: cartItem.category,
          }));
            const cartData = {
                user: {
                  fullname: fullname,
                  phoneno: phoneno,
                },
               
                item:itemsArray
                  // Add more items as needed
              };
            const orderResponse=await axios.post("http://localhost:3000/user/order",{
                cartData
            });
            if (orderResponse.data =="order success") {
              navigate("/Success");
            } else if (orderResponse.data == "not success") {
              alert("Order is Not placed due to technical issue");
            }
          } 
          catch (error) {
            alert("Error placing order. Please try again.");
            console.error(error);
          }
        } else {
          // Token is not valid, prompt user to log in again
          navigate("/login");
        }
      }


    return (
        <section>
  <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
    <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
    <button className="bg-black mx-1 px-2 my-3 text-white"><Link to="/Signup"> Click Me for Signup</Link></button>
      <h2 class="text-center text-2xl font-bold leading-tight text-black">
        Place Your Order
      </h2>
     
      <form action="POST" class="mt-8">
        <div class="space-y-5">
          <div>
            <label for="" class="text-base font-medium text-gray-900">
              {" "}
              FullName{" "}
            </label>
            <div class="mt-2">
              <input
                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                onChange={(e) => { setfullname(e.target.value) }}
                placeholder="fullname"
              />
            </div>
          </div>
         
    
          <div>
            <div class="flex items-center justify-between">
              <label for="" class="text-base font-medium text-gray-900">
                {" "}
                PhoneNo{" "}
              </label>
            
            </div>
            <div class="mt-2">
              <input
                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                onChange={(e) => { setphoneno(e.target.value) }}
                placeholder="phoneno"
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={submit}
              class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Click Order{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </form>
      <div class="mt-3 space-y-3">
      </div>
    </div>
  </div>
</section>

        // <div className="login">

        //     <h1>Login</h1>

        //     <form action="POST">
        //         <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
        //         <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
        //         <input type="submit" onClick={submit} />

        //     </form>

        //     <br />
        //     <p>OR</p>
        //     <br />

        //     <Link to="/signup">Signup Page</Link>

        // </div>
    )
}

export default Order;