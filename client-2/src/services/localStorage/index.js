import config from '../../config';

/**
 * Get an object of key-value pairs and set their values to local storage
 * @param {obj} key string value to be used as key
 * @param {str} value string value of key to be stored
 * @returns {null} null
 */
export const setStorageItem = (key, value) => {
  localStorage.setItem(`${config.appKey}-${key}`, JSON.stringify(value));
};

/**
 * Get an object of key-value pairs and set their values to local storage
 * @param {obj} items
 * @returns {null} null
 */
export const setStorageItems = (items) => {
  Object.entries(items).forEach(([key, value]) => {
    setStorageItem(key, value);
  });
};

const isJson = (item) => {
  try {
    JSON.parse(item);
    return true;
  } catch (error) {
    return false;
  }
};
/**
 * Get a string assuch from local storage
 * @param {str} key
 * @returns {str} string from local storage
 */
export const getStorageItem = (key) => {
  try {
    const itemFromStorage = localStorage.getItem(`${config.appKey}-${key}`);
    return isJson(itemFromStorage) ? JSON.parse(itemFromStorage) : itemFromStorage;
  } catch (error) {
    return null;
  }
};

/**
 * Get multiple storage items
 * @param {array} keys array of keys to find
 * @returns {obj} object of values for specified keys
 */
export const getStorageItems = (keys) => {
  const values = {};

  keys.forEach((key) => {
    values[key] = getStorageItem(key);
  });

  return values;
};

export default setStorageItem;
