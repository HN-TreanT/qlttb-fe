import CreateApiService from "../createApiService";

const api = CreateApiService();

const get = (page: Number, size: Number, search: any) => {
  return api.makeRequest({
    url: `/api/actor?page=${page}&size=${size}&search=${search}`,
    method: "GET",
  });
};

const getById = (id: Number) => {
  return api.makeRequest({
    url: `/api/actor/${id}`,
    method: "GET",
  });
};

const create = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/actor/create",
    method: "POST",
    data: data,
  });
};

const update = (id: Number, data: any) => {
  return api.makeAuthRequest({
    url: `/api/actor/${id}`,
    method: "PUT",
    data: data,
  });
};

const deleteById = (id: Number) => {
  return api.makeAuthRequest({
    url: `/api/actor/${id}`,
    method: "DELETE",
  });
};

export const canboServices = {
  get,
  getById,
  create,
  update,
  deleteById,
};
