import './App.css';
import Products from './components/Products';
import AddProducts from './components/AddProducts';
import { wrapper } from "./redux/stores/mainStore";
import { useDispatch, useStore } from "react-redux";
import { getProductsInBackend } from "./redux/actions/productAction";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsInBackend());
  }, []);

  return (
    <div className="gateway-test-app">
      <header className="app-header">
        <h1 className="app-title">Gateway App Test</h1>
      </header>
      <br />
      <div className="container pt-5">
        <AddProducts />
        <br />
        <Products />
      </div>
    </div>
  );
}

export default wrapper.withRedux(App);
