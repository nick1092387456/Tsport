//We also have methods for retrieving data from server. In the case we access protected resources, the HTTP request needs Authorization header.

export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user && user.accessToken) {
    return { Authorization: 'x-access-token ' + user.accessToken }
  } else {
    return {}
  }
}
