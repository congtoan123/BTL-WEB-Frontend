import Book from "./components/Book";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import BookDetail from "./components/Bookdetail";
import Order from "./components/Order";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/book/:id">
            <BookDetail></BookDetail>
          </Route>
          <Route path="/Order">
            <Order></Order>
          </Route>
          <Route path="/">
            <Book></Book>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
