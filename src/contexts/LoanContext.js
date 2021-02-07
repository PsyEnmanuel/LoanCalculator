import React, { createContext, useReducer, useEffect } from "react";

export const LoanContext = createContext();

const LoanReducer = (state, action) => {
  let loans;
  switch (action.type) {
    case "SET_LOANS":
      console.log(action.loans);
      return action.loans
    case "ADD_LOANS":
      loans = [
        ...state,
        action.loan,
      ];
      localStorage.setItem("loans", JSON.stringify(loans));
      return loans;
    case "REMOVE_LOANS":
      loans = state.filter((loan) => loan.id !== action.id);
      localStorage.setItem("loans", JSON.stringify(loans));
      return loans;
    default:
      return state;
  }
};

const LoanContextProvider = (props) => {
  const [loans, dispatch] = useReducer(LoanReducer, []);

  useEffect(() => {
    
    if(localStorage.getItem("loans")) {
      dispatch({type: "SET_LOANS", loans: JSON.parse(localStorage.getItem("loans"))})
    }
  }, []);

  return (
    <LoanContext.Provider
      value={{
        loans,
        dispatch,
      }}
    >
      {props.children}
    </LoanContext.Provider>
  );
};

export default LoanContextProvider;
