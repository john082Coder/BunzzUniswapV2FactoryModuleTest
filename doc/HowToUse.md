## Preparation before deployment
1. You should prepare two ERC20 tokens for creating pair.

## Get started(Operation)


1. Deploy uniswapV2Factory contract. You have to pass setter address for fee when deploying factory contract.
2. You can create pair contract by calling `createPair(tokenA, tokenB)`function.
3. You can change the address for fee by calling `setFeeTo()` and `setFeeToSetter` functions.
4. You can get any pair addresses by calling `getPair(address, address)` function.




