import React from 'react';
import { Button } from 'react-bootstrap';

import Service from './../services/axiosService'

export default class UpdateButton extends React.Component {
    state = {
        loading: true,
        descricao: 'Confirmar Pagamento',
        cor: 'btn btn-success'
    }

    handleClick = () => {
        this.setState({ descricao: 'Carregando ...', cor: 'btn btn-warning' }, () => {
            Service.patch(`/festival/${this.props.id}`, { pago: true })
                .then(() => this.setState({
                    descricao: 'Confirmado!',
                    loading: false,
                    cor: 'btn btn-success'
                }))
                .catch(() => this.setState({
                    descricao: 'Houve um erro',
                    loading: false,
                    cor: 'btn btn-danger'
                }))
        });
    }

    render() {
        return (
            <Button className={this.state.cor} onClick={this.handleClick}>
                {this.state.descricao}
            </Button>
        )
    }
}