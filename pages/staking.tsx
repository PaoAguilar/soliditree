import React, { useState } from 'react';
import { Navbar } from '../src/components/Navbar/Navbar';

const Staking = () => {
    const [depositSelected, setDepositSelected] = useState<string>("Polygon");
    return (
        <div>
            <Navbar />
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="p-8 rounded shadow-xl sm:p-16">
              <div className="flex flex-col lg:flex-row">
                <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
                    <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                    CHOOSE WHERE TO
                    <br className="hidden md:block" />
                    
                    <span className="inline-block text-social-impact-100">
                        DEPOSIT IN
                    </span>
                    </h2>
                </div>
                <div className="lg:w-1/2">
                    <form>
                        <div className="mb-1 sm:mb-2">
                            <select
                            placeholder="John"
                            onChange={(e) => setDepositSelected(e.target.value)}
                            required
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-social-impact-100 focus:outline-none focus:shadow-outline"
                            id="deposit"
                            name="selet"
                            >
                            <option value="Polygon">POLYGON</option>
                            <option value="Mumbai">MUMBAI</option>
                            </select>
                        </div>
                    </form>
                </div>
                </div>
                {/* Segunda parte */}
                <div style={{marginTop: '12rem'}}>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
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
                        <button
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-100 hover:bg-social-impact-300 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        title="deposit"
                        >
                        DEPOSIT ON {depositSelected.toUpperCase()}
                    </button>
                    </form>
                  </div>
                    <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5 ml-11">
                        <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                        Wallet amount:
                        <br className="hidden md:block" />
                        <span className="inline-block text-social-impact-100">
                            $0.00
                        </span>
                        </h2>
                    </div>
                </div>
                </div>
                {/* fin aqui */}
              </div>
            </div>
            {/* OTRA OPCION */}
            {/* <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div className="p-8 rounded shadow-xl sm:p-16">
                  <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
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
                        <button
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-100 hover:bg-social-impact-300 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        title="deposit"
                        >
                        DEPOSIT ON {depositSelected.toUpperCase()}
                    </button>
                    </form>
                  </div>
                    <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5 ml-11">
                        <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                        Wallet amount:
                        <br className="hidden md:block" />
                        <span className="inline-block text-social-impact-100">
                            $0.00
                        </span>
                        </h2>
                    </div>
                </div>
              </div>
            </div> */}
            {/* fin aqui */}
        </div>
    );
};

export default Staking;