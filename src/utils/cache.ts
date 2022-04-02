class LocalCache {
  setCache(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val))
  }

  getCache(key: string) {
    const val = window.localStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
