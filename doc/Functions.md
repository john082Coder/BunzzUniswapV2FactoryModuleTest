# WRITE(main)

## createPair
Creates a pair for tokenA and tokenB if one doesn't exist already.

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|tokenA|address|The address of tokenA||N/A|
|tokenB|address|The address of tokenB||N/A|

## setFeeTo
Set the address where the fee goes to.

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|_feeTo|address|The address of fee||N/A|

## setFeeToSetter
Set the address which can change feeTo address.

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|_feeToSetter|address|setter address for fee||N/A|




# READ(main)

## getPair
Returns the address of the pair for tokenA and tokenB, if it has been created, else address(0)

## allPairs
Returns the address of the nth pair (0-indexed) created through the factory, or address(0)

## allPairsLength
Returns the total number of pairs created through the factory so far.

## feeTo
Returns the address where fee goes to.

## feeToSetter
Returns the address allowed to change feeTo.




