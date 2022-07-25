import React from "react";
import { Navbar } from "../src/components/Navbar/Navbar";

const withdraw = () => {
  return (
    <div>
      <Navbar />
      <div className="px-4 py-11 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="max-w-screen-sm sm:text-center sm:mx-auto">
          <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            WALLET DEPOSITS
          </h2>
          {/* <h2 className="sm:px-4 text-3xl text-social-impact-100">
                $0.00
                </h2> */}
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
      </div>
    </div>
  );
};

export default withdraw;
