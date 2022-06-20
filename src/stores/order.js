import { defineStore } from 'pinia'
import { firebaseapp } from '../firebase'
import { getFirestore, doc, collection, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore"

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        tableBookingOrders: [],
        takeAwayOrders: [],
        loading: false
    }),
    actions: {
        async readTableBookingOrdersData() {
            this.loading = true
            this.tableBookingOrders = []
            const db = getFirestore(firebaseapp)
            const querySnapshot = await getDocs(collection(db, "tableBookingOrder"));
            querySnapshot.forEach((doc) => {
                this.tableBookingOrders.push({
                    'key': doc.id,
                    'data': doc.data()
                })
            })
            this.loading = false
        },
        async readTakeAwayOrdersData() {
            this.loading = true
            this.takeAwayOrders = []
            const db = getFirestore(firebaseapp)
            const querySnapshot = await getDocs(collection(db, "takeAwayOrders"));
            querySnapshot.forEach((doc) => {
                this.takeAwayOrders.push({
                    'key': doc.id,
                    'data': doc.data()
                })
            })
            this.loading = false
        },
        async updateTakeAwayOrderStatus(orderId, status) {
            this.loading = true
            const db = getFirestore(firebaseapp)
            await updateDoc(doc(db, "takeAwayOrders", orderId), {
                orderStatus: '' + status
            })
            this.loading = false
        },
        async updateTableBookingOrderStatus(orderId, status) {
            this.loading = true
            const db = getFirestore(firebaseapp)
            await updateDoc(doc(db, "tableBookingOrder", orderId), {
                orderStatus: '' + status
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
