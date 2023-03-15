import React from "react";



import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers'
import  BunzzProvider  from "./contexts/BunzzProvider";
function getLibrary(provider) {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}

const Providers = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BunzzProvider>
        {children}
      </BunzzProvider>
         
      
    </Web3ReactProvider>
  );
};

export default Providers;
