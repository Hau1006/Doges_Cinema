export const getAcessToken = () => {
    const data = localStorage.getItem('userInfo')
    if(data) return JSON.parse(data).accessToken
    else return undefined
}