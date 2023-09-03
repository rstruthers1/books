import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "./context/books";

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(<DevSupport
    ComponentPreviews={ComponentPreviews}
    useInitialHook={useInitial}
>
  <Provider value={5}>
    <App/>
  </Provider>
</DevSupport>)

