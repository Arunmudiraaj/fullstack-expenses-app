let url = "http://localhost:8080/expenses";
var form = document.querySelector("#form");
var inputs = document.querySelectorAll("input");
var listExpenses = document.querySelector("#allList");
var amount = inputs[0];
var description = inputs[1];
var category = document.querySelector("select");
let userEditId = null;

window.addEventListener("DOMContentLoaded", load);
async function load() {
  const allExpenses = await axios.get(url + "/all");
  console.log(allExpenses);
  for (let item of allExpenses.data) {
    addtoList(item);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const obj = {
    amount: amount.value,
    title: description.value,
    category: category.value,
  };
  amount.value = "";
  description.value = "";
  category.value = "";
  if (userEditId === null) {
    axios.post(url + "/add", obj).then((response) => {
      addtoList(response.data);
    });
  } else {
    axios
      .put(`${url}/edit/${userEditId}`, obj)
      // addtoList(obj)
      .then(addtoList({ ...obj, id: userEditId }));
    userEditId = null;
  }
});

function addtoList(obj) {
  const { id, amount, title, category } = obj;
  const list = `<li id = ${id}> $${amount} - ${title} - ${category} - 
    <button onclick="edit('${amount}','${title}','${category}','${id}')" class="bg-yellow-300 active:opacity-75 border-black border rounded-md px-2">Edit</button> 
    <button onclick="deleted('${id}')" class="bg-red-400 active:opacity-75 border-black border rounded-md px-2">Delete</button> </li>`;
  listExpenses.innerHTML = listExpenses.innerHTML + list;
}

function deleted(id) {
  removeItemFromList(id);
  axios.delete(`${url}/delete/${id}`);
  console.log(id);
}

function removeItemFromList(id) {
  let childNodetobedeleted = document.getElementById(id);
  if (childNodetobedeleted) {
    listExpenses.removeChild(childNodetobedeleted);
  }
}

function edit(amt, title, category, id) {
  amount.value = amt;
  description.value = title;
  category.value = category;
  removeItemFromList(id);
  userEditId = id;
  console.log(userEditId);
}
