import "./App.css";
import { Title, BodyBox } from "./styled";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// components
import LoanDetail from "./components/LoanDetail";
import LoanPersonal from "./components/LoanPersonal";
import LoanList from "./components/LoanList";
import Navbar from "./components/Navbar";
// context
import LoanContextProvider from "./contexts/LoanContext";

function App() {
  return (
    <Router>
      <div className="App">
        <LoanContextProvider>
          <header className="App-header">
            <BodyBox>
              <Title>
                <span className="Highlight-character">C</span>alculadora de{" "}
                <span className="Highlight-character">P</span>réstamos{" "}
                <span className="Highlight-character">P</span>ersonales
              </Title>
              <Navbar />
            </BodyBox>
          </header>
          <Switch>
            <Route exact path="/">
              <BodyBox>
                <LoanPersonal />
              </BodyBox>
            </Route>
            <Route exact path="/listado">
              <BodyBox>
                <LoanList />
              </BodyBox>
            </Route>
            <Route path="/listado/:id">
              <BodyBox>
                <LoanDetail />
              </BodyBox>
            </Route>
          </Switch>
        </LoanContextProvider>
      </div>
    </Router>
  );
}

export default App;
