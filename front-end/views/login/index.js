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
    try{ //저 api에서 만들어준 토큰을 받아서 token에 저장, 로컬스토리지에 넣어놓음
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

//아마도 마이페이지 로그아웃 버튼에 이벤트 걸어줘야.. 
function logout() {
    localStorage.removeItem("token"); // 토큰을 로컬스토리지에서 제거
    window.location.href = "../home/index.html"; // 홈화면으로 가게하자
}