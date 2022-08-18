/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect } from "react";
import { useMoralis, useNFTBalances, useERC20Transfers } from "react-moralis";
import Footer from "../src/components/Footer/Footer";
import { Navbar } from "../src/components/Navbar/Navbar";
import { nftAddress } from "../src/web3/addresses";
import {
  useCheckRole,
  useDecimal,
  useSafeMint,
  useWalletBalance,
} from "../src/web3/hooks";
import { ethers } from "ethers";

const Profile = () => {
  const { account, isWeb3Enabled } = useMoralis();
  const role =
    "0xdffeb33a4726dd9fdaa4d05a54d6a1effabbd5f5b2c8cc66c3c1630ef432ff37";
  const { data: hasRole, fetch: fetchCheckRole } = useCheckRole(role, account);
  const { data: nftData, isLoading } = useNFTBalances();
  const { fetch: safeMint, isLoading: isLoadingMint } = useSafeMint(account);
  const { data: balance } = useWalletBalance(account);
  const { data: decimals, fetch: fetchDecimals } = useDecimal();
  const {
    fetchERC20Transfers,
    data: ERC20TransferData,
    isFetching,
  } = useERC20Transfers();
  console.log(nftData);

  const myNftData = nftData?.result?.filter(
    (nftData) => nftData.token_address === nftAddress.toLowerCase()
  );

  const walletBalance =
    (balance &&
      Number(
        ethers.utils.formatUnits(
          (balance as ethers.BigNumber)._hex,
          decimals as number
        )
      ).toFixed(2)) ||
    0;

  useEffect(() => {
    if (isWeb3Enabled) {
      fetchCheckRole();
      fetchDecimals();
      fetchERC20Transfers();
    }
  }, [isWeb3Enabled]);

  function getLeftDays(days = 0) {
    if (days <= 1) {
      return "1 day left";
    }
    if (days > 1 && days < 30) {
      return 30 - days + " days left";
    }
    if (days >= 30 && days < 90) {
      return 90 - days + " days left";
    }
    if (days >= 90 && days < 180) {
      return 180 - days + " days left";
    }
    if (days >= 180 && days < 365) {
      return 365 - days + " days left";
    }
    if (days >= 365) {
      return "Congrats! you've get the final NFT";
    }
  }

  return (
    // @ts-ignore
    <div>
      <Navbar />
      <div className="px-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="max-w-screen-sm sm:text-center sm:mx-auto">
          <a
            aria-label="View"
            className="inline-block mb-5 rounded-full sm:mx-auto"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
              <svg
                className="w-12 h-12 text-social-impact-300"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
          </a>
          <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            TOTAL STAKE BALANCE
          </h2>
          <h2 className="sm:px-4 text-3xl text-social-impact-100">
            {(walletBalance as number) || 0}
          </h2>
          <hr className="w-full my-8 border-gray-300" />
        </div>
      </div>
      {hasRole && (myNftData?.length ?? 0) < 1 && (
        <div className="max-w-screen-sm sm:text-center sm:mx-auto">
          <button
            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-100 hover:bg-social-impact-200 focus:shadow-outline focus:outline-none"
            title="withdraw"
            form="transactions"
            onClick={(e) => {
              if (hasRole) {
                try {
                  safeMint();
                } catch (e) {
                  console.log(e);
                }
              }
            }}
          >
            {isLoadingMint ? "Loading..." : "MINT"}
          </button>
        </div>
      )}
      {/* FIN DE LA PRIMERA PARTE */}
      <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex flex-col bg-white border rounded shadow-sm md:justify-center lg:flex-row">
          <div className="flex flex-col justify-between p-5 border-b sm:p-10 lg:border-b-0 lg:border-r lg:w-1/2">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                Days in staking
              </p>
              <h5 className="max-w-md mb-6 text-3xl font-extrabold leading-none sm:text-4xl text-center">
                {myNftData?.[0]?.metadata?.attributes?.stakeTime}
              </h5>
              <p className="mb-6 text-base text-gray-700 md:text-lg sm:mb-8">
                You have {myNftData?.[0]?.metadata?.attributes?.stakeTime} days
                of having deposited in staking
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between p-5 sm:p-10 lg:w-1/2">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                Days left for claim
              </p>
              <h5 className="max-w-md mb-6 text-3xl font-extrabold leading-none sm:text-4xl text-center">
                {getLeftDays(myNftData?.[0]?.metadata?.attributes?.stakeTime)}
              </h5>
              {myNftData?.[0]?.metadata?.attributes?.stakeTime < 365 && (
                <p className="mb-6 text-base text-gray-700 md:text-lg sm:mb-8">
                  You have{" "}
                  {getLeftDays(myNftData?.[0]?.metadata?.attributes?.stakeTime)}{" "}
                  days remaining to get the commemorative Tree badge
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="7b568941-9ed0-4f49-85a0-5e21ca6c7ad6"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#7b568941-9ed0-4f49-85a0-5e21ca6c7ad6)"
                  width="52"
                  height="24"
                />
              </svg>
            </span>
            MY BADGE
          </h2>
        </div>
        <div className="flex justify-center">
          {myNftData?.map((nftData) => {
            return (
              <a
                key={nftData.token_uri}
                aria-label="View Item"
                className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2 min-w-40 w-80"
              >
                <div className="flex flex-col h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${nftData.metadata?.image}?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260`}
                    className="object-contain w-full h-48"
                    alt=""
                  />
                  <div className="flex-grow border border-t-0 rounded-b">
                    <div className="p-5">
                      <h3 className="mb-2 font-semibold leading-5 text-xl capitalize">
                        {nftData.metadata?.name}
                      </h3>
                      <h6 className="mb-2 font-semibold leading-5 text-lg">
                        Stake time: {nftData.metadata?.attributes?.stakeTime}{" "}
                        days
                      </h6>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
