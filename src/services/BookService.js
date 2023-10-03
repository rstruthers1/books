import http from "../http-common";

const getAll = () => {
    return http.get("/books");
};

const get = (id) => {
    return http.get(`/books/${id}`);
};

const create = title => {
    return http.post("/books", {title});
};

const remove = id => {
    return http.delete(`/books/${id}`);
};

const update = (id, title) => {
    return http.put(`/books/${id}`, {title: title});
};

const uploadImage = (id, imageFormData) => {
    return http.post(`/books/${id}/image`, imageFormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const BookService = {
    getAll,
    get,
    create,
    remove,
    update,
    uploadImage
};

export default BookService;
