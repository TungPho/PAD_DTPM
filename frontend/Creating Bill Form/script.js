"use-script";
const createServiceButton = document.querySelector(".create_service");
const submitBillButton = document.querySelector(".submit_bill");
const calculateTotalButton = document.querySelector(".calculate_total");

let totalPrice = 0;
// Nút thêm dịch vụ
createServiceButton.addEventListener("click", (e) => {
  e.preventDefault();
  const customSelectList = document.querySelector(".select_service");
  const insert_data = document.querySelector(".insert_data");
  const quantity = document.querySelector(".quantity").value;
  let html = `<div class="insert_data">
        <div class="element">
            <input style="margin-right: 50px" class="table_col" type="text" value="VALUE_SERVICE" readonly/>
            <input style="margin-right: 50px" class="table_col" type="number" value = "VALUE_QUANTITY" readonly/>
            <input class="table_col total_price" type="text" value = "TOTAL_PRICE" readonly />
        </div>
    </div>`;
  let price = 0;
  const value = customSelectList.value;
  const service = customSelectList.options[value].text;
  if (service === "Ăn") {
    price = 10000;
  } else if (service === "Uống") {
    price = 20000;
  } else if (service === "Dịch Vụ") {
    alert("Bạn Hãy Chọn Dịch Vụ Trước");
    return;
  }
  const totalPrice = price * quantity;
  if (quantity < 0) {
    alert("Không thể để số lượng <= 0");
    return;
  }
  html = html.replaceAll("VALUE_SERVICE", service);
  html = html.replaceAll("VALUE_QUANTITY", quantity);
  html = html.replaceAll("TOTAL_PRICE", totalPrice);
  insert_data.insertAdjacentHTML("beforebegin", html);
});

// Nút Tính tổng tiền của tất cả mặt hàng
calculateTotalButton.addEventListener("click", (event) => {
  totalPrice = 0;
  event.preventDefault();
  const allTotalPriceField = document.querySelectorAll(".total_price");
  const totalPriceField = document.querySelector("#total_price");
  for (let i = 0; i < allTotalPriceField.length; i++) {
    totalPrice += parseFloat(allTotalPriceField[i].value);
  }
  console.log(totalPrice);
  totalPriceField.setAttribute("value", totalPrice);
});
// Nút Tạo Hóa Đơn
submitBillButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (totalPrice === 0 || undefined) {
    alert("Bạn Hãy Tính Tổng Tiền trước Hoặc Hóa Đơn của bạn = 0");
    return;
  }
  alert("Tạo Hóa Đơn thành công");
});
