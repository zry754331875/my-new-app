export default k_fetch = async (url,params)=>{
    try {
        let response = await fetch('http://oayj.yong-gang.cn:8080/innovate-api/v1/mail/message?'+'account=033216&folder='+folder+'&page='+current+'&rows='+pageSize+'&searchValue=',{
        method:'GET',
        headers:{
            'X-Innovate-Rsbm':'4CEE735A-E182-4D8A-85C8-90B3774AFF2F',
            'X-Innovate-Application':'OA'
        },
        credentials:'include',
    })

    let json = await response.json()

    return json

    } catch (error) {
        return error
        console.error(error)
    }
}