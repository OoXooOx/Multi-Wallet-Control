import React, { useState, useRef } from 'react';
import { ethers } from "ethers";
import { Button, Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ManyToOne from "../images/рт.png";

function SendRawTransactions() {

    const [wallets, setWallets] = useState<Array<ethers.Wallet>>([]);
    const [errorR, setErrorR] = useState<string>("");
    const [recipientAddress, setRecipientAddress] = useState<string>();
    const [amountToSend, setAmountToSend] = useState<number>();
    const [gasPriceInGwei, setGasPriceInGwei] = useState<number>();
    const [numberConfirmations, setNumberConfirmations] = useState<number>();
    const inputRef = useRef(null);
    const [rpcProvider, setRpcProvider] = useState<string>();
    const [chainId, setChainId] = useState<number>();
    const [nonce, setNonce] = useState<number>();
    const [txHash, setTxHash] = useState<string[]>([]);

    const handleRecipentAddressChange = (e: any) => {
        setRecipientAddress(e.target.value);
    }
    const handleAmountToSend = (e: any) => {
        setAmountToSend(e.target.value);
    }
    const handleGasPriceInGwei = (e: any) => {
        setGasPriceInGwei(e.target.value);
    }
    const handleRpcProviderChange = (e: any) => {
        setRpcProvider(e.target.value);
    }
    const handleNumberConfirmations = (e: any) => {
        setNumberConfirmations(e.target.value);
    }
    const handleChainIdChange = (e: any) => {
        setChainId(e.target.value);
    }
    const handleNonceChange = (e: any) => {
        setNonce(e.target.value);
    }
    const isValidAddress = (address: string) => {
        return ethers.utils.isAddress(address);
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



    // 45  46
    // const x = ()=> prev
    // setAttemptCount(   attemptCount
    //     (prevState) => prevState + 1
    //         46
    //     )

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
                    const currentNonce = await provider.getTransactionCount(el.address);
                    const tx = {
                        to: recipientAddress,
                        chainId: Number(chainId ? chainId : 5),
                        value: ethers.utils.parseEther(amountToSend!.toString()),
                        gasPrice: gasPrice,
                        gasLimit: 21000,
                        nonce: Number(nonce ? nonce : currentNonce),
                    };
                    console.log("tx", tx);

                    const signedTx = await el.signTransaction(tx);
                    console.log(signedTx);

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
    //onClick onBlur onFocus on  756


    return (
        <div className="App">
            <div className='donate'>If this site has saved you some time and nerves, you can thank me. 0xDb4CE33fbD72aA160bE47Bc382e53038AD75aFDD </div>
            <Container className='white'>
                <Row >
                    <Col>
                        <h1 className='white'>Paste your private keys</h1>
                        <form
                            onSubmit={handleSavePrivateKeys}>
                            <div className="item" data-title="I need your private keys in format 0dcd4fb3,0dcdb3.
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
                        <div className="item3" data-title="It's goerli chainId by default. You can change this field. Insert only numbers here.">
                            <input
                                type="number"
                                name="chainId"
                                className="input input-bordered block w-full focus:ring focus:outline-none"
                                placeholder="chainId (optionally)"
                                onChange={handleChainIdChange}
                                value={chainId || ""} />

                        </div>
                        <div className="item2" data-title="It's goerli provider by default. You can paste here any other provider for other chain.
                        Something like this https://eth-goerli.public.blastapi.io">
                            <input
                                type="text"
                                name="rpcProvider"
                                className="input input-bordered block w-full focus:ring focus:outline-none"
                                placeholder="provider (optionally)"
                                onChange={handleRpcProviderChange}
                                value={rpcProvider || ""} />
                        </div>

                    </Col>

                    <Col>
                        {txHash.length
                            ? <div className='data'>
                                {txHash.map((el, index) => (
                                    <p key={index}>{"hash :" + " " + el}</p>
                                ))}
                            </div>
                            : <form>
                                <div className="item1" data-title="Paste here only address of user wallet,
                             don't paste here address of smart contract. If you do it, you must know that gas
                              limit will be set to 21000 in this case.">
                                    <input
                                        type="text"
                                        name="recipientAddress"
                                        className="input input-bordered block w-full focus:ring focus:outline-none"
                                        placeholder="recipient address"
                                        onChange={handleRecipentAddressChange}
                                        value={recipientAddress || ""} />
                                </div>
                                <div className="item" data-title="If you paste here 1, it means that you wanna send 1 ETH. For lower value use 0.00...">
                                    <input
                                        type="number"
                                        name="amount to send"
                                        className="input input-bordered block w-full focus:ring focus:outline-none"
                                        placeholder="amount to send"
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
                                <div className="item3" data-title="Optional nonce. Don't touch nonce if you not sure that you need this. 
                                You must understand that you set here same nonce for all transactions within batch.">
                                    <input
                                        type="number"
                                        name="nonce"
                                        className="input input-bordered block w-full focus:ring focus:outline-none"
                                        placeholder="nonce (optionally)"
                                        onChange={handleNonceChange}
                                        value={nonce || ""} />

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
                                    <p></p>
                                    <Button type="button" onClick={handleSendMultiTransactions}>Send multi transactions</Button>
                                </footer>
                                <div className="alerts ">{errorR} </div>
                            </form>}
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default SendRawTransactions;
