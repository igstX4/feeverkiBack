import {createSlice} from '@reduxjs/toolkit'

const MAX_QUANTITY = 5

const basketSlice = createSlice({
    name: 'basket',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const {_id, title, quantity, price, oldPrice, img} = action.payload
            const existingItem = state.find(item => item._id === _id)
            
            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity
                if (newQuantity <= MAX_QUANTITY) {
                    existingItem.quantity = newQuantity
                    existingItem.totalPrice = existingItem.price * existingItem.quantity
                }
            } else {
                state.push({
                    _id,
                    title,
                    totalPrice: price * quantity,
                    quantity,
                    img,
                    price,
                    oldPrice,
                    totalQuantity: MAX_QUANTITY
                })
            }
        },
        changeQuantity(state, action) {
            const {_id, func} = action.payload
            const item = state.find(item => item._id === _id)
            
            if (item) {
                if (func === "+") {
                    if (item.quantity < MAX_QUANTITY) {
                        item.quantity += 1
                        item.totalPrice = item.price * item.quantity
                    }
                } else if (func === "-") {
                    if (item.quantity > 1) {
                        item.quantity -= 1
                        item.totalPrice = item.price * item.quantity
                    }
                }
            }
        },
        deleteFromCart(state, action) {
            const { _id } = action.payload;
            return state.filter(item => item._id !== _id);
        },
        clearCart(state, action) {
            return state = []
        }
    },
})

export const {addToCart, changeQuantity, deleteFromCart, clearCart} = basketSlice.actions
export default basketSlice.reducer