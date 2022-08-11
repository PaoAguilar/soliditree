/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { useMoralis, useApiContract } from "react-moralis";
import { useRouter } from "next/router";
import { useTotalSupply, useDecimal } from "../../web3/hooks";

const Hero = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const { isAuthenticated, enableWeb3, isWeb3Enabled } = useMoralis();
  const { data: dataTotalSupply, fetch: fetchTotalSupply } = useTotalSupply();
  const { data: decimals, fetch: fetchDecimal } = useDecimal();

  const onClickRedirect = () => {
    if (!isAuthenticated) {
      setErrorMessage("You need to authenticate first");
    } else {
      router.push("/staking");
    }
  };
  const totalSup = dataTotalSupply as ethers.BigNumber;
  const supplyToBigNumber = totalSup && BigNumber.from(totalSup._hex);
  const totalSupplyValue =
    totalSup &&
    ethers.utils.formatUnits(supplyToBigNumber.toString(), decimals as number);
  console.log("totalSupplyValue", totalSupplyValue);

  useEffect(() => {
    if (isAuthenticated) {
      setErrorMessage("");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isWeb3Enabled) {
      fetchTotalSupply();
      fetchDecimal();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full object-right"
          src="banner.png?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-social-impact-100">
            Features
          </p>
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            Let's reduce the carbon footprint{" "}
            <span className="inline-block text-social-impact-300">
              on our planet.
            </span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Together we contribute through DeFi, to the reforestation of the
            most affected areas of our planet.
          </p>
          <div className="p-8 bg-gray-900 rounded">
            <div className="mb-4 text-center">
              <p className="text-xl font-medium tracking-wide text-white">
                Total supply balance
              </p>
              <div className="flex items-center justify-center">
                <p className="mr-2 text-5xl font-semibold text-white md:text-1xl">
                  {Number(totalSupplyValue).toFixed(2)}
                </p>
                {/* <p className="text-lg text-gray-500">/ month</p> */}
              </div>
            </div>
          </div>
          <div className="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
          <div className="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
          <div className="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" />
          {/* {isAuthenticated ? } */}
          <div className="flex items-center mt-5">
            <button
              onClick={onClickRedirect}
              className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-200 hover:bg-social-impact-300 focus:shadow-outline focus:outline-none"
            >
              Start staking
            </button>
          </div>
          <div className="text-red-accent-700">{errorMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
