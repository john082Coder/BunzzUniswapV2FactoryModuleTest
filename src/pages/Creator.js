import { Button, Col, Container, Row, Form, Spinner } from "react-bootstrap";
import React, { useState,useCallback  } from "react";

import useBunzz from '../hooks/useBunzz';

import {  getUniswapV2FactoryContract, createPair,setFeeTo, setFeeToSetter, getPair } from '../contracts/utils'
import { useWeb3React } from "@web3-react/core";

import { bnToDec, isAddress } from "../utils";
const Creator = () => {
    const bunzz = useBunzz();
    const { account} = useWeb3React();
    const uniswapV2FactoryContract = getUniswapV2FactoryContract(bunzz);

   
    const [tokenAAddress, setTokenAAddress] = useState("");
    const [tokenBAddress, setTokenBAddress] = useState("");
    const [feeToAddress, setFeeToAddress] = useState("");
    const [createdPairAddress, setCreatedPairAddress] = useState("");
 
   
  

    const [pendingCreatePair, setPendingCreatePair] = useState(false);
    const [pendingSetFeeTo, setPendingSetFeeTo] = useState(false);
    const [pendingSetFeeToSetter, setPendingSetFeeToSetter] = useState(false);
    const [pendingGetPair, setPendingGetPair] = useState(false);
 
  
   
   
    const handleGetPair = useCallback(async (tokenA, tokenB) => {
        try { 
            const pair = await getPair(uniswapV2FactoryContract,tokenA, tokenB );
           setCreatedPairAddress(pair);
        } catch (e) {
            console.log(e);
        }
    }, []);
   


    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col lg="4" md="4" xs="12">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input TokenA Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Address" value={tokenAAddress} onChange={(val) => setTokenAAddress(val.target.value)} />
                            <Form.Label>Input TokenB Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Address" value={tokenBAddress} onChange={(val) => setTokenBAddress(val.target.value)} />
                        </Form.Group>
                            {!pendingCreatePair ?
                                <Button className="mx-3" variant="dark" onClick={async () => {
                                    setPendingCreatePair(true);
                                try {
                                    let createdPair;
                                    
                                    createdPair = await createPair(
                                        uniswapV2FactoryContract,
                                        tokenAAddress,
                                        tokenBAddress,
                                        account,
                                    );
                                
                                    setCreatedPairAddress(createdPair);
                                    setPendingCreatePair(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingCreatePair(false);
                                    
                                }
                            }}>
                                Create Pair
                            </Button>
                            :
                            <Button className="mx-3 " variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} Create Pair
                            </Button>
                        }
                        {!pendingGetPair ?
                                <Button className="mx-3" variant="dark" onClick={handleGetPair(tokenAAddress, tokenBAddress)}>
                                Get Pair
                            </Button>
                            :
                            <Button className="mx-3 " variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} Get Pair
                            </Button>
                        }
                        <Form.Label>PairAddress:{createdPairAddress} </Form.Label>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Input  Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Address" value={feeToAddress} onChange={(val) => setFeeToAddress(val.target.value)} />
                        </Form.Group>
                        {!pendingSetFeeTo ?
                                <Button className="mx-3" variant="dark" onClick={async () => {
                                    setPendingSetFeeTo(true);
                                try {
                                    let txHash;
                                    
                                    txHash = await setFeeTo(
                                        uniswapV2FactoryContract,
                                        feeToAddress,
                                        account,
                                    );
                                
                                  
                                    setPendingSetFeeTo(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingSetFeeTo(false);
                                    
                                }
                            }}>
                                SetFeeTo
                            </Button>
                            :
                            <Button className="mx-3 " variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} SetFeeTo
                            </Button>
                        }
                         {!pendingSetFeeToSetter ?
                                <Button className="mx-3" variant="dark" onClick={async () => {
                                    setPendingSetFeeToSetter(true);
                                try {
                                    let txHash;
                                    
                                    txHash = await setFeeToSetter(
                                        uniswapV2FactoryContract,
                                        feeToAddress,
                                        account,
                                    );
                                
                                  
                                    setPendingSetFeeToSetter(false);
                                    
                                } catch (e) {
                                    console.log(e);
                                    setPendingSetFeeToSetter(false);
                                    
                                }
                            }}>
                                SetFeeToSetter
                            </Button>
                            :
                            <Button className="mx-3 " variant="dark">
                                 <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />{` `} SetFeeToSetter
                            </Button>
                        }
                    </Form>     
                </Col>
            </Row>
        </Container>
    )
}

export default Creator;