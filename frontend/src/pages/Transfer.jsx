import React, { useState } from "react";
import axios from "axios";
import { useNavigate,useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("token");
  const senderName = localStorage.getItem("firstname");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toId = searchParams.get("id");
  const receiverName = searchParams.get("name");
  
  

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen h-screen bg-[url('../../images/payBg.jpeg')] bg-cover bg-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Send money to {receiverName}</h2>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            className="w-full px-4 py-2 mt-5 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 "
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                { amount, to:toId },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (response.data.msg == "Transfer successful") {
                const date = new Date();
                const formattedDateTime = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                });

                await axios.post(
                  "http://localhost:3000/api/v1/account/history",
                  {
                    receiverId: toId,
                    receiverName,
                    addedToAccount: false,
                    amount,
                    senderName,
                    date:formattedDateTime
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                toast.success("Transfer successful");
                
                navigate(`/transferSuccessful?to=${receiverName}&amount=${amount}&dateAndTime=${formattedDateTime}`);
              } else {
                toast.error(response.data.msg);
              }
            }}
          >
            Send Money
          </button>
        </div>
      </div>
    </div>
  );
}
