class Http {
  url = null

  token = '12bb0bd74a1325995f107d5f77a4a8ae'

  constructor(config) {
    this.url = config.url
  }

  get headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: this.token
    }
  }

  async get(endpoint, query = {}) {
    const url = new URL(endpoint, this.url)

    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    const response = await fetch(url.toString(), { headers: this.headers })

    return response.json()
  }
}

export default new Http({
  url: 'https://msk.ivanor.ru'
})
