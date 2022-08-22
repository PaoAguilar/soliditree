import { useWeb3ExecuteFunction, useApiContract } from "react-moralis";
import { contractAbi, nftAbi, rc20Abi } from "./abis";
import { approveAddress, contractAddress, nftAddress } from "./addresses";
import { ethers } from "ethers";
import { TickerResult } from "../types";
import { useEffect, useState } from "react";
import { fetchTicker } from "./fetchs";

export const useAprove = (amount?: ethers.BigNumber) => {
  const result = useWeb3ExecuteFunction(
    {
      abi: rc20Abi,
      contractAddress: approveAddress,
      functionName: "approve",
      params: { spender: contractAddress, amount },
    },
    {
      autoFetch: false,
    }
  );
  return result;
};

export const useAllowance = (userAddress?: string | null) => {
  const result = useWeb3ExecuteFunction(
    {
      abi: rc20Abi,
      contractAddress: approveAddress,
      functionName: "allowance",
      params: { owner: userAddress, spender: contractAddress },
    },
    {
      autoFetch: !!userAddress,
    }
  );
  return result;
};

export const useDeposit = (amount?: ethers.BigNumber) => {
  const result = useWeb3ExecuteFunction(
    {
      abi: contractAbi,
      contractAddress: contractAddress,
      functionName: "deposit",
      params: { _amount: amount },
    },
    {
      autoFetch: false,
    }
  );
  return result;
};

export const useWithdraw = (amount?: ethers.BigNumber) => {
  const result = useWeb3ExecuteFunction(
    {
      abi: contractAbi,
      contractAddress: contractAddress,
      functionName: "withdraw",
      params: { _amount: amount },
    },
    {
      autoFetch: false,
    }
  );
  return result;
};

export const useDecimal = () => {
  const result = useWeb3ExecuteFunction(
    {
      abi: rc20Abi,
      contractAddress: approveAddress,
      functionName: "decimals",
      params: {},
    },
    { autoFetch: true }
  );
  return result;
};

export const useBalance = (userAddress?: string | null) => {
  const result = useWeb3ExecuteFunction(
    {
      abi: rc20Abi,
      contractAddress: approveAddress,
      functionName: "balanceOf",
      params: { account: userAddress },
    },
    { autoFetch: !!userAddress }
  );
  return result;
};

export const useWalletBalance = (userAddress?: string | null) => {
  const result = useWeb3ExecuteFunction(
    {
      abi: contractAbi,
      contractAddress: contractAddress,
      functionName: "balanceOf",
      params: { account: userAddress },
    },
    { autoFetch: !!userAddress }
  );
  return result;
};

export const useTotalSupply = () => {
  const result = useWeb3ExecuteFunction(
    {
      abi: contractAbi,
      contractAddress: contractAddress,
      functionName: "totalSupply",
      params: {},
    },
    { autoFetch: true }
  );
  return result;
};

export const useCheckRole = (role: string, account: string | null) => {
  const result = useWeb3ExecuteFunction(
    {
      abi: nftAbi,
      contractAddress: nftAddress,
      functionName: "hasRole",
      params: { account, role },
    },
    { autoFetch: true }
  );
  return result;
};

export const useTokenUri = (tokenId: string) => {
  const result = useWeb3ExecuteFunction(
    {
      abi: nftAbi,
      contractAddress: nftAddress,
      functionName: "tokenURI",
      params: { tokenId },
    },
    { autoFetch: true }
  );
  return result;
};

export const useSafeMint = (userAddress: string | null) => {
  const result = useWeb3ExecuteFunction(
    {
      abi: nftAbi,
      contractAddress: nftAddress,
      functionName: "safeMint",
      params: { to: userAddress },
    },
    { autoFetch: false }
  );
  return result;
};

export const useTicker = (address: string) => {
  const [ticker, setTicker] = useState<{ result: TickerResult }>();
  useEffect(() => {
    fetchTicker(address)
      .then((jsonTicker) => setTicker(jsonTicker))
      .catch((err) => console.error("error:" + err));
  }, []);

  return ticker;
};
