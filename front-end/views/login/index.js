const loginForm = document.querySelector("#login-form")

loginForm.addEventListener("submit", formSubmit);

function formSubmit(e) {
    e.preventDefault();
    const emailinput = document.querySelector("#email");
    const passwordinput = document.querySelector("#password");
    const email = emailinput.value;
    const password = passwordinput.value;
    console.log(email, password)

    login(email,password)
}

async function login(email,password){
    try {
        console.log(email)
        fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => console.log("1", res));
      } catch (err) {
        // 로그인 페이지 이동
        console.log("err", err);
        alert("오류가 발생하였습니다.");
      }
    // try{ //저 api에서 만들어준 토큰을 받아서 token에 저장, 로컬스토리지에 넣어놓음
    //     const response = await fetch("/api/user/login", {
    //         method: "POST", 
    //         body: JSON.stringify({
    //             email: email,
    //             password: password,
    //         }),
    //         headers: {'Content-Type': 'application/json'}
    //     })
    //     console.log(response)

    //     const data = await response.json();
    //     console.log("data", data)

    //     const token = data.token;
    //     localStorage.setItem("token", token)
    //     //로그인 완료 후 토큰까지 넣었으니 다른 페이지 랜딩 
    // } catch(e) {
    //     console.log("error msg: ", e)
    // }
}

//아마도 마이페이지 로그아웃 버튼에 이벤트 걸어줘야.. 
function logout() {
    localStorage.removeItem("token"); // 토큰을 로컬스토리지에서 제거
    window.location.href = "/"; // 홈화면으로 가게하자
}