import { useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { useWeb3React } from "@web3-react/core";
import { getReleasableAmount} from '../contracts/utils'

const useReleasableAmount = (vestingWalletContract=null) => {
  const [releasableAmount, setReleasableAmount] = useState(-1);
  const {  connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,} = useWeb3React();
   
    const fetchReleasableAmount = useCallback(async () => {
      console.log("vestingWalletContract = ", vestingWalletContract);
      const releasableAmount = await getReleasableAmount(
        vestingWalletContract
      );
      console.log("releasableAmount = ", releasableAmount);
      setReleasableAmount(releasableAmount);
    }, [account, vestingWalletContract]);
  

    useEffect(() => {
      if (account && vestingWalletContract) {
        fetchReleasableAmount();
      }
      let refreshInterval = setInterval(fetchReleasableAmount, 10000);
      return () => clearInterval(refreshInterval);
    }, [account, vestingWalletContract, fetchReleasableAmount]);

  return releasableAmount;
}

export default useReleasableAmount;
