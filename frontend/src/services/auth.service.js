import axios from 'axios'
const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  async login(user) {
    const res = await axios.post(API_URL + 'signin', {
      name: user.name,
      password: user.password,
    })
    if (res.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
  }
  logout() {
    localStorage.removeItem('user')
  }
  register(user) {
    return axios.post(API_URL + 'signup', {
      name: user.name,
      email: user.email,
      password: user.password,
    })
  }
}

export default new AuthService()
