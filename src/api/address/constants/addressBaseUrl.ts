const addressBaseUrl = "https://provinces.open-api.vn/api";

export const getListCity = addressBaseUrl + "/p";
export const getDetailCity = (cityCode: number) =>
  addressBaseUrl + "/p/" + cityCode;
export const getDetailDistrict = (districtCode: number) =>
  addressBaseUrl + "/d/" + districtCode;
