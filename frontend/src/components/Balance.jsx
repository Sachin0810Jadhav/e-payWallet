import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Balance({ count }) {
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
 

  const fetchBalance = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };
  useEffect(() => {
    fetchBalance()
  }, [token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full my-3 p-6  space-x-2">
      <div className="w-full my-3 p-6 bg-white border border-gray-300 rounded-lg shadow-md h-[192px]">
        <div className="font-semibold text-xl">Your balance:</div>
        <div className="text-6xl my-3">$ {balance}</div>
      </div>
      <div className="w-full  my-3 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Add money to your Account
        </h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={async () => {

            if(amount<=0){
              return toast.error("enter valid amount")
            }
            
            const response = await axios.put(
              "http://localhost:3000/api/v1/account/balance",
              { amount },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setAmount("")

            fetchBalance();
            if(response.data.msg=="amount added successfully"){
              toast.success(response.data.msg)
            }
            else{
              toast.error(response.data.msg)
            }
            
          }}
          
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}
