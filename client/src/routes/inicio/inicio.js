import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
const Inicio = () => (
    <Jumbotron className="text-center">
        <h4>Ministério da Reconciliação Serafins de Deus</h4>
        <h1>Festival de Massas Serafins - dia 15/06</h1>
        <hr />
        <br />
        <Link to="/formulario" className="btn btn-primary">Fazer inscrição</Link>
    </Jumbotron>
);
export default Inicio;