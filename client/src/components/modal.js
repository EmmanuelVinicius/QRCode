import React from 'react';
import { Modal } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import PrintButton from './button';

export default class MyVerticallyCenteredModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="false"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                {!this.props.error ?
                    <>
                        <Modal.Body className='text-center' id="qrcode">
                            <h2>Convite Reservado, obrigado!</h2>
                            <hr />
                            <h4>
                                {this.props.nome}
                            </h4>
                            <p>
                                {this.props.email}
                                <br />
                                (31) {this.props.telefone}
                            </p>
                            <p>
                                <QRCode value={`https://massas-serafins-api.herokuapp.com/inscricoes/${this.props.qrcode}`} />
                            </p>
                        </Modal.Body>

                        <Modal.Footer>
                            <PrintButton
                                id={"qrcode"}
                                label={"Download do código QR"}
                                style={{ width: "210mm", height: "297mm" }}

                            />
                        </Modal.Footer>
                    </>
                    :
                    <Modal.Body className='text-center' id="qrcode">
                        <h4>
                            Desculpe, houve um erro. Tente novamente mais tarde.
                        </h4>
                    </Modal.Body>
                }
            </Modal>
        );
    }
}
