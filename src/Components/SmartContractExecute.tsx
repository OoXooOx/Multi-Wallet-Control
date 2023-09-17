import React, { useState, useRef } from 'react';
import { ethers } from "ethers";
import { Button, Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ManyToOne from "../images/рт1.png";

interface Input {
    value: string;
    typeValue: string;
}

function SmartContractExecute() {

    const [wallets, setWallets] = useState<Array<ethers.Wallet>>([]);
    const [errorR, setErrorR] = useState<string>("");
    const [recipientAddress, setRecipientAddress] = useState<string>();
    const [functionName, setFunctionName] = useState<string>();
    const [amountToSend, setAmountToSend] = useState<number>();
    const [gasPriceInGwei, setGasPriceInGwei] = useState<number>();
    const [numberConfirmations, setNumberConfirmations] = useState<number>();
    const inputRef = useRef(null);
    const [inputsValue, setInputsValue] = useState<Input[]>([]);
    const [types, setTypes] = useState<Array<{ type: string }>>([])
    const [rpcProvider, setRpcProvider] = useState<string>();
    const [nonce, setNonce] = useState<number>();
    const [chainId, setChainId] = useState<number>();
    const [dataTx, setDataTx] = useState<string>();
    const [txHash, setTxHash] = useState<string[]>([]);


    const handleFunctionNameChange = (e: any) => {
        setFunctionName(e.target.value);
    }
    const handleRpcProviderChange = (e: any) => {
        setRpcProvider(e.target.value);
    }
    const handleChainIdChange = (e: any) => {
        setChainId(e.target.value);
    }
    const handleRecipentAddressChange = (e: any) => {
        setRecipientAddress(e.target.value);
    }
    const handleAmountToSend = (e: any) => {
        setAmountToSend(e.target.value);
    }
    const handleGasPriceInGwei = (e: any) => {
        setGasPriceInGwei(e.target.value);
    }
    const handleNonceChange = (e: any) => {
        setNonce(e.target.value);
    }
    const handleNumberConfirmations = (e: any) => {
        setNumberConfirmations(e.target.value);
    }
    const isValidAddress = (address: string) => {
        return ethers.utils.isAddress(address);
    }

    const copyZeros = () => {
        navigator.clipboard.writeText("000000000000000000")
        alert("copy success!")
    }
    const provider = new ethers.providers.JsonRpcProvider(rpcProvider ? rpcProvider : "https://eth-goerli.g.alchemy.com/v2/" + process.env.REACT_APP_ALCHEMY_API_KEY);


    const handleSavePrivateKeys = (e: any) => {
        try {
            e.preventDefault();
            setErrorR("")
            const array = e.target.privateKeys.value.split(",")
            const wallets = array.map((el: string) => new ethers.Wallet(el))
            setWallets(wallets)
            //@ts-ignore
            inputRef.current.value = "";
        } catch (error: any) {
            console.log(error);
            setErrorR(error.message)
        }
    }

    const handleAddInput = () => {
        try {
            if (inputsValue.length < 10) {
                const newInput = [...inputsValue, { value: "", typeValue: "address" }];
                setInputsValue(newInput);
                const newType = [...types, { type: "address" }];
                setTypes(newType);
            }
        } catch (error: any) {
            console.log(error);
            setErrorR(error.message)
        }
    };

    const handleRemoveInput = (index: number) => {
        try {
            const newInputs = [...inputsValue];
            newInputs.splice(index, 1);
            setInputsValue(newInputs);
            const newTypes = [...types];
            newTypes.splice(index, 1);
            setTypes(newTypes);
        } catch (error: any) {
            console.log(error);
            setErrorR(error.message)
        }
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        try {
            const newInputs = [...inputsValue];
            newInputs[index].value = e.target.value;
            setInputsValue(newInputs);
        } catch (error: any) {
            console.log(error);
            setErrorR(error.message)
        }
    };

    const handleChangeTypeValue = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        try {
            const newInputs = [...inputsValue];
            newInputs[index].typeValue = e.target.value;
            setInputsValue(newInputs);
            const newTypes = [...types];
            newTypes[index] = { type: e.target.value };
            setTypes(newTypes);
        } catch (error: any) {
            console.log(error);
            setErrorR(error.message)
        }
    };

    const getData = () => {
        try {
            setErrorR("")
            const ABI = [{
                "inputs": types,
                "name": functionName,
                "stateMutability": amountToSend ? "payable" : "nonpayable",
                "type": "function"
            }]
            const inputsVal = [...inputsValue];
            const inputValues = inputsVal.map(el => el.value)
            const iface = new ethers.utils.Interface(ABI);
            const data = iface.encodeFunctionData(functionName!, inputValues);
            setDataTx(data)
            return data;
        } catch (error: any) {
            console.log(error);
            setErrorR(error.message)
        }
    }

    const txHashDismiss = () => {
        setTxHash([]);
        setErrorR("");
    }

    const getDataWithAddress = (address: string) => {
        try {
            setErrorR("")
            const ABI = [{
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "chainId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountOutMin",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deadline",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "relayer",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "relayerFee",
                        "type": "uint256"
                    }
                ],
                "name": "sendToL2",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            }]
            // const inputsVal = [...inputsValue];
            // const inputValues = inputsVal.map(el => el.value)
            const iface = new ethers.utils.Interface(ABI);
            const data = iface.encodeFunctionData("sendToL2", [
                59140,
                address,
                ethers.utils.parseEther("0.4"),
                ethers.utils.parseEther("0.387161270336881238"),
                1681414271,
                "0x81682250D4566B2986A2B33e23e7c52D401B7aB7",
                ethers.utils.parseEther("0.010000000000000123"),

            ]);
            setDataTx(data)
            return data;
        } catch (error: any) {
            console.log(error);
            setErrorR(error.message)
        }
    }


    const limitGas = async (address: string) => {
        try {
            const limit = await provider.estimateGas({
                to: recipientAddress,
                from: address,
                chainId: Number(chainId ? chainId : 5),
                data: getData(),
                value: amountToSend ? ethers.utils.parseEther(amountToSend.toString()) : 0,
            });
            return parseInt(limit._hex, 16);
        } catch (error: any) {
            console.log(error);
            setErrorR(error.message)
        }
    }

    const handleSendMultiTransactions = async () => {
        try {
            setErrorR("")
            let gasPrice = await provider.getGasPrice();
            let confirmations = 1; // in ethers.js by default
            if (!isValidAddress(recipientAddress!)) {
                setErrorR("Invalid recipent address!");
                return;
            }
            if (gasPriceInGwei && Number(gasPriceInGwei) !== 0) {
                gasPrice = ethers.utils.parseUnits((gasPriceInGwei)!.toString(), "gwei");
            }
            if (numberConfirmations) {
                confirmations = numberConfirmations;
            }
            for (const el of wallets) {
                try {
                    const GasLimit = await limitGas(el.address);
                    const currentNonce = await provider.getTransactionCount(el.address);
                    const tx = {
                        to: recipientAddress,
                        chainId: Number(chainId ? chainId : 5),
                        data: getData(),
                        value: amountToSend ? ethers.utils.parseEther(amountToSend.toString()) : 0,
                        gasPrice: gasPrice,
                        gasLimit: GasLimit,
                        nonce: Number(nonce ? nonce : currentNonce)
                    };
                    const signedTx = await el.signTransaction(tx);
                    const sendTx = await provider.sendTransaction(signedTx);
                    setTxHash(prevState => [...prevState, sendTx.hash])
                    await sendTx.wait(confirmations);
                } catch (error: any) {
                    console.log(error);
                    setErrorR(error.message)
                }
            }
        } catch (error: any) {
            console.log(error);
            setErrorR(error.message)
        }
    }


    return (
        <div className="App">
            <div className='donate'>If this site has saved you some time and nerves, you can thank me. 0xDb4CE33fbD72aA160bE47Bc382e53038AD75aFDD </div>
            <Container className='white'>
                <Row >
                    <Col>
                        <h1 className='white'>Paste your private keys</h1>
                        <form
                            onSubmit={handleSavePrivateKeys}>
                            <div className="item4" data-title="I need your private keys in format 0dcd4fb3,0dcdb3.
              Separated by commas, no spaces. I won't steal it, trust me :)">
                                <input
                                    type="text"
                                    ref={inputRef}
                                    placeholder="paste your private keys"
                                    className="input input-bordered block w-full focus:ring focus:outline-none"
                                    name="privateKeys" />
                            </div>
                            <p></p>
                            <footer>
                                <Button type="submit">Save private keys</Button>
                            </footer>

                        </form>
                        <div >
                            <p></p>
                            <Image className="siteCover" src={ManyToOne} />
                        </div>
                        <div className="item6" data-title="It's goerli chainId by default. You can change this field. Insert only numbers here.">
                            <input
                                type="number"
                                name="chainId"
                                className="input input-bordered block w-full focus:ring focus:outline-none"
                                placeholder="chainId (optionally)"
                                onChange={handleChainIdChange}
                                value={chainId || ""} />
                        </div>

                        <div className="item5" data-title="It's goerli provider by default. You can paste here any other provider for other chain.
                        Something like this https://eth-goerli.public.blastapi.io">
                            <input
                                type="text"
                                name="rpcProvider"
                                className="input input-bordered block w-full focus:ring focus:outline-none"
                                placeholder="provider (optionally)"
                                onChange={handleRpcProviderChange}
                                value={rpcProvider || ""} />
                        </div>
                        <div className="item5" data-title="Optional nonce. Don't touch nonce if you not sure that you need this. 
                                You must understand that you set here same nonce for all transactions within batch.">
                            <input
                                type="number"
                                name="nonce"
                                className="input input-bordered block w-full focus:ring focus:outline-none"
                                placeholder="nonce (optionally)"
                                onChange={handleNonceChange}
                                value={nonce || ""} />

                        </div>
                    </Col>

                    <Col>
                        {txHash.length
                            ? <div className='data'>
                                {txHash.map((el, index) => (
                                    <div>
                                        <p key={index}>{index + 1 + ". hash :" + " " + el}</p>
                                        <div className="alerts ">{errorR} </div>
                                    </div>

                                ))}

                                <div>
                                    <Button onClick={txHashDismiss}>Dismiss</Button>
                                </div>
                            </div>
                            : <div>
                                <form>
                                    <div className='my-3'>
                                        <input
                                            type="text"
                                            name="recipientAddress"
                                            className="input input-bordered block w-full focus:ring focus:outline-none"
                                            placeholder="contract address"
                                            onChange={handleRecipentAddressChange}
                                            value={recipientAddress || ""} />
                                    </div>

                                    <div className="item1" data-title="Paste here name of function which must be execute.
                            be case-sensitive. Big letters should be big, small letters should be small. It's really important.">
                                        <input
                                            type="text"
                                            name="nameOfFunction"
                                            className="input input-bordered block w-full focus:ring focus:outline-none"
                                            placeholder="function name"
                                            onChange={handleFunctionNameChange}
                                            value={functionName || ""} />
                                    </div>
                                    <p></p>

                                    <div className="item" data-title="If you paste here 1, it means that you wanna send 1 ETH. For lower value use 0.00... 
                            You can don't touch this field and do not send any native currency to smart contract. If function not payable just leave this
                            form empty.">
                                        <input
                                            type="number"
                                            name="amount to send "
                                            className="input input-bordered block w-full focus:ring focus:outline-none"
                                            placeholder="amount to send (optionally)"
                                            onChange={handleAmountToSend}
                                            value={amountToSend || ""} />
                                    </div>
                                    <div className="item" data-title="If you don't change this field, there will be 1 block between
               each transaction of your bundle. If you paste 0, all your transactions will be sent at the same
                time in one block. Increasing this value will increase the time between transactions within the
                 overall batch.">
                                        <input
                                            type="number"
                                            name="numberConfirmations"
                                            className="input input-bordered block w-full focus:ring focus:outline-none"
                                            placeholder="comfirmations (optionally)"
                                            onChange={handleNumberConfirmations}
                                            value={numberConfirmations || ""} />
                                    </div>
                                    <div className="item" data-title="If you do not change this field, the default gas price will be used.
               You can change this. Enter here the gas price in Gwei.">
                                        <input
                                            type="number"
                                            name="gasPriceInGwei"
                                            className="input input-bordered block w-full focus:ring focus:outline-none"
                                            placeholder="gas price, gwei (optionally)"
                                            onChange={handleGasPriceInGwei}
                                            value={gasPriceInGwei || ""} />
                                    </div>

                                    <footer>
                                        <div>
                                            {inputsValue.length < 10 && (
                                                <Button type="button" onClick={handleAddInput}>
                                                    add input field for function arguments
                                                </Button>
                                            )}
                                            <div className="inputFields">
                                                {inputsValue.map((el, index) => (
                                                    <div key={index}>
                                                        <button type="button" onClick={() => handleRemoveInput(index)}>
                                                            -
                                                        </button>
                                                        <select value={el.typeValue} onChange={(e) => handleChangeTypeValue(e, index)}>
                                                            <option value={"address"}>address</option>
                                                            <option value={"uint256"}>uint256</option>
                                                            <option value={"string"}>string</option>
                                                            <option value={"bool"}>bool</option>
                                                            <option value={"bytes"}>bytes</option>
                                                            <option value={"bytes32"}>bytes32</option>
                                                            <option value={"uint8"}>uint8</option>
                                                            <option value={"uint16"}>uint16</option>
                                                            <option value={"uint32"}>uint32</option>
                                                            <option value={"uint64"}>uint64</option>
                                                            <option value={"uint128"}>uint128</option>
                                                        </select>
                                                        <input
                                                            type="text"
                                                            value={el.value}
                                                            onChange={(e) => handleChangeInput(e, index)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <p></p>
                                        <Button type="button" onClick={copyZeros}>Copy 18 zeros in buffer</Button>
                                        <p></p>
                                        <Button onClick={getData}>Check data</Button>
                                        <p></p>
                                        <Button type="button"
                                            onClick={handleSendMultiTransactions}
                                            variant="outline-primary"
                                        >Send multi transactions</Button>
                                    </footer>
                                    <div className="alerts ">{errorR} </div>
                                </form>

                                <div className='data'>
                                    <p></p>
                                    {dataTx
                                        ? (dataTx + " " + "Check data which you will send")
                                        : ""}
                                    <p></p>
                                </div>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default SmartContractExecute;
