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

    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("item-text");

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => toggleEditMode(li, span, text);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
      li.remove();
      removeItem(span.textContent);
    };

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(removeBtn);

    li.appendChild(span);
    li.appendChild(buttonGroup);
    list.appendChild(li);
  }

  function toggleEditMode(li, span, originalText) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    input.classList.add("edit-input");

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("edit-btn");

    // Replace the span with input
    li.replaceChild(input, span);

    // Replace Edit button with Save
    const buttonGroup = li.querySelector(".button-group");
    const editBtn = buttonGroup.querySelector(".edit-btn");
    buttonGroup.replaceChild(saveBtn, editBtn);

    saveBtn.onclick = () => {
      const newText = input.value.trim();
      if (newText === "") return;

      // Replace input with new span
      span.textContent = newText;
      li.replaceChild(span, input);
      buttonGroup.replaceChild(editBtn, saveBtn);

      // Update localStorage
      updateItem(originalText, newText);
    };
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

  function updateItem(oldText, newText) {
    let items = JSON.parse(localStorage.getItem("groceryItems")) || [];
    const index = items.indexOf(oldText);
    if (index !== -1) {
      items[index] = newText;
      localStorage.setItem("groceryItems", JSON.stringify(items));
    }
  }
});
