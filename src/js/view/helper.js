export const getJSON = async function (url) {
    try {

        const res = await fetch(url)
        const data = await res.json()

        if (!res.ok) throw new Error(`${data.message} ${res.status}`)

        return data;
    } catch (err) {
        throw err;
    }
}

export const sendJSON = async function (url,uploaddata) {
    try{
       const res = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(uploaddata)
       })
       const data = await res.json()

       if(!res.ok) throw new Error(`${data.message}${res.status}`)

       return data;
    }catch(err){
        throw (err)
    }
}