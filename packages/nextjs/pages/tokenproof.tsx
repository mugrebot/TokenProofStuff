import { useEffect } from "react";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractUI } from "~~/components/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";
import { TokenproofDemo } from "~~/components/scaffold-eth"

const tokenproof: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="TokenProof of Concept"

      />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Token Proof Concept</h1>
        <p className="text-neutral">
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <TokenproofDemo
        appId = 'this is where my APP id would go :)' />
        </div>
      </div>
      
    </>
  );
};

export default tokenproof;
