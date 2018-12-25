export const getItem = key => localStorage.getItem(key);

export const clearCredentials = () => {
  localStorage.clear();
};

export default (details) => {
  Object.keys(details).forEach((key) => {
    localStorage.setItem(key, details[key]);
  });
};
