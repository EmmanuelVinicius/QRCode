import React from 'react';
import Service from './../../services/axiosService'
import MyVerticallyCenteredModal from './../../components/modal'
import {
    Button,
    Col,
    Form,
    Jumbotron,
    ButtonToolbar,
    ToggleButton,
    ToggleButtonGroup
} from 'react-bootstrap';

import { Formik } from 'formik';
import * as yup from 'yup';

import './../../helper/spinner.css';

const schema = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    telefone: yup.string().matches(/^9[0-9]{8}$/, 'Numero de telefone inválido').required(),
    dataNascimento: yup.date(),
    idade: yup.number().min(10),
    membro: yup.bool().default(0),
    //qtdIngressos: yup.number().max(10).default(1).required(),
    //dataPagamento: yup.date().required(),
    //recebedor: yup.string().required(),
})

export default class FormExample extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            error: false,
            isLoading: false,
            modalShow: false,
            nome: '',
            qrcode: '',
            email: '',
            telefone: ''
        };
    }
    handleSubmit = dadosForm => {
        this.setState({ isLoading: true }, () => {
            Service.post(`/festival`, dadosForm)
            .then(dados => {
                this.setState({
                    nome: dados.data.nome,
                    qrcode: dados.data._id,
                    email: dados.data.email,
                    telefone: dados.data.telefone,
                    modalShow: true,
                    isLoading: false
                })
            }).catch(response => {
                console.error('response Error', response)
                this.setState({
                    modalShow: true,
                    isLoading: false,
                    error: true

                })
            })
        })
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        const { isLoading } = this.state;
        return (
            <>
                <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    nome={this.state.nome}
                    qrcode={this.state.qrcode}
                    email={this.state.email}
                    telefone={this.state.telefone}
                    error={this.state.error}
                />
                {isLoading ?
                    <div class="lds-css">
                        <div class="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    : ''}
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleSubmit}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                            <Jumbotron>
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} md="8" controlId="validationFormik01">
                                            <Form.Label>Nome Completo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nome"
                                                onChange={handleChange}
                                                isInvalid={!!errors.nome}
                                            />
                                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="4" controlId="validationFormik02">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                isInvalid={!!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="3" controlId="validationFormik03">
                                            <Form.Label>Telefone</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="telefone"
                                                onChange={handleChange}
                                                isInvalid={!!errors.telefone}
                                            />

                                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="1" controlId="validationFormik04">
                                            <Form.Label>Idade <span className="text-secondary">(Opcional)</span> </Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="idade"
                                                onChange={handleChange}
                                                isInvalid={!!errors.idade}
                                            />
                                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>

                                        <Form.Group as={Col} md="3" controlId="validationFormik05">
                                            <Form.Label>Data de Nascimento <span className="text-secondary">(Opcional)</span> </Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="dataNascimento"
                                                onChange={handleChange}
                                                isInvalid={!!errors.dataNascimento}
                                            />

                                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="pl-3">Já é membro do Ministério?</Form.Label>
                                            <ButtonToolbar className="pl-3">
                                                <ToggleButtonGroup type="radio" name="membro">
                                                    <ToggleButton
                                                        value={true}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.membro}
                                                        feedback={errors.membro}
                                                    >Sim</ToggleButton>
                                                    <ToggleButton
                                                        value={false}
                                                        onChange={handleChange}
                                                        isInvalid={!!errors.membro}
                                                        feedback={errors.membro}
                                                    >Não</ToggleButton>
                                                </ToggleButtonGroup>
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button
                                        variant="success"
                                        disabled={isLoading}
                                        onClick={!isLoading ? handleSubmit : null}
                                    >
                                        {isLoading ? 'Carregando ...' : 'Enviar'}
                                    </Button>
                                </Form>
                            </Jumbotron>
                        )}
                </Formik >
            </>
        );

    }
}