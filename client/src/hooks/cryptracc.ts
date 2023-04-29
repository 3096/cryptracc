import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import Cryptracc from "../../../smartcontract/artifacts/contracts/Cryptracc.sol/Cryptracc.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const zeroHash: `0x${string}` = `0x${"0".repeat(64)}`;

const cryptraccConfig = {
  address: import.meta.env.VITE_CONTRACT_ADDR,
  abi: Cryptracc.abi,
};

export function useIdentitySetup() {
  const [identityHash, setIdentityHash] = useState<`0x${string}`>(zeroHash);
  const { config } = usePrepareContractWrite({ ...cryptraccConfig, functionName: "submitId", args: [identityHash] });
  return { ...useContractWrite(config), setIdentityHash };
}

export function useIdentitySetupCheck(redirectToSetup = true) {
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    ...cryptraccConfig,
    functionName: "identityHashes",
    args: [address],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  useEffect(() => {
    if (isConnected && !isLoading && !isError) {
      if (!redirectToSetup && data !== zeroHash) {
        navigate("/dashboard");
      } else if (data === zeroHash) {
        navigate("/setup");
      }
    }
  }, [data, isLoading, isError, navigate, redirectToSetup, isConnected]);
}
