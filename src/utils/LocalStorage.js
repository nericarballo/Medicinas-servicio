const Post = (key, value) => {
  localStorage.setItem(key, value);
};

const Get = (key) => {
  const res = localStorage.getItem(key);

  return res;
};

const Delete = (key) => {
  localStorage.removeItem(key);
};

export const LocalStorage = {
  Post,
  Get,
  Delete,
};
