import axios from "axios";
import React, { useEffect, useState } from "react";

export default function History() {
  const token = localStorage.getItem("token");
  const [history, setHistory] = useState([]);
  const getHistory = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/account/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setHistory(response.data.history);
    
  };

  useEffect(() => {
    getHistory();
  }, [token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {history.slice().reverse().map((hist) => {
        return (
          <div
            key={hist._id}
            className="w-full my-3 p-6 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-between text-xl"
          >
            {hist.addedToAccount ? (
              <>
                <div>From: {hist.personName}</div>
                <div>Date and Time : {hist.date}</div>
                <div className="text-green-500">{"+ $"}{hist.amount}</div>
              </>
            ) : (
              <>
                <div>To: {hist.personName}</div>
                <div>Date and Time : {hist.date}</div>
                <div className="text-red-500">{"- $"}{hist.amount}</div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
