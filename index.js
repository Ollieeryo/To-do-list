// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
// 製造點擊 add btn 時，要加入的內容
function addItem(text) {
  let newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

// Create
//1.防止產生空白 todo
addBtn.addEventListener("click", function () {
  const inputValue = input.value;
  //處理空白字可以加入todo的問題: trim可以刪除前後空白字元，等於輸入值刪除空白字元後如果還是空字串的話，則不能加入todo list
  if (inputValue.length > 0 && inputValue.trim() !== "") {
    addItem(inputValue);
    input.value = "";
  } else {
    //增加提示，不能輸入空白字元，另外將input格內容清空
    window.alert("Cannot input space");
    input.value = "";
  }
});

//2.當使用者在 input#newTodo 裡按下 Enter 鍵時，可以新增 to-do。 (提示：使用 keydown 事件，並且用 event.key === "Enter" 來鎖定 Enter 鍵)，並且不能輸入空格

input.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Enter" && input.value.trim() !== "") {
    addItem(input.value);
    input.value = "";
  } else if (key === "Enter" && input.value.trim() === "") {
    //選擇else if 而不是 else 是因為 else 會影響到其他按鍵，必須鎖定在 Enter
    //增加提示，不能輸入空白字元，另外將input格內容清空
    window.alert("Cannot input space");
    input.value = "";
  }
});

//3.當使用者點擊完成的 todo 時，該項目會被送進 Done 清單；同時，​Done 清單中的項目也要能夠被刪除

//選取done list 的節點
const doneList = document.querySelector("#my-done");

list.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("delete")) {
    let parentElement = target.parentElement;
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    //設置 doneItem 為點擊元素最接近的 li 元素節點，等於點擊的 list item 整串
    let doneItem = target.closest("li");
    //接著讓 done 元素加入子元素(doneItem)，使用 insertBefore，注意 null 必為最接近的子元素
    doneList.insertBefore(doneItem, null);
    target.classList.toggle("checked");
  }
});
//點擊垃圾桶可刪除doneItem
doneList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    let parentElement = event.target.parentElement;
    parentElement.remove();
  } else if (event.target.tagName === "LABEL") {
    let backTodoItem = event.target.closest("li");
    list.insertBefore(backTodoItem, null);
    event.target.classList.toggle("checked");
  }
});
