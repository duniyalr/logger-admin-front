export const qoToqs = (qo) => {
  return Object.entries(qo).map(([key, value]) => `${key}=${value}`).join("&");
}