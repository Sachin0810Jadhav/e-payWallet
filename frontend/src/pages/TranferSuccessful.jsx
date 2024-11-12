import React from 'react'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function TranferSuccessful() {
    const [searchParams] = useSearchParams();
    const to = searchParams.get('to');
    const amount = searchParams.get('amount');
    const dateAndTime = searchParams.get('dateAndTime');
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen h-screen bg-[url('../../images/payBg.jpeg')] bg-cover bg-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div> Tranfer Successful</div>
          <div className='flex space-x-2 justify-center items-center text-green-600 text-4xl my-4' >
            <IoIosCheckmarkCircle/> $
            {amount}
          </div>
          <div>
            To: {to}
          </div>
          <div>
            Date and Time: {dateAndTime}
          </div>
          <Link
            to="/dashboard"
            className="mt-6 inline-block px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}


