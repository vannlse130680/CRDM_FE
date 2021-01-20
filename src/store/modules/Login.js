import axios from "axios"

export default {
  namespaced: true,
  state: {
    },
  getters: {
    
  },
  actions: {
    _checkLogin(context, obj) {
      return new Promise((resolve, reject) => {
        axios.get(
          'http://localhost:8080/user/check-login',
          {
            params: {
              userName: obj.username,
              userPassword: obj.password
            }
          }
        ).then(response => {
          resolve(response)
        }).catch((e) => {
          reject(e)
        })
      })
    }
  }
}