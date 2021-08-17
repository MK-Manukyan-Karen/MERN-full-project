import * as axios from 'axios';



let instance = axios.create({
    baseURL: "http://localhost:5000/labarna/",

    // withCredentials : true ,
})


export const authAPI = {

    postAuthRegsterData(userName, email, password) {

        return instance.post(`auth/register`, {
            userName: userName,
            email: email,
            password: password,
        })
    },
    postAuthLoginData(email, password, rememberMe = false) {

        return instance.post(`auth/login`, {
            email: email,
            password: password,
            rememberMe: rememberMe,
        }).then((response) => {
            localStorage.setItem('jwtToken', response.data.token)
            return response
        })
            .catch((error) => error.response)

    },
    deleteAuthLoginData() {
        return instance.delete(`auth/login`, { headers: { "Authorization": localStorage.getItem('jwtToken') } })
            .then((response) => {
                localStorage.clear()
                return response;
            })
            .catch((error) => error)
    },
    getMyProfile() {

        return instance.get(`auth/me`, { headers: { "Authorization": localStorage.getItem('jwtToken') } })
            .then((response) => response)
            .catch((error) => error)
    },

}


export const profileAPI = {

    updateProfilPhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.patch(`auth/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": localStorage.getItem('jwtToken')
            }
        })
    },

    updateUserName(newUserName) {
        return instance.patch(`auth/profile/userName`, { userName: newUserName },
            { headers: { "Authorization": localStorage.getItem('jwtToken') } })
    },
}

export const productsAPI = {
    getProducts(currentPage, pageSize) {
        return instance.get(`products?page=${currentPage}&limit=${pageSize}`)
    },
}

export const ordersAPI = {
    setOrders(newOrders,totalPrice) {
        return instance.post(`/orders`,{newOrders,totalPrice}, { headers: { "Authorization": localStorage.getItem('jwtToken') } })
    },

    getOrders(currentPage,pageSize) {
        return instance.get(`orders/history?page=${currentPage}&limit=${pageSize}`,
                            { headers: { "Authorization": localStorage.getItem('jwtToken') } })
    },

    removeAllhistory(){
        return instance.delete(`/orders/history`,
                      { headers: { "Authorization": localStorage.getItem('jwtToken') } })
    },

    removeOneOrder(id){
        return instance.delete(`/orders/history/${id}`,
                      { headers: { "Authorization": localStorage.getItem('jwtToken') } })
    },
    getOrdersByDate(currentPage,pageSize,orderDate) {

        return instance.get(`orders/history/searchOrders/date?ordersDate=${orderDate}&page=${currentPage}&limit=${pageSize}`,
                            { headers: { "Authorization": localStorage.getItem('jwtToken')} },
                            )
                          
                    
    },

    getOrdersByPrice(currentPage,pageSize,orderPrice) {
         
        return instance.get(`orders/history/searchOrders/price?start=${orderPrice.start}&end=${orderPrice.end}&page=${currentPage}&limit=${pageSize} `,
                            { headers: { "Authorization": localStorage.getItem('jwtToken')} },
                            )
                   
                    
    },

   
}








