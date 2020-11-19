const key = "todo";

export const list = () => {
  return JSON.parse(window.localStorage.getItem(key));
};

export const create = () => {
  window.localStorage.setItem(key, JSON.stringify([]));
};

export const drop = () => {
  window.localStorage.removeItem(key);
};

export const insert = () => {};

export const update = () => {};

export const del = () => {};

export const close = () => {};
