import React from 'react';
import Navbar from './navbar';

export default class Pessoa extends React.Component {
    constructor(...args) {
        super(...args);
    }
    render() {
        <>
            <div className="pessoa-info">
                <h2>{pessoa.nome}</h2>
                <p>
                    <b>Email:</b> {pessoa.email}<br />
                    <b>Telefone:</b> {pessoa.telefone}
                </p>
            </div>
        </>
    }
}