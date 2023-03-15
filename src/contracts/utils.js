import { ethers } from 'ethers';

import BigNumber from 'bignumber.js';
import { useWeb3React } from "@web3-react/core";
import {
  // SUBTRACT_GAS_LIMIT,
  contractAddresses,
} from './lib/constants.js';
import { bnToDec } from './utils';
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});




export const getErc20Contract = (bunzz) => {
  return bunzz && bunzz.contracts && bunzz.contracts.erc20;
}

export const getUniswapV2FactoryContract = (bunzz) => {
  return bunzz && bunzz.contracts && bunzz.contracts.uniswapV2Factory;
}

export const setErc20ContractAddress = (bunzz, address) => {
  bunzz.contracts.erc20.options.address = address;
}
export const getAllowance = async (
  erc20Contract,
  escrowContract,
  account
) => {
  try {
    const allowance = await erc20Contract.methods
      .allowance(account, escrowContract.options.address)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getDecimal = async (
  erc20Contract,
) => {
  try {
    const decimal = await erc20Contract.methods
      .decimals()
      .call()
      return new BigNumber(decimal);
  } catch (e) {
    return new BigNumber(0);
  }
}


export const getVotes = async (
  erc20VotesContract,
  address,
) => {
  try {
    const votes = await erc20VotesContract.methods
      .getVotes(address)
      .call()
      console.log("votes = ", votes);
    return votes;
  } catch (e) {
    return '0'
  }
}

export const mint = async (erc20VotesContract, amount, account) => {
  return erc20VotesContract.methods.Mint(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}

export const decreaseAllowance = async (erc20VotesContract, spender, subtractedValue, account) => {
  return erc20VotesContract.methods.decreaseAllowance(spender, new BigNumber(subtractedValue).times(new BigNumber(10).pow(18)).toString()).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}
export const approve = async (erc20VotesContract, spender, amount, account) => {
  return erc20VotesContract.methods.approve(spender, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}

export const delegate = async (erc20VotesContract, delegatee, account) => {
  return erc20VotesContract.methods.delegate(delegatee).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}

export const delegateBySig = async (erc20VotesContract, delegatee, nonce, expiry, v, r, s,  account) => {
  return erc20VotesContract.methods.delegateBySig(delegatee, nonce, expiry, v, r, s).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}

export const increaseAllowance = async (erc20VotesContract, spender, addedValue, account) => {
  return erc20VotesContract.methods.increaseAllowance(spender, new BigNumber(addedValue).times(new BigNumber(10).pow(18)).toString()).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}

export const permit = async (erc20VotesContract, owner, spender, value, deadline, v, r, s, account) => {
  return erc20VotesContract.methods.permit(owner, spender, value, deadline, v, r, s).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}

export const createPair = async (uniswapV2FactoryContract, tokenA, tokenB, account) => {
/*  return  uniswapV2FactoryContract.methods.createPair(tokenA, tokenB).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); */
  try {
    const txHash = await uniswapV2FactoryContract.methods
      .createPair(tokenA, tokenB)
      .send({ from: account})
    const pair  = txHash?.events?.PairCreated?.returnValues?.pair;
      console.log("pair = ", pair);
    return pair;
  } catch (e) {
    return '0'
  }
}

export const setFeeTo = async (uniswapV2FactoryContract, _feeTo, account) => {
  return uniswapV2FactoryContract.methods.setFeeTo(_feeTo).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}

export const setFeeToSetter = async (uniswapV2FactoryContract, _feeToSetter, account) => {
  return uniswapV2FactoryContract.methods.setFeeToSetter(_feeToSetter).send({ from: account})
  .on('transactionHash', (tx) => {
    console.log(tx)
    return tx.transactionHash
  }); 
}

export const getPair = async (
  uniswapV2FactoryContract,
  tokenA,
  tokenB
) => {
  try {
    const pair = await uniswapV2FactoryContract.methods
      .getPair(tokenA, tokenB)
      .call()
      console.log("pair = ", pair);
    return pair;
  } catch (e) {
    return '0'
  }
}





