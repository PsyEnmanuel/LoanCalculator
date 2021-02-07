import { useContext } from "react";
import { LoanContext } from "../contexts/LoanContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatNumber } from "../helper";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "../styled";


const Wrapper = styled.section`
  flex: 1;
  padding: 3em;
  @media (max-width: 768px) {
    padding: 3em 0em;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 10px;
  .LoanCard {
    text-decoration: none;
    margin-right: 1%;
    margin-bottom: 2em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    color: #333;

    background: #a8f7e7;
    border: none;
    border-radius: 1em;
    position: relative
  }
  .LoanCard-text {
    width: 96%;
    display: flex;
    flex-direction: column;
    span {
      color: #2065a0;
    }
  }
  .LoanCard-action {
    position: absolute;
    top: 0;
    right: 0;
    button {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      background-color: #f97373;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

`;

const LoanList = () => {
  const {loans, dispatch} = useContext(LoanContext);

  function deleteLoan(e, id) {
    e.preventDefault();
    dispatch({type: 'REMOVE_LOANS', id: id})
  }
  
  return ( 
    <Wrapper>
      <List>
        {
          loans.map((loan, index) => {
            return (
              <Link className="LoanCard" to={'/listado/'+loan.id} key={loan.id}>
                <div className="LoanCard-text" >
                  <b>ID: {loan.id}, {loan.name}</b>
                  <b>Monto del préstamo: <span>{loan.currency}{formatNumber(loan.amount, 2)}</span></b>
                  <b>Tasa Anual: <span>{loan.rate}%</span></b>
                  <b>Años: <span>{loan.years}</span></b>
                  <b>Pago Mensual: <span>{loan.currency}{formatNumber(loan.pmt_rounded, 2)}</span></b>
                </div>
                <div className="LoanCard-action">
                  <Button onClick={(e) => deleteLoan(e, loan.id)} type="button"><AiOutlineDelete/></Button>
                </div>
              </Link>
            );
          })
        }
      </List>
    </Wrapper>
   );
}
 
export default LoanList;