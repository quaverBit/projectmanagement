class ApiNavigation {
  static BASE = 'http://localhost:3000/api/1';
  static AUTH = '/auth';
  static USER_SIGNUP = '/';
  static USER_LOGIN = '/login'

  static userSignup = () => { console.log('a'); return `${ApiNavigation.AUTH}${ApiNavigation.USER_SIGNUP}`};
  static userLogin = () => `${ApiNavigation.AUTH}${ApiNavigation.USER_LOGIN}`;


  static getRoute = (route, params) => {
    return `${ApiNavigation.BASE}${ApiNavigation[route](params)}`
  }

}

export default ApiNavigation;