import { useEffect, useState } from "react";
import { HexString, ZERO_HASH, useCryptraccCreate, useIdentitySetupCheck } from "../hooks/cryptracc";

export default function CreatePage() {
  useIdentitySetupCheck();
  const [contractHash, setContractHash] = useState<HexString>(ZERO_HASH);
  const [signerAddresses, setSignerAddresses] = useState<HexString[]>([]);
  const { data, isLoading, isSuccess, write } = useCryptraccCreate(contractHash, signerAddresses);

  // this is just a test, write your actual damn code
  const [tested, setTested] = useState(false);
  useEffect(() => {
    if (!tested) {
      setContractHash("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
      setSignerAddresses(["0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]);
      if (write) {
        write();
        setTested(true);
      }
    }
  }, [setContractHash, setSignerAddresses, tested, write]);
  console.log(data, isLoading, isSuccess);

  return <>this is the CreatePage</>;
}
