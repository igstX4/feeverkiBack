import {createSlice} from '@reduxjs/toolkit'

const basketSlice = createSlice({
    name: 'basket',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const {_id, title, quantity, price, oldPrice, img, totalQuantity} = action.payload
            state.push({
                _id,
                title,
                totalPrice: price,
                quantity,
                img,
                price,
                oldPrice,
                totalQuantity
            })
        },
        changeQuantity(state, action) {
            const {_id, func} = action.payload
            const item = state.find(item => item._id === _id)

            if (func === "+" && item.quantity <= +item.totalQuantity) {
                item.quantity += 1
                item.totalPrice = item.price * item.quantity
            } else if (item.quantity > 1) {
                item.quantity -= 1
                item.totalPrice = item.price * item.quantity
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