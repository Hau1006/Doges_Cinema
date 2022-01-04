export const checkLogin = () => {
   const user = localStorage.getItem('userInfo');
   if (user != null) {
       return JSON.parse(user);
   }
   return null;
}