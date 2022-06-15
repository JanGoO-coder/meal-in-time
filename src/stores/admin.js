import { defineStore } from 'pinia'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export const useAdminStore = defineStore({
  id: 'admin',
  state: () => ({
    user: {
      uid: null,
      email: null,
      displayName: null
    }
  }),
  actions: {
    async signin(email, password) {
      const auth = getAuth()
      console.log(email, password)
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          this.user.uid = user.uid
          this.user.email = user.email
          this.user.displayName = user.email.split('@')[0]

          return this.user
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
        })
    }
  }
})
