const personData = JSON.parse(localStorage.getItem('data')) || [];
const addBtn = document.querySelector(".add-btn");
const modelBox = document.querySelector(".model-box");
const fullName = document.querySelector("#full-name");
const pan = document.querySelector("#PAN");
const age = document.getElementById("age");
const qualification = document.getElementById("edu");
const personForm = document.querySelector(".person-data");
const inputName = document.getElementById("name");
const remove = document.querySelector(".dlt-btn");
const dataList = document.querySelector(".data-list");
const sorted = document.getElementById("sort");
const searchResult = document.querySelector(".search-result")
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.getElementById("search");

let count = JSON.parse(localStorage.getItem('counter')) || 1;

window.addEventListener('load', () =>{
    render();
})

function inputReset() {
  inputName.value = "";
}

addBtn.addEventListener('click', () => {
    modelBox.style.display = "block";
    inputReset();
})

function dataReset() {
  fullName.value = "";
  pan.value = "";
  age.value = "";
  qualification.value = "";
  modelBox.style.display = "none";
}

function createList(details) {
  const listItem = document.createElement("li");
  listItem.setAttribute("id", details.id);
  listItem.innerHTML = `<span class="name">${details.name}</span><span class="pan">${details.pan}</span><span class="age">${details.age}</span><span class="qualification">${details.education}</span><button class="btn del-btn">Delete</button>`;

  dataList.appendChild(listItem);
}

personForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const details = {
      id: count,
      name: fullName.value,
      pan: pan.value,
      age: age.value,
      education: qualification.value,
    };
    console.log(details);
    personData.push(details);
    localStorage.setItem("data", JSON.stringify(personData));
    createList(details);
    dataReset();
    count++;
    localStorage.setItem('counter', JSON.stringify(count));
})

function deleteList(e){
        personData.forEach((ele, idx) => {
          if (ele.id == parseInt(e.path[1].id)) personData.splice(idx, 1);
        });
        e.path[1].remove();
        localStorage.setItem("data", JSON.stringify(personData));
}

dataList.addEventListener('click', (e) =>{
    deleteList(e);
})

function render(){
    personData.forEach((item) => {
        createList(item);
    })
}

sorted.addEventListener('change', (e) =>{
    if(e.target.value == "fullname"){
        personData.sort((a,b) => a.name.localeCompare(b.name));
    }
    dataList.innerHTML = ""
    render()
})

sorted.addEventListener("change", (e) => {
  if (e.target.value == "age") {
    personData.sort((a, b) => a.age - b.age);
  }
  dataList.innerHTML = "";
  render();
});


let filteredItem = [...personData]
const display = () => {
    if(filteredItem.length < 1){
        searchResult.innerText = "No match found!"
        return;
    }
}

searchBtn.addEventListener('click', () =>{
    const inputVal = searchInput.value;
    filteredItem = personData.filter((data) => {
      return data.pan.includes(inputValue);
    });
    display();
    render();
})
    




