import CreateApiService from "../createApiService";

const api = CreateApiService();

const get = (params: any) => {
    return api.makeAuthRequest({
        url: `/api/trang-thiet-bi`,
        method: "GET",
        params: params
    });
};

const getById = (id: Number) => {
    return api.makeAuthRequest({
        url: `/api/trang-thiet-bi/${id}`,
        method: "GET",
    });
};

const create = (data: any) => {
    return api.makeAuthRequest({
        url: "/api/trang-thiet-bi",
        method: "POST",
        data: data,
    });
};

const update = (id: Number, data: any) => {
    return api.makeAuthRequest({
        url: `/api/trang-thiet-bi/${id}`,
        method: "PUT",
        data: data,
    });
};

const deleteById = (id: Number) => {
    return api.makeAuthRequest({
        url: `/api/trang-thiet-bi/${id}`,
        method: "DELETE",
    });
};

export const TrangthietbiServices = {
    get,
    getById,
    create,
    update,
    deleteById,
};
