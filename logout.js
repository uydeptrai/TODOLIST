var logout = document.getElementById('logoutbutton');

logout.addEventListener('click', function(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    localStorage.removeItem('name');
    localStorage.removeItem('password');

    console.log('alo123');

    window.location.href = 'index.html';


}
,false
)