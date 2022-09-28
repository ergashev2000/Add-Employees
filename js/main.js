"use strict";
let inputName = document.getElementById("inputName"),
  inputEmail = document.getElementById("inputEmail"),
  inputAddress = document.getElementById("inputAddress"),
  inputNumber = document.getElementById("inputNumber"),
  inputStartdate = document.getElementById("inputStartdate"),
  
  // Selectors
  inputDate = document.getElementById("inputDate"),
  departmentSelect = document.getElementById("departmentSelect"),
  levelSelect = document.getElementById("levelSelect"),

  // Buttons
  addSaveBtn = document.getElementById("addSaveBtn"),
  changeSelectLevel = document.getElementById("changeSelectLevel"),
  btnEdit = document.querySelector('.btnEdit'),
  btnDelete = document.querySelectorAll('.btnDelete'),
  addNew = document.querySelector('.addNew'),

  // Others
  tbody = document.querySelector(".tbody")
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



// Render
function renderData(getData) {
    getData.forEach((el, i) => {
      let cl = document.createElement("tr");
      cl.innerHTML = `
              <th scope="row">${i + 1}</th>
              <td>${el.fullName}</td>
              <td>${el.email}</td>
              <td>${el.address}</td>
              <td>${el.department}</td>
              <td>${el.phoneNumber}</td>
              <td class="d-flex">
                  <button type="button" class="btn btn-info btn__edit btnEdit" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" id="${i}">
                      Edit</button>
                  <button class="btn btn-danger btn__edit btnDelete" id="${i}" >Delete</button>
              </td>
              `;
              tbody.appendChild(cl);
    });
  }



addSaveBtn.addEventListener("click", () => {

    // Regex
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
        address: `${address}`,
        birthDate: `${birthDate}`,
        phoneNumber: `${phoneNumber}`,
        startdate: `${startdate}`,
        department: `${department}`,
        level: `${level}`,
      }),
    });

  } catch (err) {
    console.log(err);
  }
}
console.log(btnDelete);


// Delete emplayees

// function deleteDataEmployees(id) {
//     try {
//       fetch(`${baseUrl}/employees/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ }),
//       });
  
//     } catch (err) {
//       console.log(err);
//     }
//   }



