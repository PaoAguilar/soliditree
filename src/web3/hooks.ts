import { useWeb3ExecuteFunction } from "react-moralis";
import { contractAbi, rc20Abi } from "./abis";
import { approveAddress, contractAddress } from "./addresses";

export const useAprove = (amount: number) => {
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

export const useDeposit = (amount: number) => {
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

export const useWithdraw = (amount: number) => {
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
