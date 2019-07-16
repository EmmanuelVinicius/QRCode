import React from 'react';
import { Form, Input, Select } from 'unform';
import festivalApi from './../../service/festivalApi';
import { Redirect } from 'react-router-dom';
//import Yup from 'yup';
import './mainForm.css'

const membro = [
  { id: true, title: 'Sim' },
  { id: false, title: 'Não' },
];
// const dependent = [
//   { id: 'amigo', title: 'Amigo(a)' },
//   { id: 'namorado', title: 'Namorado(a)' },
//   { id: 'filho', title: 'Filho(a)' },
//   { id: 'pai', title: 'Pai' },
//   { id: 'mae', title: 'Mãe' },
//   { id: 'irmao', title: 'Irmão/Irmã' },
//   { id: 'primo', title: 'Primo(a)' },
//   { id: 'sobrinho', title: 'Sobrinho(a)' },
// ];
// const phoneRegExp = '^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$';

// const schema = Yup.object().shape({
//   nome: Yup.string().required(),
//   sobrenome: Yup.string().required(),
//   telefone: Yup.string().matches(phoneRegExp, 'Numero de telefone inválido').required(),
//   email: Yup.string().email().required(),
//   dataNascimento: Yup.date().required(),
//   membro: Yup.bool().required(),
//   qtdIngressos: Yup.number().max(10).default(1).required(),
//   dataPagamento: Yup.date().required(),
//   recebedor: Yup.string().required(),
// })

export default class MainForm extends React.Component {
  constructor() {
    super();
  }
  state = {
    display: true,
    qrcode: ''
  }

  handleSubmit = async (data) => {
    const result = await festivalApi.post(`http://localhost:3100/festival`, data)

    .then(function (response) {
        console.log(response);
        this.setState({ display: false, qrcode: result.qrcode })
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ display: false })
      });
  }

  render() {
    const { display, qrcode } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <label>Nome Completo</label>
          <Input name='nome' />
          <label>Idade</label>
          <Input name='sobrenome' />
          <label>Telefone</label>
          <Input name='telefone' />
          <label>Email</label>
          <Input name='email' type='email' />
          <label>Data de Nascimento</label>
          <Input name='dataNascimento' type='date' />
          <label>Já é membro do Ministério?</label>
          <Select name="membro" options={membro} />
          {/*******************/}
          <label>Quantos ingressos quer reservar?</label>
          <Input name='qtdIngressos' type='number' />
          {/*<Scope path="dependents">
        <Input name="dependentName" />
        <Select name="dependent" options={dependent} />
    </Scope>*/}
          <label>Data do Pagamento</label>
          <Input name='dataPagamento' type='date' />
          <Input name='recebedor' type='hidden' value='nao confirmado' />


          <button type="submit">Sign in</button>
        </Form>
        <div>
          {qrcode}
        </div>
      </>
    )
  }
}
/*
<Input name='nome' />
<Input name='sobrenome' />
<Input name='telefone' />
<Input name='email' type='email'/>
<Input name='dataNascimento' />
<Select name="membro" options={options} />
<Input name='qtdIngressos' type='number'/>
<Input name='dataPagamento' />
<Input name='recebedor' />
*/