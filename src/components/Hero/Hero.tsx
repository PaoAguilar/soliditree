/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from "react";
import bannerImg from "../../assets/images/banner.png";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

const Hero = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const {
    authenticate,
    isAuthenticated,
    account,
    logout,
    enableWeb3,
    isWeb3Enabled,
  } = useMoralis();
  // console.log('account',account)
  console.log("isAuthenticated", isAuthenticated);

  const onClickRedirect = () => {
    if (!isAuthenticated) {
      setErrorMessage("You need to authenticate first");
    } else {
      router.push("/staking");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setErrorMessage("");
    }
  }, [isAuthenticated]);

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
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Brand new
          </p>
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            Everything you
            <br className="hidden md:block" />
            can imagine{" "}
            <span className="inline-block text-social-impact-300">is real</span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae. explicabo.
          </p>
          {/* {isAuthenticated ? } */}
          <div className="flex items-center">
            <button
              onClick={onClickRedirect}
              className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-200 hover:bg-social-impact-300 focus:shadow-outline focus:outline-none"
            >
              Start saving and earning
            </button>
          </div>
          <div className="text-red-accent-700">{errorMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
