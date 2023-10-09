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
import AlbumCreate from "./components/album/AlbumCreate";
import HomePage from "./components/HomePage";
import AlbumUpdate from "./components/album/AlbumUpdate";
import BookUpdate from "./components/book/BookUpdate";
import VideoInventory from "./components/video/VideoInventory";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <RouterErrorPage/>,

        children: [
            { path: "", element: <HomePage/> },
            {
                path: "books",
                element: <BookInventory/>,
            },
            {
                path: "books/create",
                element: <BookCreate/>,
            },
            {
                path: "books/update/:id",
                element: <BookUpdate/>
            },
            {
                path: "albums",
                element: <AlbumInventory/>,
            },
            {
                path: "albums/create",
                element: <AlbumCreate/>
            },
            {
                path: "albums/update/:id",
                element: <AlbumUpdate/>
            },
            {
                path: "videos",
                element: <VideoInventory/>,
            }
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

