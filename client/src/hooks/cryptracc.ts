import { useAccount, useContractRead, useContractReads, useContractWrite, usePrepareContractWrite } from "wagmi";
import Cryptracc from "../../../smartcontract/artifacts/contracts/Cryptracc.sol/Cryptracc.json";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";

export type HexString = `0x${string}`;
export const SignStatus = {
  0: "Not Invited",
  1: "Not Signed",
  2: "Signed",
};
export const ZERO_HASH: HexString = `0x${"0".repeat(64)}`;
export const ZERO_ADDRESS: HexString = `0x${"0".repeat(40)}`;

const cryptraccConfig = {
  address: import.meta.env.VITE_CONTRACT_ADDR,
  abi: Cryptracc.abi,
};

export function useIdentitySetup() {
  const [identityHash, setIdentityHash] = useState<HexString>(ZERO_HASH);
  const { config } = usePrepareContractWrite({ ...cryptraccConfig, functionName: "submitId", args: [identityHash] });
  return { ...useContractWrite(config), setIdentityHash };
}

export function useIdentityHash(address: HexString) {
  return useContractRead({
    ...cryptraccConfig,
    functionName: "identityHashes",
    args: [address],
  });
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
    } else {
      if (!isLoading && !isError) {
        if (!redirectToSetup && data !== ZERO_HASH) {
          navigate("/dashboard");
        } else if (data === ZERO_HASH) {
          navigate("/setup");
        }
      }
    }
  }, [data, isLoading, isError, navigate, redirectToSetup, isConnected]);
}

export function useCryptraccCreate(contractHash: HexString, signerAddresses: HexString[]) {
  const { config } = usePrepareContractWrite({
    ...cryptraccConfig,
    functionName: "createContract",
    args: [contractHash, signerAddresses],
  });
  return useContractWrite(config);
}

export function useCryptraccContract(contractHash: HexString) {
  const { data: signerCount } = useContractRead({
    ...cryptraccConfig,
    functionName: "contractSignerCount",
    args: [contractHash],
  });
  const { data: signerAddresses } = useContractReads({
    contracts: signerCount
      ? [...Array((signerCount as BigNumber).toNumber()).keys()].map((i) => ({
          ...cryptraccConfig,
          functionName: "contractSigners",
          args: [contractHash, i],
        }))
      : [],
  });
  const { data } = useContractReads({
    contracts: signerAddresses
      ? signerAddresses.map((address) => ({
          ...cryptraccConfig,
          functionName: "contractSignStatus",
          args: [contractHash, address],
        }))
      : [],
  });
  return {
    contractSignStatus: data?.map((signStatus, i) => ({ address: signerAddresses?.[i], signStatus })),
  };
}

export function useCryptraccSign(contractHash: HexString) {
  return usePrepareContractWrite({
    ...cryptraccConfig,
    functionName: "signContract",
    args: [contractHash],
  });
}
