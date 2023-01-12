import { Provider } from "react-redux";
import { App } from "next/app";
import store from '/pages/store.js';
// import { createStore } from "redux";


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
