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
        async addNewCatagoryItem(data) {
            const db = getFirestore(firebaseapp)
            await addDoc(collection(db, "foodCategories"), {
                categoryName: data.categoryName
            })
            this.loading = false
            this.$router.push({ path: '/catagories' })
        },
        async removeCatagoryItem(cid) {
            const db = getFirestore(firebaseapp)
            await deleteDoc(doc(db, 'foodCategories', cid))
            this.loading = false
            this.$router.push({ path: '/catagories' })
        },
        async editCatagoryItem(cid, data) {
            console.log(cid, data)
            const db = getFirestore(firebaseapp)
            await setDoc(doc(db, "foodCategories", pid), {
                categoryName: data.categoryName
            })
            this.loading = false
            this.$router.push({ path: '/catagories' })
        }
    }
})
