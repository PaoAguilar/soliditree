/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useMoralis } from 'react-moralis'

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {
      authenticate,
      isAuthenticated,
      account,
      logout,
      enableWeb3,
      isWeb3Enabled,
    } = useMoralis();

    useEffect(() => {
      if (!isWeb3Enabled) {
        enableWeb3();
      }
    }, [isWeb3Enabled]);

    return (
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center"
          >
            <svg
              className="w-8 text-social-impact-300"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Social Impact
            </span>
          </a>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            {isAuthenticated &&
            <>
              <li>
                <a
                  href="/staking"
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-social-impact-300"
                >
                  Staking
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-social-impact-300"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/withdraw"
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-social-impact-300"
                >
                  Withdraw
                </a>
              </li>
            </>
            }
            <li>
            {isAuthenticated ?
            <>
            <p className="inline-block px-5 py-3 mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-social-impact-100">
              {account?.slice(0, 10)}...
            </p>
            <button
              onClick={() => logout()}
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-200 hover:bg-social-impact-300 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Logout"
            >
              Logout
            </button> 
            </> : 
            <button
              onClick={() => authenticate()}
              className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-200 hover:bg-social-impact-300 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Sign in
            </button>
            }
              
            </li>
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-social-impact-300"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                          Company
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">                      
                      <li>
                        <a
                          href="/signIn"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-social-impact-300 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                          aria-label="Sign up"
                          title="Sign up"
                        >
                          Sign up
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };