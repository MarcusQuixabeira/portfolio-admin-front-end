const BASE_API_URL = import.meta.env.VITE_API_BASE_URL

class APIHandler {
  apiBaseUrl = BASE_API_URL

  auth(data: FormData, url: string): Promise<Response> {
    return fetch(
      `${this.apiBaseUrl}${url}`,
      {
        method: 'POST',
        body: data
      }
    )
  }

  get(url: string): Promise<Response> {
    const token = window.localStorage.getItem('auth_token')
    return fetch(
      `${this.apiBaseUrl}${url}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      } 
    )
  }

  post(data: object, url: string): Promise<Response> {
    const token = window.localStorage.getItem('auth_token')
    return fetch(
      `${this.apiBaseUrl}${url}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
  }

  patch(data: object, url: string): Promise<Response> {
    const token = window.localStorage.getItem('auth_token')
    return fetch(
      `${this.apiBaseUrl}${url}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
  }

  delete(url: string): Promise<Response> {
    const token = window.localStorage.getItem('auth_token')
    return fetch(
      `${this.apiBaseUrl}${url}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )
  }

}

const ApiHandler = new APIHandler()

export default ApiHandler