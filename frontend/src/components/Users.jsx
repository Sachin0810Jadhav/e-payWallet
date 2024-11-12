import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);
  return (
    <div className="p-5 ">
      <div className="text-xl font-semibold">Users</div>
      <div className="">
        <form className="flex items-center border border-gray-300 rounded-full overflow-hidden mt-2">
          <input
            onInput={(e) => {
              e.preventDefault();
              setFilter(e.target.value);
            }}
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
            onClick={(e) => {
              setFilter("");
            }}
          >
            Clear
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map((user) => {
            return (
              <div
                className="w-full my-3 p-6 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-between"
                key={user.userId}
              >
                <div >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.firstname} {user.lastname}
                  </h2>
                  <p className="text-slate-700">{user.username}</p>
                </div>
                <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
                  onClick={()=>{
                    
                    navigate(`/transfer?id=${user.userId}&name=${user.firstname}`);
                  }}
                >
                  Send Money
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
