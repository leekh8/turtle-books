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
    fetch("/api/user/register", {
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
      .then((res) => console.log(res));
    alert("회원가입에 성공하였습니다!");
    window.location.href = "/login";
  } catch (err) {
    // 로그인 페이지 이동
    console.log(err);
    alert("오류가 발생하였습니다.");
  }
}
