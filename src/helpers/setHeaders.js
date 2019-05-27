export const setHeaders = (headers) => {
    if(localStorage.jwtToken) {
        return {
            ...headers,
            'Authorization': `Bearer ${localStorage.jwtToken}`
        }
    } else {
        return headers;
    }
}

export const parseFormData = (values) => {
    let formData = new FormData();
    Object.keys(values).forEach((key) =>{
        formData.append(key,values[key]);
    });
    return formData;
}