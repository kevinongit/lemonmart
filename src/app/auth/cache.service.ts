export abstract class CacheService {
  protected getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key)
    console.log(`getItem: key(${key}),data(${data})`)
    if (data != null) {
      return JSON.parse(data)
    }
    return null
  }

  protected setItem(key: string, data: object | string) {
    /// 2020.12.03 kevin - needs to be posted as PR.
    /// It seems a bug, string should be (also) saved through JSON.stringify()
    /// Otherwise, JSON.parse will complain an error while parsing.
    localStorage.setItem(key, JSON.stringify(data))
    // if (typeof data === 'string') {
    //   localStorage.setItem(key, data)
    // } else {
    //   localStorage.setItem(key, JSON.stringify(data));
    // }
  }

  protected removeItem(key: string) {
    localStorage.removeItem(key)
  }

  protected clear() {
    localStorage.clear()
  }
}
