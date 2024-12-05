"use-script";
const createServiceButton = document.querySelector(".create_service");
const submitBillButton = document.querySelector(".submit_bill");
const calculateTotalButton = document.querySelector(".calculate_total");
const customSelectList = document.querySelector(".select_service");

// Hàm Generate list dịch vụ
const generateSelectList = async () => {
  const request = new Request("http://localhost:3022/services", {
    method: "GET",
  });
  const res = await fetch(request);
  // services array
  const services = (await res.json()).metadata;
  for (let i = 1; i < services.length; i++) {
    const html = `<option value="${i}" id="${services[i].service_id}" price="${services[i].price}">${services[i].service_name}</option>`;
    customSelectList.insertAdjacentHTML("beforeend", html);
  }
};
Promise.all([generateSelectList()]);
let totalPrice = 0;

// Hàm Get id service by name
const getServiceIDByName = async (name) => {
  const request = new Request(
    `http://localhost:3022/get-services/?name=${name}`,
    {
      method: "GET",
    }
  );
  const res = await fetch(request);
  const id = await res.json();
  console.log(id);
  return id.service_id;
};

// Nút thêm dịch vụ
createServiceButton.addEventListener("click", (e) => {
  e.preventDefault();
  const insert_data = document.querySelector(".insert_data");
  const quantity = document.querySelector(".quantity").value;
  let html = `<div class="insert_data">
        <div class="element">
            <input class="table_col service_name_input" style="margin-right: 50px"  type="text" value="VALUE_SERVICE" readonly/>
            <input class="table_col quantity quantity_input" style="margin-right: 50px"  type="number" value = "VALUE_QUANTITY" readonly/>
            <input class="table_col total_price total_price_input" type="text" value = "TOTAL_PRICE" readonly />
        </div>
    </div>`;

  const value = customSelectList.value;
  const service = customSelectList.options[value].text;
  const service_id = customSelectList.options[value].getAttribute("");
  let price = customSelectList.options[value].getAttribute("price");
  if (service === "Dịch Vụ") {
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
submitBillButton.addEventListener("click", async (e) => {
  e.preventDefault();
  if (totalPrice === 0 || undefined) {
    alert("Bạn Hãy Tính Tổng Tiền trước Hoặc Hóa Đơn của bạn = 0");
    return;
  }
  const customer_id = document.querySelector("#customer_id").value;
  const machine_number = document.querySelector("#machine_number").value;
  const total_time = document.querySelector("#total_time").value;
  const totalPrices = document.querySelectorAll(".total_price_input");
  const allQuantities = document.querySelectorAll(".quantity_input");

  console.log(customer_id, machine_number, total_time);

  const serviceNames = document.querySelectorAll(".service_name_input");
  const bill_items_array = [];
  let length = allQuantities.length;
  for (let i = 0; i < length; i++) {
    bill_items_array.push({
      service_id: await getServiceIDByName(serviceNames[i].value),
      quantity: parseInt(allQuantities[i].value),
      total_price: parseFloat(totalPrices[i].value),
    });
  }
  console.log(JSON.stringify(bill_items_array));

  const data = `{
    "customer_id" : ${customer_id},
    "machine_id" : ${machine_number},
    "total_time" : ${total_time},
    "total_price" : ${totalPrice},
    "bill_items_array": ${JSON.stringify(bill_items_array)}
  }`;
  console.log(data);
  try {
    const request = new Request("http://localhost:3022/bills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    const res = await fetch(request);
    if (res.status === 200) alert("Tạo Hóa Đơn thành công");
  } catch (error) {
    alert("Xin Nhập đầy đủ thông tin");
  }
});
