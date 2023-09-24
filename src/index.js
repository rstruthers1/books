import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import store from "./app/store";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root";
import RouterErrorPage from "./RouterErrorPage";
import BookInventory from "./components/book/BookInventory";
import AlbumInventory from "./components/album/AlbumInventory";
import BookCreate from "./components/book/BookCreate";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <RouterErrorPage/>,

        children: [
            {
                path: "books",
                element: <BookInventory/>,
            },
            {
                path: "books/create",
                element: <BookCreate/>,
            },
            {
                path: "albums",
                element: <AlbumInventory/>,
            },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

