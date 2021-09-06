var list = document.getElementById("list");

firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    // li tag with text node
    var li = document.createElement("li");
    var liText = document.createTextNode(data.val().value);
    li.appendChild(liText);

    // delete button
    var delBtn = document.createElement("button");
    var delText = document.createTextNode("Delete");
    delBtn.appendChild(delText);

    delBtn.setAttribute("class", "btn");
    delBtn.setAttribute("id", data.val().key);
    delBtn.setAttribute("onclick", "delTask(this)");

    // creating edit button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("Edit");
    editBtn.appendChild(editText);

    editBtn.setAttribute("class", "btn");
    editBtn.setAttribute("onclick", "editItem(this)");
    editBtn.setAttribute("id", data.val().key);

    li.appendChild(delBtn);
    li.appendChild(editBtn);

    list.appendChild(li);
  });

function addtodo() {
  var todo_item = document.getElementById("todo-item");

  var database = firebase.database().ref("todos");

  var key = database.push().key;

  var todo = {
    value: todo_item.value,
    key: key,
  };
  database.child(key).set(todo);
  todo_item.value = "";
}

function delTask(e) {
  firebase.database().ref("todos").child(e.id).remove();
  e.parentNode.remove();
  e.parentNode.remove();
}

function editItem(e) {
  var val = prompt("Edit your Task", e.parentNode.firstChild.nodeValue);
  var editTodo = {
    value: val,
    key: e.id,
  };

  firebase.database().ref("todos").child(e.id).set(editTodo);
}

function delAll() {
  list.innerHTML = "";
}
