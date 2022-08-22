import { TickerResult } from "../types";
import { contractAbi } from "./abis";

export const fetchTotalSupply = async () => {
  const url =
    "https://deep-index.moralis.io/api/v2/0xaF021AE7Ed5666b87E5bFf61bf0e635F1d426E50/function?chain=mumbai&function_name=totalSupply";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Key": "test",
    },
    body: JSON.stringify({ abi: contractAbi }),
  };

  return fetch(url, options);
};

export const fetchTicker = async (
  address: string
): Promise<{
  result: TickerResult;
}> => {
  const url =
    "https://polygon-mumbai.g.alchemy.com/v2/hL-50oTyiSlgj8H4rF-T9N032-Wh8-Xa";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Key": "test",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenMetadata",
      params: [address],
    }),
  };
  return fetch(url, options).then((res) => res.json());
};
