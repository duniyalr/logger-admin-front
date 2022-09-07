export const qoToqs = (qo) => {
  const queryString = Object.entries(qo).map(([key, value]) => `${key}=${value}`).join("&");
  return queryString ? "?" + queryString : "";
}