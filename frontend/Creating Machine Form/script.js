"use-strict";

const createMachineButton = document.querySelector(".create_machine_button");
const selectTypeList = document.querySelector(".select_type");

createMachineButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const machine_name = document.querySelector("#machine_name").value;
  const hourly_rate = document.querySelector("#hourly_rate").value;
  const value = selectTypeList.value;
  const machine_type = selectTypeList.options[value].text;

  if (
    !machine_name ||
    !machine_type ||
    !hourly_rate ||
    machine_type === "Loại Máy"
  ) {
    alert("Xin Nhập đầy đủ thông tin");
    return;
  }
  const data = {
    machine_name: machine_name,
    hourly_rate: parseFloat(hourly_rate),
    machine_type: machine_type,
  };
  console.log(JSON.stringify(data));
  try {
    const request = new Request("http://localhost:3022/machines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await fetch(request);
    if (res.status === 200) alert("Tạo Máy PC mới thành công");
  } catch (error) {
    alert("Xin Nhập đầy đủ thông tin");
  }
});
