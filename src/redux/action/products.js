import axios from "axios"
import Auth from "../../Auth"
import apiLink from "../../apiLink"

export const setProducts = () => {
    return async (dispatch) => {
        await axios.get(`${apiLink}/product/get`, Auth)
            .then((response) => {
                dispatch({ type: "SET_PRODUCTS", payload: response.data.data })
            })
            .catch((error) => {
                console.log('error in set products', error)
            })
    }
}

export const updateProduct = (obj) => {
    
    let formData = new FormData()
    formData.append('productName', obj.productName)
    formData.append('productImage', obj.productImage)
    formData.append('price', obj.price)
    formData.append('category', obj.category)
    formData.append('shopName', obj.shopName)
    formData.append('mobile', obj.mobile)
    formData.append('discount', obj.discount)
    formData.append('discription', obj.discription)
    formData.append('colors', obj.colors)

    return async (dispatch) => {
        console.log('obj._id in patch api', obj._id)
        await axios.patch(`${apiLink}/product/update?id=${obj._id}`, formData, Auth)
            .then(() => {
                console.log('patch update product done', )
                dispatch(setProducts())
            })
            .catch((error) => {
                console.log('error in update product', error)
            })
    }
}

export const addProduct = (obj) => {
    
    let formData = new FormData()
    formData.append('productName', obj.productName)
    formData.append('productImage', obj.productImage)
    formData.append('price', obj.price)
    formData.append('category', obj.category)
    formData.append('shopName', obj.shopName)
    formData.append('mobile', obj.mobile)
    formData.append('discount', obj.discount)
    formData.append('discription', obj.discription)
    formData.append('colors', obj.colors)

    return async (dispatch) => {
        await axios.post(`${apiLink}/product/add`, formData, Auth)
            .then(() => {
                console.log('add product done', )
                dispatch(setProducts())
            })
            .catch((error) => {
                console.log('error in post add product', error)
            })
    }
}

export const deleteProduct = (obj) => {
    return async (dispatch) => {
        await axios.delete(`${apiLink}/product/delete?id=${obj}`, Auth)
            .then(() => {
                console.log('delete product done', )
                dispatch(setProducts())
            })
            .catch((error) => {
                console.log('error in delete product', error)
            })
        }
    }