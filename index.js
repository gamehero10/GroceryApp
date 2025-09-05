document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("grocery-input");
  const addButton = document.getElementById("add-button");
  const list = document.getElementById("grocery-list");

  // Load saved items from localStorage
  const savedItems = JSON.parse(localStorage.getItem("groceryItems")) || [];
  savedItems.forEach(item => createListItem(item.name, item.bought));

  addButton.addEventListener("click", addItem);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addItem();
  });

  function addItem() {
    const itemText = input.value.trim();
    if (itemText === "") return;

    createListItem(itemText, false);
    saveItem({ name: itemText, bought: false });

    input.value = "";
    input.focus();
  }

  function createListItem(name, bought) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = bought;

    const span = document.createElement("span");
    span.textContent = name;
    span.classList.add("item-text");
    if (bought) span.classList.add("bought");

    checkbox.onchange = () => {
      span.classList.toggle("bought", checkbox.checked);
      toggleBoughtStatus(name, checkbox.checked);
    };

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => toggleEditMode(li, span, name, checkbox.checked);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
      li.remove();
      removeItem(name);
    };

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(removeBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(buttonGroup);
    list.appendChild(li);
  }

  function toggleEditMode(li, span, originalName, boughtStatus) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.classList.add("edit-input");

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("edit-btn");

    li.replaceChild(input, span);

    const buttonGroup = li.querySelector(".button-group");
    const editBtn = buttonGroup.querySelector(".edit-btn");
    buttonGroup.replaceChild(saveBtn, editBtn);

    saveBtn.onclick = () => {
      const newText = input.value.trim();
      if (newText === "") return;

      span.textContent = newText;
      li.replaceChild(span, input);
      buttonGroup.replaceChild(editBtn, saveBtn);

      updateItemName(originalName, newText);
    };
  }

  function saveItem(item) {
    const items = JSON.parse(localStorage.getItem("groceryItems")) || [];
    items.push(item);
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }

  function removeItem(name) {
    let items = JSON.parse(localStorage.getItem("groceryItems")) || [];
    items = items.filter(i => i.name !== name);
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }

  function updateItemName(oldName, newName) {
    let items = JSON.parse(localStorage.getItem("groceryItems")) || [];
    const item = items.find(i => i.name === oldName);
    if (item) {
      item.name = newName;
      localStorage.setItem("groceryItems", JSON.stringify(items));
    }
  }

  function toggleBoughtStatus(name, bought) {
    let items = JSON.parse(localStorage.getItem("groceryItems")) || [];
    const item = items.find(i => i.name === name);
    if (item) {
      item.bought = bought;
      localStorage.setItem("groceryItems", JSON.stringify(items));
    }
  }
});
