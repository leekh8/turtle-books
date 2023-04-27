const orderList = document.querySelector("#orderList");

async function loadOrderList() {
  try {
    const response = await fetch("/api/orderList", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.log(error.message);
  }
}
loadOrderList();

orderList.innerHTML += `
  <h2>주문 내역</h2>
          <ul>
            <li>
              <span>상품명:</span>
              <span>책 A </span>
            </li>
            <li>
              <span>결제 금액:</span>
              <span>￦10,000</span>
            </li>
            <li>
              <span>배송 정보:</span>
              <span>경기도 ~~</span>
            </li>
          </ul>

`;
