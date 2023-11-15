import CreateApiService from "../createApiService";

const api = CreateApiService();

const get = (params: any) => {
    return api.makeAuthRequest({
        url: `/api/loai-ttb`,
        method: "GET",
        params: params
    });
};

const getById = (id: Number) => {
    return api.makeAuthRequest({
        url: `/api/loai-ttb/${id}`,
        method: "GET",
    });
};

const create = (data: any) => {
    return api.makeAuthRequest({
        url: "/api/loai-ttb",
        method: "POST",
        data: data,
    });
};

const update = (id: Number, data: any) => {
    return api.makeAuthRequest({
        url: `/api/loai-ttb/${id}`,
        method: "PUT",
        data: data,
    });
};

const deleteById = (id: Number) => {
    return api.makeAuthRequest({
        url: `/api/loai-ttb/${id}`,
        method: "DELETE",
    });
};

export const loaittbServices = {
    get,
    getById,
    create,
    update,
    deleteById,
};
