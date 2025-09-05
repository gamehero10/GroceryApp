document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("grocery-input");
  const addButton = document.getElementById("add-button");
  const list = document.getElementById("grocery-list");

  // Load saved items on page load
  const savedItems = JSON.parse(localStorage.getItem("groceryItems")) || [];
  savedItems.forEach(item => createListItem(item));

  addButton.addEventListener("click", addItem);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addItem();
  });

  function addItem() {
    const itemText = input.value.trim();
    if (itemText === "") return;

    createListItem(itemText);
    saveItem(itemText);

    input.value = "";
    input.focus();
  }

  function createListItem(text) {
    const li = document.createElement("li");
    li.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
      li.remove();
      removeItem(text);
    };

    li.appendChild(removeBtn);
    list.appendChild(li);
  }

  function saveItem(item) {
    const items = JSON.parse(localStorage.getItem("groceryItems")) || [];
    items.push(item);
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }

  function removeItem(item) {
    let items = JSON.parse(localStorage.getItem("groceryItems")) || [];
    items = items.filter(i => i !== item);
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }
});
