import { Provider } from "react-redux";
import { App } from "next/app";
// import store from 'store';
import { createStore } from "redux";

const initialState = {
  requestBody: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_REQUEST_BODY":
      return { ...state, requestBody: action.payload };
    default:
      return state;
  }
}



const store = createStore(reducer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
