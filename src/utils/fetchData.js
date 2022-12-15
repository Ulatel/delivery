import errorParser from "./errorParser";

export default async function(url = '', data = {}, method = 'POST'){
    const response = await fetch(url, {
        method: method,
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("dishToken")}`,
        },
        redirect: 'follow',
        body: method == 'GET' ? undefined : JSON.stringify(data),
    });

    if (response.status === 401){
        localStorage.removeItem('dishToken');
        window.location = '/login';
    }

    if (!response.ok){
        let errors = errorParser(await response.json());
        if(!errors.length)
        throw new Error((response.message) ?? response.statusText);
        else {
            throw new Error(errors.join(","));
        }
    }
    
    try {
        return await response.json();
    } catch (e) {
        return {};
    }
         
    
    
}