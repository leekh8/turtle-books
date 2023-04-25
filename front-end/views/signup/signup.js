const signupBtn = document.querySelector("#signupBtn");

signupBtn.addEventListener("click", submitForm);
async function submitForm() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const email = document.getElementById("email").value;

  if (username === "" || password === "" || password2 === "" || email === "") {
    alert("입력되지 않은 정보가 있습니다.");
    return;
  }

  if (password !== password2) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const data = { username, email, password };

    await Api.post("/api/register", data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = "/login";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
