const storage = {
  saveItem(key, value) {
    localStorage.setItem(key,value);
  },
  getItem(key) {
    return localStorage.getItem(key);
  },
  deleteItem(key) {
    localStorage.removeItem(key);
  },
}

export default storage;