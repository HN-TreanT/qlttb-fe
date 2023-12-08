import CreateApiService from "../createApiService";

const api = CreateApiService();

const get = (params: any) => {
  return api.makeAuthRequest({
    url: `/api/lich-su-cap-nhat`,
    method: "GET",
    params: params
  });
};

const getById = (id: Number) => {
  return api.makeAuthRequest({
    url: `/api/lich-su-cap-nhat/${id}`,
    method: "GET",
  });
};

const create = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/lich-su-cap-nhat",
    method: "POST",
    data: data,
  });
};

const update = (id: Number, data: any) => {
  return api.makeAuthRequest({
    url: `/api/lich-su-cap-nhat/${id}`,
    method: "PUT",
    data: data,
  });
};

const deleteById = (id: Number) => {
  return api.makeAuthRequest({
    url: `/api/lich-su-cap-nhat/${id}`,
    method: "DELETE",
  });
};

export const lichsucapnhat = {
  get,
  getById,
  create,
  update,
  deleteById,
};
