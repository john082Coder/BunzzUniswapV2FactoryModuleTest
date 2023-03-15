import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { Contracts } from './lib/contracts.js';
import { EVM } from './lib/evm.js';

import { contractAddresses } from './lib/constants';

export class BUNZZ {
  constructor(provider, networkId, testing, options) {
   
    var realProvider;

    if (typeof provider === 'string') {
      
      if (provider.includes('wss')) {
       
        realProvider = new Web3.providers.WebsocketProvider(
          provider,
          options.ethereumNodeTimeout || 10000,
        );
      } else {
       
        realProvider = new Web3.providers.HttpProvider(
          provider,
          options.ethereumNodeTimeout || 10000,
        );
      }
    } else {
      realProvider = provider;
    }

    this.web3 = new Web3(realProvider);
    console.log("web3 = ",this.web3);
    if (testing) {
      this.testing = new EVM(realProvider);
      this.snapshot = this.testing.snapshot();
    }

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount;
    }
    this.contracts = new Contracts(realProvider, networkId, this.web3, options);
  
  
  }

  setProvider(provider, networkId) {
    this.web3.setProvider(provider);
    this.contracts.setProvider(provider, networkId);
    this.operation.setNetworkId(networkId);
  }

  toBigN(a) {
    return BigNumber(a);
  }
}
