import { Provider } from 'react-redux';
import { App } from 'next/app';
import store from './store';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;