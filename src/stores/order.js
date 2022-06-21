import { defineStore } from 'pinia'
import { firebaseapp } from '../firebase'
import { getFirestore, doc, collection, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { useTableStore } from './table'

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
            this.$router.push({ path: '/' })
            setTimeout(() => {
                this.$router.push({ path: '/' + status.toLowerCase() + '-orders' })
            }, 500)
        },
        async updateTableBookingOrderStatus(orderId, tableId, status) {
            this.loading = true
            const db = getFirestore(firebaseapp)
            await updateDoc(doc(db, "tableBookingOrder", orderId), {
                orderStatus: '' + status
            })

            if (status.toLowerCase() == 'completed' || status.toLowerCase() == 'cancelled') {
                console.log(tableId)
                await updateDoc(doc(db, "table", tableId), {
                    available: false
                })
            }

            this.loading = false
            this.$router.push({ path: '/' })
            setTimeout(() => {
                this.$router.push({ path: '/' + status.toLowerCase() + '-orders' })
            }, 500)
        }
    }
})
