import http from "../http-common";

const getAll = () => {
    return http.get("/books");
};

const update = (id, title) => {
    return http.put(`/books/${id}`, {title: title});
};

const BookService = {
    getAll,
    update
};

export default BookService;