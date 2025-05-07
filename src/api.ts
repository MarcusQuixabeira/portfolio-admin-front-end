const BASE_API_URL = 'http://localhost:8000/api/v1'

class APIHandler {
  apiBaseUrl = BASE_API_URL

  get(url: string): Promise<Response> {
    return fetch(`${this.apiBaseUrl}${url}`)
  }
  
  post(data: object, url: string): Promise<Response> {
    return fetch(
      `${this.apiBaseUrl}${url}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
  }

  patch(data: object, url: string): Promise<Response> {
    return fetch(
      `${this.apiBaseUrl}${url}`,
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
  }

  delete(url: string): Promise<Response> {
    return fetch(`${this.apiBaseUrl}${url}`, { method: 'DELETE'})
  }

}

const ApiHandler = new APIHandler()

export default ApiHandler