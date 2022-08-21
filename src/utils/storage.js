import config from "../config";

export default {
  // 设置和取值的 api 保持和 storage 一样 
  setItem (key, val) {
    const storage = this.getStorage()
    storage[key] = val
    // 将值放入命名空间中
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getItem (key) {
    return this.getStorage()[key]
  },
  getStorage () {
    return JSON.parse(window.localStorage.getItem(config.namespace) || "{}")
  },
  clearItem (key) {
    const storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll () {
    window.localStorage.clear()
  }
}
