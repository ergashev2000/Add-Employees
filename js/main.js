"use strict";
let inputName = document.getElementById("inputName"),
  inputEmail = document.getElementById("inputEmail"),
  inputAddress = document.getElementById("inputAddress"),
  inputNumber = document.getElementById("inputNumber"),
  inputStartdate = document.getElementById("inputStartdate"),

  changeInputName = document.getElementById("changeInputName"),
  changeInputEmail = document.getElementById("changeInputEmail"),
  changeSelectDepartment = document.getElementById("changeSelectDepartment"),
  changeInputNumber = document.getElementById("changeInputNumber"),
  changeSelectLevel = document.getElementById("changeSelectLevel"),

  // Selectors
  inputDate = document.getElementById("inputDate"),
  departmentSelect = document.getElementById("departmentSelect"),
  levelSelect = document.getElementById("levelSelect"),

  // Buttons
  addSaveBtn = document.getElementById("addSaveBtn"),
  btnEdit = document.querySelector('.btnEdit'),
  btnDelete = document.querySelector('.btnDelete'),
  addNew = document.querySelector('.addNew'),

  changeSaveBtn = document.getElementById("changeSaveBtn"),

  // Others
  tbody = document.querySelector(".tbody"),
  linkPrint  =document.querySelector(".linkPrint")
  ;
 
  
let baseUrl = "http://localhost:3000";

async function getDataEmployees() {
  const response = await fetch(`${baseUrl}/employees`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resultData = await response.json();
  renderData(resultData);
}
getDataEmployees();


// Regex
addSaveBtn.addEventListener("click", () => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let regux = /^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;
    let regux2 = /^(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;

    if (
        inputName.value.trim().length === 0 ||
        inputEmail.value.trim().length === 0 ||
        inputAddress.value.trim().length === 0 ||
        inputNumber.value.trim().length === 0 ||
        inputDate.value.trim().length === 0 ||
        departmentSelect.value.trim().length === 0 ||
        levelSelect.value.trim().length === 0
        ) {
        alert("Ma'lumotni to'liq kiriting!!!")
      }else{
        if (!inputEmail.value.match(validRegex)) {
            inputEmail.classList.add('is-invalid')
        }else if ((inputNumber.value.match(regux) || inputNumber.value.match(regux2) )){
            addDataEmployees(
                inputName.value,
                inputEmail.value,
                inputAddress.value,
                inputDate.value,
                inputNumber.value,
                inputStartdate.value,
                departmentSelect.value,
                levelSelect.value
              );
        } else {
            inputEmail.classList.remove('is-invalid')
            inputNumber.classList.add('is-invalid')
        }
    }
});


// Render
function renderData(getData) {
    getData.forEach((el, i) => {
      let cl = document.createElement("tr");
      cl.dataset.id = el.id;
      cl.innerHTML = `
              <th scope="row">${i + 1}</th>
              <td>${el.fullName}</td>
              <td>${el.email}</td>
              <td>${el.level}</td>
              <td>${el.department}</td>
              <td>${el.phoneNumber}</td>
              <td class="d-flex">
                  <button type="button" class="btn btn-info btn__edit btnEdit" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" id="${i}" data-edit="${el.id}">
                      Edit</button>
                  <button class="btn btn-danger btn__edit btnDelete" id="${i}" data-del="${el.id}">Delete</button>
              </td>
              `;
              tbody.appendChild(cl);
    });
  }


// ADD DATE FUNCTION
function addDataEmployees(fullname,email,address,birthDate,phoneNumber,startdate,department,level) {
  try {
    fetch(`${baseUrl}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: `${fullname}`,
        email: `${email}`,
        level: `${level}`,
        address: `${address}`,
        birthDate: `${birthDate}`,
        phoneNumber: `${phoneNumber}`,
        startdate: `${startdate}`,
        department: `${department}`,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}


// Delete emplayees
 function deleteDataEmployees(id) {
    try {
       fetch(`${baseUrl}/employees/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ }),
      });
    } catch (err) {
      console.log(err);
    }
}


// Change date
function changeDataEmployees(id, fullname,email, chanlevel ,phoneNumber,department,) {
  try {
    fetch(`${baseUrl}/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: `${fullname}`,
        email: `${email}`,
        level: `${chanlevel}`,
        department: `${department}`,
        phoneNumber: `${phoneNumber}`
        
      }),
    });

  } catch (err) {
    console.log(err);
  }
}


tbody.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnDelete')){
        deleteDataEmployees(e.target.getAttribute("data-del"))
    }
    if (e.target.classList.contains('btnEdit')) {
      changeSaveBtn.addEventListener('click', () => {
        changeDataEmployees(e.target.getAttribute("data-edit"), changeInputName.value, changeInputEmail.value, changeSelectLevel.value, changeInputNumber.value, changeSelectDepartment.value)
      })
    }
})


// Print paper
linkPrint.addEventListener('click', () => {
  window.print()
})