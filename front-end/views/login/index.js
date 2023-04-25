const loginForm = document.querySelector("#login-form")

loginForm.addEventListener("submit", formSubmit);

function formSubmit(e) {
    e.preventDefault();
    const id = document.querySelector("#id");
    const pw = document.querySelector("#password");
    login(id,pw)
    console.log("complete")
}

async function login(id,pw){
    try{
        const response = fetch("/api/user/login", {
            method: "POST", 
            body: JSON.stringify({
                id: id,
                pw: pw,
            }),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token)
        //로그인 완료 후 토큰까지 넣었으니 다른 페이지 랜딩 
    } catch(e) {
        console.log("error msg: ", e)
    }
}