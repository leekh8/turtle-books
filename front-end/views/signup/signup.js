const signupBtn = document.querySelector("#signupBtn");

signupBtn.addEventListener("click", submitForm);

async function submitForm(e) {
  e.preventDefault();
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
    const response = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      alert(`정상적으로 회원가입되었습니다.`);
      window.location.href = "/login";
    }
    console.log(response);
  } catch (err) {
    // 로그인 페이지 이동
    console.log(err);
    alert("오류가 발생하였습니다.");
  }
}
