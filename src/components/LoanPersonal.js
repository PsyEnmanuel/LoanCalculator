import React, { Component, useState, useContext } from "react";
import styled from "styled-components";
import { Input, InputIcon, Label, FormItem, Button, Select } from "../styled";
import { LoanContext } from "../contexts/LoanContext";
import { roundNumber, PMT, isNumeric } from "../helper";
import currency from "../data/currency";
import { Redirect, useHistory } from "react-router-dom";
import {
  AiOutlinePercentage,
  AiOutlineDollarCircle,
  AiOutlineCalendar,
  AiOutlineAudit,
} from "react-icons/ai";
import loan from "../assets/loan.png";

const Wrapper = styled.section`
  flex: 1;
  padding: 3em;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  img {
    max-width: 250px;
    margin-bottom: 2em;
  }
  @media (max-width: 768px) {
    padding: 3em 0em;
  }
`;
const LoanPersonal = () => {
  const { dispatch, loans } = useContext(LoanContext);
  let history = useHistory();
  const [state, setState] = useState({
    id: 1,
    name: "",
    amount: "",
    rate: "",
    years: "",
    currency: "$",
    pmt: null,
    pmt_rounded: null,
  });

  function handleInputChange(e) {
    setState(Object.assign({}, state, { [e.target.name]: e.target.value }));
  }

  function saveLoan(e) {
    e.preventDefault();
    if(!isNumeric(state.amount)) {
      alert("El campo 'Monto del préstamo' debe ser un número. Ej: 150000");
    }
    if(!isNumeric(state.rate)) {
      alert("El campo 'Tasa de Interés' debe ser un número. Ej: 10, 8.5");
    }
    if(!isNumeric(state.years)) {
      alert("El campo 'Cantidad de años' debe ser un número. Ej: 3, 3.5");
    }
    if (state.amount > 0 && state.rate > 0 && state.years > 0) {
      let pmt = PMT(state.rate, state.years, state.amount);
      let id = loans.length ? loans[loans.length - 1].id + 1 : 1;
      dispatch({
        type: "ADD_LOANS",
        loan: Object.assign({}, state, {
          id: id,
          amount: Math.abs(Number(state.amount)),
          rate: Math.abs(Number(state.rate)),
          years: Math.abs(Number(state.years)),
          pmt: pmt,
          pmt_rounded: roundNumber(pmt, 100),
        }),
      });
      history.push('/listado/'+id)
      return;
      
      
    }
  }

  var currencyOptions = Object.keys(currency).map(function (key) {
    return (
      <option key={key} value={currency[key].symbol}>
        {key} ({currency[key].name})
      </option>
    );
  });

  return (
    <Wrapper>
      <img src={loan} className="Image-responsive" alt="logo" />
      <form className="FormSimpleLoan" onSubmit={saveLoan}>
        <FormItem>
          <Label>Nombre del préstamo ...</Label>
          <InputIcon>
            <Input
              value={state.name}
              name="name"
              placeholder="Préstamo Vehículo"
              onChange={(e) => handleInputChange(e)}
            ></Input>
            <AiOutlineAudit />
          </InputIcon>
        </FormItem>
        <FormItem>
          <Label>Monto del préstamo ...</Label>
          <InputIcon>
            <Input
              value={state.amount}
              name="amount"
              onChange={(e) => handleInputChange(e)}
            ></Input>
            <AiOutlineDollarCircle />
          </InputIcon>
        </FormItem>
        <FormItem>
          <Label>Tasa de Interés ...</Label>
          <InputIcon>
            <Input
              value={state.rate}
              name="rate"
              onChange={(e) => handleInputChange(e)}
            ></Input>
            <AiOutlinePercentage />
          </InputIcon>
        </FormItem>
        <FormItem>
          <Label>Cantidad de años ...</Label>
          <InputIcon>
            <Input
              value={state.years}
              name="years"
              onChange={(e) => handleInputChange(e)}
            ></Input>
            <AiOutlineCalendar />
          </InputIcon>
        </FormItem>
        <FormItem>
          <Label>Moneda ...</Label>
          <Select
            value={state.currency}
            name="currency"
            onChange={(e) => handleInputChange(e)}
          >
            {currencyOptions}
          </Select>
        </FormItem>
        <FormItem>
          <Button>Calcular</Button>
        </FormItem>
      </form>
    </Wrapper>
  );
};

export default LoanPersonal;
