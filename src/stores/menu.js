import { defineStore } from 'pinia'
import { firebaseapp } from '../firebase'
import { getFirestore, doc, collection, getDocs, addDoc, setDoc, deleteDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export const useMenuStore = defineStore({
    id: 'menu',
    state: () => ({
        menu: [],
        image: '',
        loading: false
    }),
    actions: {
        async readMenuData() {
            this.loading = true
            this.menu = []
            const db = getFirestore(firebaseapp)
            const querySnapshot = await getDocs(collection(db, "menuItems"));
            querySnapshot.forEach((doc) => {
                this.menu.push({
                    'key': doc.id,
                    'data': doc.data()
                })
            })
            this.loading = false
        },
        async uploadImage(file) {
            const storage = getStorage()
            const storageRef = ref(storage, `image-${Date.now()}-${file.name}`)

            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    this.image = url
                    this.loading = false
                })
            })
        },
        async addNewMenuItem(data) {
            const db = getFirestore(firebaseapp)
            await addDoc(collection(db, "menuItems"), {
                itemName: data.title,
                imageSrc: data.image,
                category: data.catagory,
                price: data.price,
                description: data.detail
            })
            this.loading = false
            this.image = ''
            this.$router.push({ path: '/menu' })
        },
        async removeMenuItem(itemid) {
            console.log(itemid)
            const db = getFirestore(firebaseapp)
            await deleteDoc(doc(db, 'menuItems', itemid))
            this.loading = false
            this.$router.push({ path: '/menu' })
        },
        async editMenuItem(pid, data) {
            console.log(pid, data)
            const db = getFirestore(firebaseapp)
            await setDoc(doc(db, "menuItems", pid), {
                itemName: data.title,
                imageSrc: data.image,
                catagory: data.catagory,
                price: data.price,
                description: data.detail
            })
            this.loading = false
            this.$router.push({ path: '/menu' })
        }
    }
})
