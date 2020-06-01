export default ()=> {
    // return jwt token from localstorage
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user &&  user.user.token) {
        return { 'Authorization': 'Token ' + user.user.token };
    } else {
        return {};
    }
}