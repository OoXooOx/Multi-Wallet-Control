import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';



const Home = () => {

    return (
        <div className='white'>
            <div className='donate'>If this site has saved you some time and nerves, you can thank me. 0xDb4CE33fbD72aA160bE47Bc382e53038AD75aFDD </div>
            <Container>
                <Row>
                    <h1>Multi Wallet Control is here for save your time as well !!!</h1>
                    <br></br>
                    <div className='textHome'>
                        - If you want to send transactions in Arbitrum, ZCsync, BSC - you need certain provider for certain chain. By default site works in Goerli.<br></br>
                        - You need be attention when you send uint256 arguments to the Smart Contract. You must consider decimals of this args.<br></br>
                        - You can use "Check data" button to compare data creating this site wich you will send with data from Metamask Hex tab.<br></br>
                        - You must be careful with gas prices. If you do not fill in this input field, this does not mean that everything is fine and the transaction will be completed.
                          This means that the site will receive the gas price from the provider and use it. The price of gas could rise, and transactions would be stuck on pending.
                          Keep in mind that gas price is define in moment when you click on button, so if you send 100 transactions and put up a set a large number of confirmations between transactions
                          you are not immune from the fact that some transactions can freeze due to an increase gas prices.

                    </div>

                    <p></p>
                    <div className='alerts'>
                        <h3>
                            This is a test version, so use it at your own risk.</h3>

                    </div>
                    <Col className='ColHome'>
                    </Col>
                    <Col className='ColHome'>
                    </Col>
                </Row>
            </Container>

        </div >
    )
}

export default Home;
