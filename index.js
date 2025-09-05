document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("grocery-input");
  const addButton = document.getElementById("add-button");
  const list = document.getElementById("grocery-list");

  addButton.addEventListener("click", addItem);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addItem();
  });

  function addItem() {
    const itemText = input.value.trim();
    if (itemText === "") return;

    const li = document.createElement("li");
    li.textContent = itemText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => li.remove();

    li.appendChild(removeBtn);
    list.appendChild(li);
    input.value = "";
    input.focus();
  }
});
