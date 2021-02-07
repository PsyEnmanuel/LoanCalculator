import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styled";
import { LoanContext } from "../contexts/LoanContext";
import { IPMT, roundNumber, formatNumber } from "../helper";

const Wrapper = styled.section`
  flex: 1;
  padding: 3em;
  .TableResponsive {
    overflow-x:auto;
  }
  @media (max-width: 768px) {
    padding: 3em 0em;
  }
`;

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 15px;
  width: 100%;
  tr {
    border-radius: 0.25em !important;
    background: #f9f7f7;
    color: $success;
    box-shadow: 0 2px 4px 0 rgba(white, 1), 0 0 6px 0 rgba(white, 0.5);

    td:first-child,
    th:first-child {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }

    td:last-child,
    th:last-child {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }

  th,
  td {
    padding: 1em;
    border: none !important;
    width: 150px;
    text-align: center;
    border: 1px solid black;
  }

  td.action {
    svg {
      cursor: pointer;
      fill: $success;
      font-size: 1.25em;
    }

    svg:hover {
      fill: rgba($success, 0.5);
    }
  }
`;

const Detail = styled.div`
  .PMT {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 300px;
    margin-right: 1em;
  }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    width: 150px;
    background-color: #f97373;
  }
`;

const LoanDetail = () => {
  const { id } = useParams();
  const { loans, dispatch } = useContext(LoanContext);
  let [loan] = loans.filter((i) => i.id === Number(id));

  if (!loan) {
    return <Redirect to="/" />;
  }

  const table_loan = [];

  let balance = Number(loan.amount);
  for (let per = 0; per < loan.years * 12; per++) {
    let ipmt = IPMT(loan.amount, -loan.pmt, loan.rate, per);
    let ppmt = -loan.pmt - ipmt;
    balance += ppmt;
    table_loan.push({
      payment: per,
      principal: loan.currency + formatNumber(roundNumber(-ppmt, 100), 2),
      interest: loan.currency + formatNumber(roundNumber(-ipmt, 100), 2),
      balance: loan.currency + formatNumber(roundNumber(balance, 100), 2),
    });
  }

  function deleteLoan(e, id) {
    dispatch({ type: "REMOVE_LOANS", id: id });
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <Detail>
        <Toolbar>
          <h2 className="PMT">
            <span>Pago mensual: </span>
            <span style={{ color: "#2065a0" }}>
              {loan.currency + formatNumber(loan.pmt_rounded, 2)}
            </span>
          </h2>
          <Button type="button" onClick={(e) => deleteLoan(e, loan.id)}>
            Borrar
          </Button>
        </Toolbar>
        <div className="TableResponsive">
          <Table>
            <thead>
              <tr>
                <th>Pago</th>
                <th>Capital</th>
                <th>Interés</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {table_loan.map((row) => {
                return (
                  <tr key={row.payment}>
                    <td>{row.payment}</td>
                    <td>{row.principal}</td>
                    <td>{row.interest}</td>
                    <td>{row.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Detail>
    </Wrapper>
  );
};

export default LoanDetail;
