const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.querySelector('.btn');
const errorP = document.querySelector('.error');


loginBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(email.value.trim()=="" || password.value.trim()==""){
        errorP.textContent="Email ou mot de passe est vide";
    }else{
        errorP.textContent="";
        let user = {
            "email":email.value, 
            "password":password.value
        }
        fetch("http://localhost:5678/api/users/login",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify(user),
        }).then((response)=>response.json()
        ).then((data)=>{
            if(data.token){
                localStorage.setItem("token", data.token);
                document.location.href="./index.html";
            }else{
                errorP.textContent="Email ou Mot de passe incorrect";
            }
        }).catch((error)=>{
            console.error(error);
        });
    }
});
