import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styled";

const List = styled.section`
  display: flex;
  list-style: none;
  justify-content: center;
  li {
    display: inline-flex;
  }
  a {
    text-decoration: none;
    color: #b59cb7;
    font-weight: bold;
    margin: 0 1em;
    font-size: 0.8em;
  }
  button {
    width: 250px;
    background: #2065a0;
  }
  @media (max-width: 768px) {
    font-size: 0.9em;
    button {
      width: auto;
      background: #2065a0;
    }
  }
`;

const Navbar = () => {
  return (
    <List>
      <li>
        <Link to="/">
          <Button>Calcular nuevo préstamo</Button>
        </Link>
      </li>
      <li>
        <Link to="/listado">
          <Button>Mis préstamos</Button>
        </Link>
      </li>
    </List>
  );
};

export default Navbar;
