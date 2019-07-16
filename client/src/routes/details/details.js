import React from 'react';
import { Card } from 'react-bootstrap';

import Service from './../../services/axiosService';
import Navbar from './../../components/navbar'
import UpdateButton from './../../components/updateButton';

import './../../helper/spinner.css';


const style = {
    width: "70rem",
    margin: "5% auto"
}

export default class Details extends React.Component {
    state = {
        pessoa: {},
        existe: true
    }

    async componentDidMount() {
        const id = this.props.match.params.id;

        Service.get(`/festival/${id}`)
            .then(result => {
                this.setState({ pessoa: result.data })
            })
            .catch(() => {
                this.setState({ existe: false })
            })
    }

    render() {
        const { pessoa } = this.state;
        const id = this.props.match.params.id;

        return (
            <>
                <Navbar />
                {
                    this.state.existe ?

                        <Card
                            style={style}
                        >
                            <Card.Header>Cadastro</Card.Header>
                            <Card.Body>
                                <h4>{pessoa.nome}</h4>
                                <p>
                                    <b>Email:</b> {pessoa.email}<br />
                                    <b>Telefone:</b> (31) {pessoa.telefone}
                                </p>
                                <UpdateButton id={id} />
                            </Card.Body>
                        </Card>
                        :
                        <Card
                            bg="danger"
                            style={style}
                            text="white"
                            body
                        >
                            O cadastro informado não existe.
                        </Card>
                }
            </>
        )
    }
}