import CreateApiService from "../createApiService";

const api = CreateApiService();

const get = (params: any) => {
  return api.makeAuthRequest({
    url: `/api/lop`,
    method: "GET",
    params: params
  });
};

const getById = (id: Number) => {
  return api.makeAuthRequest({
    url: `/api/lop/${id}`,
    method: "GET",
  });
};

const create = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/lop",
    method: "POST",
    data: data,
  });
};

const update = (id: Number, data: any) => {
  return api.makeAuthRequest({
    url: `/api/lop/${id}`,
    method: "PUT",
    data: data,
  });
};

const deleteById = (id: Number) => {
  return api.makeAuthRequest({
    url: `/api/lop/${id}`,
    method: "DELETE",
  });
};

export const lopServices = {
  get,
  getById,
  create,
  update,
  deleteById,
};
