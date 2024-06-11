import {createSlice} from '@reduxjs/toolkit'

const basketSlice = createSlice({
    name: 'basket',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const {_id, title, quantity, price, img, totalQuantity} = action.payload
            state.push({
                _id,
                title,
                totalPrice: price,
                quantity,
                img,
                price,
                totalQuantity
            })
        },
        changeQuantity(state, action) {
            const {_id, func} = action.payload
            const item = state.find(item => item._id === _id)

            if (func === "+" && item.quantity <= +item.totalQuantity) {
                item.quantity += 1
                item.totalPrice += item.price
            } else {
                item.quantity -= 1
                item.totalPrice -= item.price
            }
            if (item.quantity === 0) {
                state.splice(item, 1);
            }
        },
        deleteFromCart(state, action) {
            const { _id } = action.payload;
            return state.filter(item => item._id !== _id);
        }
    },
})

export const {addToCart, changeQuantity, deleteFromCart} = basketSlice.actions
export default basketSlice.reducer