/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useMemo, useState } from "react";
import { Navbar } from "../src/components/Navbar/Navbar";
import {
  useChain,
  useMoralis,
  useERC20Balances,
  useERC20Transfers,
} from "react-moralis";
import {
  useAllowance,
  useAprove,
  useDecimal,
  useDeposit,
  useWithdraw,
} from "../src/web3/hooks";
import moment from "moment";
import { approveAddress, contractAddress } from "../src/web3/addresses";
import { ethers } from "ethers";

const Withdraw = () => {
  const { chainId, switchNetwork } = useChain();
  const { account } = useMoralis();
  const [amount, setAmount] = useState<string>("0");
  const [balance, setBalance] = useState<any>();
  const [transfers, setTransfers] = useState<any>();

  const { data: decimals } = useDecimal();
  const { fetch: deposit, isLoading: isLoadingDeposit } = useDeposit(
    +amount * Math.pow(10, decimals as number)
  );
  const { fetch: withdraw } = useWithdraw(
    +amount * Math.pow(10, decimals as number)
  );

  const bigAmmount = useMemo(() => {
    if (amount && decimals) {
      return ethers.utils.parseUnits(amount, decimals as number);
    }
  }, [amount, decimals]);

  const {
    data: aproveData,
    fetch: approve,
    isLoading: isLoadingApprove,
  } = useAprove(bigAmmount);

  const { data, fetch } = useAllowance(account);
  const { data: erc20Data } = useERC20Balances({}, { autoFetch: true });
  const { data: erc20TransfersData, isLoading: erc20TransfersIsLoading } =
    useERC20Transfers();
  const isCorrectNetwork = chainId === "0x89" || chainId === "0x13881";

  useEffect(() => {
    if (erc20TransfersData) {
      const transfers = erc20TransfersData.result?.filter(
        (data) => data.address === contractAddress.toLowerCase()
      );
      setTransfers(transfers);
    }
  }, [erc20Data, erc20TransfersData]);

  return (
    <div>
      <Navbar />
      <div className="px-4 py-11 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="max-w-screen-sm sm:text-center sm:mx-auto">
          {/* <button onClick={() => fetch()}>getAllowance</button> */}
          {/* <button
            onClick={() =>
              fetchERC20Balances({ params: { address: contractAddress } })
            }
          >
            Refetch
          </button> */}
          {/* <pre>{JSON.stringify(erc20Data, null, 2)}</pre> */}
          <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            WALLET DEPOSITS{" "}
            <span className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-social-impact-100">
              Balance:{" "}
              {(balance && (balance[0]?.balance / 10 ** 18).toFixed(2)) || 0}
            </span>
          </h2>
          <div>
            <form id="transactions">
              <div className="mb-1 sm:mb-2">
                <input
                  placeholder="20.00"
                  required
                  type="number"
                  className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-social-impact-300 focus:outline-none focus:shadow-outline"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <button
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-100 hover:bg-social-impact-200 focus:shadow-outline focus:outline-none"
                    title="withdraw"
                    form="transactions"
                    onClick={(e) => {
                      e.preventDefault();
                      try {
                        withdraw();
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    WITHDRAW {amount} USDC
                  </button>
                </div>
                <div>
                  {isCorrectNetwork && parseInt((data as any)?._hex, 16) > 0 ? (
                    <button
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-300 hover:bg-social-impact-200 focus:shadow-outline focus:outline-none"
                      title="deposit"
                      form="transactions"
                      onClick={(e) => {
                        e.preventDefault();
                        try {
                          deposit();
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      {isLoadingDeposit ? "Loading" : `DEPOSIT ${amount} USDC`}
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
                      {isLoadingApprove ? "Loading" : `Approve ${amount} USDC`}
                    </button>
                  )}
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
              {transfers &&
                transfers.map((transfer: any) => {
                  const isWithdraw =
                    transfer.to_address ===
                    "0x0000000000000000000000000000000000000000";
                  const isTransfer =
                    transfer.to_address !==
                      "0x0000000000000000000000000000000000000000" &&
                    transfer.from_address !==
                      "0x0000000000000000000000000000000000000000";

                  const showTransaction = () => {
                    if (isTransfer) {
                      return "Transfer";
                    } else if (isWithdraw) {
                      return "Withdraw";
                    } else return "Staking";
                  };

                  // console.log("isWithdraw", isWithdraw);
                  return (
                    <>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <a
                            href={`https://mumbai.polygonscan.com/tx/${transfer.transaction_hash}`}
                            target="_blank"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            {transfer.transaction_hash?.slice(0, 10)}...
                          </a>
                        </th>
                        <td className="py-4 px-6">
                          {moment(transfer.block_timestamp).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {ethers.utils.formatUnits(
                            transfer.value,
                            decimals as number
                          )}
                        </td>
                        <td className="py-4 px-6">{showTransaction()}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
