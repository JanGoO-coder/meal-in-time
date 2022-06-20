import { defineStore } from 'pinia'
import { firebaseapp } from '../firebase'
import { getFirestore, doc, collection, getDocs, addDoc, setDoc, deleteDoc } from "firebase/firestore"

export const useTableStore = defineStore({
    id: 'table',
    state: () => ({
        tables: [],
        loading: false
    }),
    actions: {
        async readTablesData() {
            this.loading = true
            this.tables = []
            const db = getFirestore(firebaseapp)
            const querySnapshot = await getDocs(collection(db, "table"));
            querySnapshot.forEach((doc) => {
                this.tables.push({
                    'key': doc.id,
                    'data': doc.data()
                })
            })
            this.loading = false
        },
        async addNewTableData(data) {
            const db = getFirestore(firebaseapp)
            await addDoc(collection(db, "table"), {
                tNo: data.tNo,
                seat: data.seat,
                available: data.available
            })
            this.loading = false
            this.$router.push({ path: '/tables' })
        },
        async removeTableData(tid) {
            const db = getFirestore(firebaseapp)
            await deleteDoc(doc(db, 'table', tid))
            this.loading = false
            this.$router.push({ path: '/tables' })
        },
        async editTableData(tid, data) {
            const db = getFirestore(firebaseapp)
            await setDoc(doc(db, "table", tid), {
                tNo: data.tNo,
                seat: data.seat,
                available: data.available
            })
            this.loading = false
            this.$router.push({ path: '/tables' })
        }
    }
})
