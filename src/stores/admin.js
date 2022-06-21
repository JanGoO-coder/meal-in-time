import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export const useAdminStore = defineStore({
  id: 'admin',
  state: () => ({
    user: {
      uid: null,
      email: null,
      displayName: null
    },
    loading: false
  }),
  actions: {
    setToken() {
      window.localStorage.setItem('token', this.user.uid)
      window.localStorage.setItem('name', this.user.displayName)
      window.localStorage.setItem('email', this.user.email)
    },
    getToken() {
      this.user.uid = window.localStorage.getItem('token')
      this.user.displayName = window.localStorage.getItem('name')
      this.user.email = window.localStorage.getItem('email')
    },
    removeToken() {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('email')
    },
    async signin(email, password) {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          this.user.uid = user.uid
          this.user.email = user.email
          this.user.displayName = user.email.split('@')[0]
          this.setToken()
          this.loading = false
          this.$router.push({ path: '/' })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
        })
    },
    async checkAuth(pathStr) {
      const auth = getAuth()
      this.getToken()
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.uid = user.uid
          this.user.email = user.email
          this.user.displayName = user.email.split('@')[0]
          this.setToken()
          this.loading = false
          this.$router.push({ path: pathStr })
        } else {
          this.removeToken()
          this.loading = false
          this.$router.push({ path: '/signin' })
        }
      })
    },
    logout() {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.removeToken()
        window.location.reload()
      }).catch((error) => {
        console.log(error)
      })
    }
  }
})
