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
            const db = getFirestore(firebaseapp)
            const querySnapshot = await getDocs(collection(db, "tables"));
            querySnapshot.forEach((doc) => {
                this.tables.push({
                    'key': doc.id,
                    'data': doc.data()
                })
                console.log(this.tables[0])
            })
        },
        async addNewTableData(data) {
            const db = getFirestore(firebaseapp)
            await addDoc(collection(db, "tables"), {
                id: data.no,
                seats: data.seats,
                reserved: data.reserved,
                available: data.available
            })
            this.loading = false
            window.location.href = '/tables'
        },
        async removeTableData(tid) {
            const db = getFirestore(firebaseapp)
            await deleteDoc(doc(db, 'tables', tid))
            this.loading = false
            window.location.href = '/tables'
        },
        async editTableData(tid, data) {
            const db = getFirestore(firebaseapp)
            await setDoc(doc(db, "tables", tid.value), {
                id: data.no,
                seats: data.seats,
                reserved: data.reserved,
                available: data.available
            })
            this.loading = false
            window.location.href = '/tables'
        }
    }
})
