import { Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import LinImg from "../images/link.png"
import TelegramImg from "../images/telegram.png"
import GithubImg from "../images/Github.png"

export default function Contact() {
    return (
        <div className='white'>
            <Container>
                <p></p>
                <Row className='contact'>
                    <div  >
                        <a href="https://www.linkedin.com/in/-geo/">
                            <Image className="linkImg" src={LinImg} /></a>
                        <a href="https://t.me/CryptoSolidityWeb3">
                            <Image className="linkImg" src={TelegramImg} /></a>
                            <a href="https://github.com/OoXooOx/Multi-Wallet-Control/tree/main">
                            <Image className="linkImg1" src={GithubImg} /></a>
                    </div>
                </Row>
            </Container>
        </div>
    )
}
