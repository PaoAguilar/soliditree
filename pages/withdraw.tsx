import React from "react";
import { Navbar } from "../src/components/Navbar/Navbar";

const withdraw = () => {
  return (
    <div>
      <Navbar />
      <div className="px-4 py-11 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="max-w-screen-sm sm:text-center sm:mx-auto">
          <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            WALLET DEPOSITS{" "}
            <span className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-social-impact-100">
              Balance: $0
            </span>
          </h2>
          <div>
            <form>
              <div className="mb-1 sm:mb-2">
                <input
                  placeholder="AMOUNT"
                  required
                  type="text"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-social-impact-300 focus:outline-none focus:shadow-outline"
                  id="amount"
                  name="amount"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <button
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-100 hover:bg-social-impact-200 focus:shadow-outline focus:outline-none"
                    aria-label="Sign up"
                    title="deposit"
                  >
                    WITHDRAW
                  </button>
                </div>
                <div>
                  <button
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-300 hover:bg-social-impact-200 focus:shadow-outline focus:outline-none"
                    aria-label="Sign up"
                    title="deposit"
                  >
                    DEPOSIT
                  </button>
                </div>
              </div>
            </form>
          </div>
          <hr className="w-full my-8 border-gray-300" />
        </div>
        <div className="overflow-x-auto relative">
          <h2 className="mb-4 font-sans font-bold tracking-tight sm:text-2xl text-gray-900 sm:text-center">
            Transactions history
          </h2>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Blockchain Link
                </th>
                <th scope="col" className="py-3 px-6">
                  Transaction date
                </th>
                <th scope="col" className="py-3 px-6">
                  Transaction amount
                </th>
                <th scope="col" className="py-3 px-6">
                  Transaction type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    0xfaafe6b...
                  </a>
                </th>
                <td className="py-4 px-6">July 28 at 16:41</td>
                <td className="py-4 px-6">Amount here....</td>
                <td className="py-4 px-6">Staking</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    0x657c561...
                  </a>
                </th>
                <td className="py-4 px-6">July 28 at 16:41</td>
                <td className="py-4 px-6">Amount here....</td>
                <td className="py-4 px-6">Staking</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    0xd915cba...
                  </a>
                </th>
                <td className="py-4 px-6">July 28 at 16:41</td>
                <td className="py-4 px-6">Amount here....</td>
                <td className="py-4 px-6">Withdraw</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withdraw;
