import CreateApiService from "../createApiService";

const api = CreateApiService();

const get = (params: any) => {
  return api.makeAuthRequest({
    url: `/api/lich-hoc`,
    method: "GET",
    params: params
  });
};

const getById = (id: Number) => {
  return api.makeAuthRequest({
    url: `/api/lich-hoc/${id}`,
    method: "GET",
  });
};

const create = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/lich-hoc",
    method: "POST",
    data: data,
  });
};

const importExcel = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/lich-hoc/import-excel",
    method: "POST",
    data: data,
  });
};

const update = (id: Number, data: any) => {
  return api.makeAuthRequest({
    url: `/api/lich-hoc/${id}`,
    method: "PUT",
    data: data,
  });
};

const deleteById = (id: Number) => {
  return api.makeAuthRequest({
    url: `/api/lich-hoc/${id}`,
    method: "DELETE",
  });
};

export const lichhoctapServices = {
  get,
  getById,
  create,
  update,
  deleteById,
  importExcel
};
