document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tabButtons");
  const tabContents = document.querySelectorAll(".tabContents");
  const subMenus = document.querySelectorAll(".subMenu");
  const modalButtons = document.querySelectorAll(".modal-button");
  const modals = document.querySelectorAll(".modal");
  const closeModalButtons = document.querySelectorAll(".modal-close");

  // 탭 기능
  function changeTab(e) {
    const targetTab = e.target.dataset.tab;

    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    tabContents.forEach((content) => {
      content.style.display = "none";
    });

    e.target.classList.add("active");
    document.getElementById(targetTab).style.display = "block";
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", changeTab);
  });

  // 아코디언 기능
  function toggleSubMenu(e) {
    const subMenu = e.target.nextElementSibling;
    subMenu.style.display = subMenu.style.display === "none" ? "block" : "none";
  }

  subMenus.forEach((subMenu) => {
    subMenu.previousElementSibling.addEventListener("click", toggleSubMenu);
  });

  // 모달 기능
  function openModal(e) {
    const targetModalId = e.target.dataset.modalTarget;
    const targetModal = document.querySelector(targetModalId);
    targetModal.classList.add("is-active");
  }

  function closeModal(e) {
    const modal = e.target.closest(".modal");
    modal.classList.remove("is-active");
  }

  modalButtons.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeModalButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  // 수정버튼 기능
  function handleChangeBtnClick(e) {
    const button = e.target;
    if (!button.classList.contains("changeBtn")) return;

    const isEditMode = button.textContent.trim() === "수정";

    button.textContent = isEditMode ? "저장" : "수정";
    button.type = isEditMode ? "submit" : "button";

    const changeTextElements =
      button.parentElement.parentElement.querySelectorAll(".changeText");

    changeTextElements.forEach((el) => {
      if (isEditMode) {
        const input = document.createElement("input");
        input.type = "text";
        input.value = el.textContent;
        input.classList.add("changeText"); // 스타일 유지를 위해 'changeText' 클래스 추가
        el.replaceWith(input);
      } else {
        const td = document.createElement("td");
        td.textContent = el.value;
        td.classList.add("changeText");
        el.replaceWith(td);
      }
    });
  }

  // 정적&동적으로 추가된 수정 버튼에 이벤트 부여(이벤트 위임 방식)
  const productTable = document.querySelector("#product-table");
  const ctgrTable = document.querySelector("#ctgrTable");
  const tpcTable = document.querySelector("#tpcTable");

  productTable.addEventListener("click", handleChangeBtnClick);
  ctgrTable.addEventListener("click", handleChangeBtnClick);
  tpcTable.addEventListener("click", handleChangeBtnClick); //까지

  // 삭제 버튼 기능
  function handleDeleteBtnClick(e) {
    const button = e.target;
    if (!button.classList.contains("deltButnTh")) return;
    const table = button.closest("table");
    const checkedRows = table.querySelectorAll(
      "input[type='checkbox']:checked"
    );

    checkedRows.forEach((checkbox) => {
      checkbox.closest("tr").remove();
    });
  }

  productTable.addEventListener("click", handleDeleteBtnClick);
  ctgrTable.addEventListener("click", handleDeleteBtnClick);
  tpcTable.addEventListener("click", handleDeleteBtnClick);

  // 상품 등록 기능
  const addProductBtn = document.querySelector("#addProdctBtn");
  addProductBtn.addEventListener("click", () => {
    const addSku = document.querySelector("#addSku").value;
    const categoryTap = document.querySelector("#category-tap").value;
    const topicTap = document.querySelector("#topic-tap").value;
    const addTitle = document.querySelector("#addTitle").value;
    const addPrice = document.querySelector("#addPrice").value;
    const addStock = document.querySelector("#addStock").value;
    const addAuthor = document.querySelector("#addAuthor").value;
    const addPublisher = document.querySelector("#addPublisher").value;
    const addDescription = document.querySelector("#addDescription").value;
    const addProductImg = document.querySelector("#file-input");

    //input file로 받은 이미지 경로
    const addProductImgURL =
      addProductImg.files.length > 0
        ? URL.createObjectURL(addProductImg.files[0])
        : "";

    // addProductBtn을 클릭하면 상품정보 추가
    productTable.innerHTML += `
    <tr>
      <td class="checkboxTd"><input type="checkbox"></td>
      <td><span class="changeImg"><img class="productImg" src="${addProductImgURL}" alt=""></span></td>
      <td>${addSku}</td>
      <td><span class="categorySelctBox">${categoryTap}</span></td>
      <td><span class="topicSelctBox">${topicTap}</span></td>
      <td><span class="changeText" class="productTitle">${addTitle}</span></td>
      <td><span class="changeText" class="productPrice">${addPrice}</span> 원</td>
      <td><span class="changeText" class="productStock">${addStock}</span> 개</td>
      <td><span class="changeText" class="productDescription">${addDescription}</span></td>
      <td><span class="changeText" class="productAuthor">${addAuthor}</span></td>
      <td><span class="changeText" class="productPublisher">${addPublisher}</span></td>
      <td class="btnTd"><button class="changeBtn button is-small">수정</button></td>
    </tr>
  `;
    // 초기화 작업
    document.querySelector("#addSku").value = "";
    document.querySelector("#category-tap").value = "";
    document.querySelector("#topic-tap").value = "";
    document.querySelector("#addTitle").value = "";
    document.querySelector("#addPrice").value = "";
    document.querySelector("#addStock").value = "";
    document.querySelector("#addAuthor").value = "";
    document.querySelector("#addPublisher").value = "";
    document.querySelector("#addDescription").value = "";
    document.querySelector("#file-input").value = "";
    document.querySelector("#preProductImg").src = ""; // 미리보기 이미지 초기화
  });
  // 미리보기 기능 (미룸)
  // function previewImage(input) {
  //   if (input.files && input.files[0]) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const previewImg = document.querySelector("#preview-img");
  //       previewImg.src = e.target.result;
  //       previewImg.style.display = "block";
  //     };

  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }
  // const fileInput = document.querySelector("#file-input");
  // fileInput.addEventListener("change", (e) => {
  //   previewImage(e.target);
  // });

  // 카테고리관리 탭
  // 카테고리 등록
  const addCategoryBtn = document.querySelector("#addCategoryBtn");
  addCategoryBtn.addEventListener("click", () => {
    const addCategory = document.querySelector("#addCategory").value;
    ctgrTable.innerHTML += `
                <tr>
                  <td class="checkboxTd"><input type="checkbox"></td>
                  <td><span  class="changeText" class="categorySelctBoxContent">${addCategory}</span></td>
                  <td class="btnTd"><button  class="changeBtn" class="button is-small">수정</button></td>
                </tr>
    `;

    document.querySelector("#addCategory").value = "";
  });

  // Topic 등록
  const addTopicBtn = document.querySelector("#addTopicBtn");
  addTopicBtn.addEventListener("click", () => {
    const addTopic = document.querySelector("#addTopic").value;

    tpcTable.innerHTML += `
  <tr>
                <td class="checkboxTd"><input type="checkbox"></td>
                <td><span  class="changeText" class="topicSelctBoxContent">${addTopic}</span></td>
                <td class="btnTd"><button  class="changeBtn" class="button is-small">수정</button></td>
              </tr>
  `;

    document.querySelector("#addTopic").value = "";
  });
}); //DOMContentLoaded 이벤트 리스너 내부
