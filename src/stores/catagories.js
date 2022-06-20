import { defineStore } from 'pinia'
import { firebaseapp } from '../firebase'
import { getFirestore, doc, collection, getDocs, addDoc, setDoc, deleteDoc } from "firebase/firestore"

export const useCatagoryStore = defineStore({
    id: 'catagroy',
    state: () => ({
        catagroies: [],
        loading: false
    }),
    actions: {
        async readCatagoryData() {
            this.loading = true
            this.menu = []
            const db = getFirestore(firebaseapp)
            const querySnapshot = await getDocs(collection(db, "foodCategories"));
            querySnapshot.forEach((doc) => {
                this.catagroies.push({
                    'key': doc.id,
                    'data': doc.data()
                })
            })

            this.loading = false
        },
        async addNewCatagoryItem(cName) {
            const db = getFirestore(firebaseapp)
            await addDoc(collection(db, "foodCategories"), {
                categoryName: cName
            })
            this.loading = false
            this.$router.push({ path: '/' })
            setTimeout(() => {
                this.$router.push({ path: '/catagories' })
            }, 100)
        },
        async removeCatagoryItem(cid) {
            const db = getFirestore(firebaseapp)
            await deleteDoc(doc(db, 'foodCategories', cid))
            this.loading = false
            this.$router.push({ path: '/' })
            setTimeout(() => {
                this.$router.push({ path: '/catagories' })
            }, 500)
        },
        async editCatagoryItem(cid, cName) {
            const db = getFirestore(firebaseapp)
            await setDoc(doc(db, "foodCategories", cid), {
                categoryName: cName
            })
            this.loading = false
            this.$router.push({ path: '/' })
            setTimeout(() => {
                this.$router.push({ path: '/catagories' })
            }, 500)
        }
    }
})
