import React, { useState } from "react";
import {
  useChain,
  useMoralis,
  useNativeBalance,
  useERC20Balances,
} from "react-moralis";
import Footer from "../src/components/Footer/Footer";
import { Navbar } from "../src/components/Navbar/Navbar";
import { useAllowance, useAprove, useDeposit } from "../src/web3/hooks";

const chains = {
  "0x89": "Polygon",
  "0x13881": "Mumbai",
};

const Staking = () => {
  const [depositSelected, setDepositSelected] = useState<{
    name: string;
    chainId: string;
  }>({ name: "Mumbai", chainId: "0x13881" });
  const [amount, setAmount] = useState<string>("0");

  const { account } = useMoralis();
  const { getBalances, data: balance } = useNativeBalance();
  const { chainId, switchNetwork } = useChain();
  // console.log(res)
  const isCorrectNetwork = chainId === "0x89" || chainId === "0x13881";
  console.log("account", account);

  const { data, fetch } = useAllowance(account);
  const { data: aproveData, loading, fetch: approve } = useAprove(+amount);
  const { fetch: deposit } = useDeposit(+amount);

  console.log(data);
  console.log("balance", balance);

  return (
    <div>
      <Navbar />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="p-8 rounded shadow-xl sm:p-16">
          <div className="flex flex-col lg:flex-row">
            <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
              <button onClick={() => fetch()}>getAllowance</button>
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
                    onChange={(e) =>
                      setDepositSelected({
                        chainId: e.target.value,
                        name: chains[e.target.value as keyof typeof chains],
                      })
                    }
                    required
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-social-impact-100 focus:outline-none focus:shadow-outline"
                    id="deposit"
                    name="selet"
                  >
                    <option value="0x89">POLYGON</option>
                    <option value="0x13881">MUMBAI</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          {/* Segunda parte */}
          <div style={{ marginTop: "12rem" }}>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <form id="deposit">
                  <div className="mb-1 sm:mb-2">
                    <input
                      placeholder="20.00"
                      required
                      type="number"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-social-impact-300 focus:outline-none focus:shadow-outline disabled:bg-gray-200 disabled:cursor-not-allowed"
                      id="amount"
                      name="amount"
                      disabled={!isCorrectNetwork}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {!isCorrectNetwork && (
                      <div className="flex items-center justify-between mt-2 text-sm font-semibold text-red-600">
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1a7 7 0 100-14 7 7 0 000 14zm-1-7a1 1 0 112 0v4a1 1 0 11-2 0v-4zm1-5a1 1 0 100 2 1 1 0 000-2z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Please connect to {depositSelected.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {isCorrectNetwork && parseInt(data?._hex, 16) > 0 ? (
                    <button
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-100 hover:bg-social-impact-300 focus:shadow-outline focus:outline-none"
                      aria-label="Sign up"
                      title="deposit"
                      form="deposit"
                      onClick={() => {
                        try {
                          deposit();
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      DEPOSIT ON {depositSelected.name.toUpperCase()}
                    </button>
                  ) : (
                    <button
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-100 hover:bg-social-impact-300 focus:shadow-outline focus:outline-none"
                      aria-label="Sign up"
                      title="deposit"
                      form="deposit"
                      onClick={() => {
                        try {
                          approve().then((data) => {
                            console.log(data);
                          });
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Approve {amount} USDC
                    </button>
                  )}
                </form>
                {!isCorrectNetwork && (
                  <button
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-100 hover:bg-social-impact-300 focus:shadow-outline focus:outline-none"
                    onClick={() => switchNetwork(depositSelected.chainId)}
                  >
                    Change/add {depositSelected.name.toUpperCase()} network
                  </button>
                )}
              </div>
              <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5 ml-11">
                <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                  Wallet amount:
                  <br className="hidden md:block" />
                  <span className="inline-block text-social-impact-100">
                    {balance.formatted}
                  </span>
                </h2>
              </div>
            </div>
          </div>
          {/* fin aqui */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Staking;
