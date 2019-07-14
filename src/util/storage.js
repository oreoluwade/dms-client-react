export const clearStorage = () => {
  for (let item in localStorage) {
    if (item.startsWith('dms-apolap-')) {
      localStorage.removeItem(item);
    }
  }
};

export const addToStorage = values => {
  Object.entries(values).forEach(item => {
    localStorage.setItem(`dms-apolap-${item[0]}`, item[1]);
  });
};

export const getFromStorage = key => localStorage.getItem(key);
