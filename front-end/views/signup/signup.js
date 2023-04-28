const signupBtn = document.querySelector("#signupBtn");

signupBtn.addEventListener("click", submitForm);

async function submitForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (password === "" || password2 === "" || email === "") {
    alert("입력되지 않은 정보가 있습니다.");
    return;
  }

  if (password !== password2) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const data = { email, password };

    await fetch.post("/api/user/register", data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = "/login";
  } catch (err) {
    alert("오류가 발생하였습니다.");
  }
}
