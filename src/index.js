import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import store from "./app/store";


const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(<DevSupport
    ComponentPreviews={ComponentPreviews}
    useInitialHook={useInitial}
>
<Provider store={store}>
    <App/>
</Provider>

</DevSupport>)

