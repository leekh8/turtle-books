const username = document.querySelector("#username");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const phone = document.querySelector("#phone");
const items = document.querySelector("#items");
const orderBtn = document.querySelector("#orderbtn");

orderBtn.addEventListener("click", order);

function order(){
    console.log(req);
    const req = {
        username: username.value,
        email: email.value,
        address: address.value,
        phone: phone.value,
        items: items.value
    }

    fetch('/order', {
        method: 'POST',
        headers: {
            "Content-Tpye": "application/json",
        },
        body: JSON.stringify(req),

    })
}