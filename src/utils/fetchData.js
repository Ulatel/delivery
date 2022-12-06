export default async function(url = '', data = {}, method = 'POST'){
    const response = await fetch(url, {
        method: method,
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("movieToken")}`,
        },
        redirect: 'follow',
        body: method == 'GET' ? undefined : JSON.stringify(data),
    });
    
    if (response.status === 401){
        localStorage.removeItem('movieToken');
        window.location = '/login';
    }
    
    try {
        return await response.json();
    } catch (e) {
        return {};
    }
}