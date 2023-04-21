const productInCartList = document.querySelectorAll(".productInCart");

productInCartList.forEach((productInCart) => {
  const eachPrice = productInCart.querySelector(".eachPrice");
  const numberInput = productInCart.querySelector(".numberInput");
  const subtotalPrice = productInCart.querySelector(".subtotalPrice");

  numberInput.addEventListener("input", () => {
    const totalPrice =
      parseInt(eachPrice.textContent) * parseInt(numberInput.value);
    subtotalPrice.textContent = totalPrice;
  });
});
