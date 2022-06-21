import { defineStore } from 'pinia'
import { firebaseapp } from '../firebase'
import { getFirestore, doc, collection, getDocs, deleteDoc } from "firebase/firestore"

export const useCustomerStore = defineStore({
    id: 'customer',
    state: () => ({
        customers: [],
        loading: false
    }),
    actions: {
        async fetchCustomers() {
            this.loading = true
            this.customers = []

            const db = getFirestore(firebaseapp)
            const querySnapshot = await getDocs(collection(db, "user"));
            querySnapshot.forEach((doc) => {
                this.customers.push({
                    'key': doc.id,
                    'data': doc.data()
                })
            })

            this.loading = false
        },
        async deleteCustomer(uid) {
            this.loading = true
            this.customers = []

            const db = getFirestore(firebaseapp)
            await deleteDoc(doc(db, 'user', uid))

            this.$router.go()
            this.loading = false
        }
    }
})
