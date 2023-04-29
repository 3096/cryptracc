import { useAccount, useContract, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import Cryptracc from "../../../smartcontract/artifacts/contracts/Cryptracc.sol/Cryptracc.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const cryptraccConfig = {
  address: import.meta.env.VITE_CONTRACT_ADDR,
  abi: Cryptracc.abi,
};

export function useIdentitySetup() {
  const [identityHash, setIdentityHash] = useState<`0x${string}`>(`0x${"0".repeat(64)}`);
  const { config } = usePrepareContractWrite({ ...cryptraccConfig, functionName: "submitId", args: [identityHash] });
  return { ...useContractWrite(config), setIdentityHash };
}

export function useIdentitySetupCheck() {
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    ...cryptraccConfig,
    functionName: "identityHashes",
    args: [address],
  });
  const navigate = useNavigate();
  if (!isConnected) {
    navigate("/");
  }
  if (!isLoading && !isError) {
    console.log(data);
  }
}
