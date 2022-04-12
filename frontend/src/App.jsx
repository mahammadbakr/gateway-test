import './App.css';
import Products from './Products';
import AddProducts from './AddProducts';
import { wrapper } from "./redux/stores/mainStore";

function App() {

  return (
    <div className="gateway-test-app">
      <header className="app-header">
        <h1 className="app-title">Gateway App Test</h1>
      </header>
      <div className="container pt-5">
        <AddProducts />
        <Products products={"list products"} />
      </div>
    </div>
  );
}

export default wrapper.withRedux(App);
