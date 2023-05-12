// var employeeData = require("../json/employeeData.json")

function addEmployeeData() {
  console.log("Submit clicked");
  fetch("/addEmployeeData", {
    method: "POST",
    body: JSON.stringify({
      ID: document.getElementById("ID").value,
      Hiredate: document.getElementById("Hiredate").value,
      Name: document.getElementById("Name").value,
      Role: document.getElementById("Role").value,
      Active: document.getElementById("Active").value,
      Address: document.getElementById("Address").value,
      Birthdate: document.getElementById("Birthdate").value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

employeeSubmit = document.getElementById("employeeSubmit");

employeeSubmit.addEventListener("click", () => addEmployeeData());

removeEmployee = document.getElementById("datatable");

removeEmployee.addEventListener("click", function (event) {
  console.log(event.target.id);
  if (event.target.classList.contains("removeicon")) {
    fetch("/removeEmployeeData", {
      method: "POST",
      body: JSON.stringify({
        index: event.target.parentNode.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  }
});

const cells = document.querySelectorAll("td");

for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  if (cell.classList.contains("ID") || cell.classList.contains("removeicon")) {
    continue;
  }

  cell.addEventListener("mouseover", () => {
    cell.classList.add("editing");
  });

  cell.addEventListener("mouseout", () => {
    cell.classList.remove("editing");
  });

  cell.addEventListener("dblclick", () => {
    cell.contentEditable = "true";
    cell.focus();
  });

  cell.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      editEmployeeData();
    }
  });

  cell.addEventListener("blur", () => editEmployeeData());

  function editEmployeeData() {
    cell.contentEditable = "false";
    cell.classList.remove("editing");
    fetch("/editEmployeeData", {
      method: "POST",
      body: JSON.stringify({
        index: cell.parentNode.id,
        key: cell.className,
        newString: cell.textContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  }
}

/**
//  * Retrieves input data from a form and returns it as a JSON object.
//  * @param  {HTMLFormControlsCollection} elements  the form elements
//  * @return {Object}                               form data as an object literal
//  */
// const formToJSON = (elements) =>
//   [].reduce.call(
//     elements,
//     (data, element) => {
//       data[element.name] = element.value;
//       return data;
//     },
//     {}
//   );

// /**
//  * A handler function to prevent default submission and run our custom script.
//  * @param  {Event} event  the submit event triggered by the user
//  * @return {void}
//  */
// const handleFormSubmit = (event) => {
//   // Stop the form from submitting since we’re handling that with AJAX.
//   event.preventDefault();

//   // Call our function to get the form data.
//   const data = formToJSON(form.elements);

//   // ...this is where we’d actually do something with the form data...
//   console.log(data)
//   fetch("/addEmployeeData", {
//     method: "POST",
//     body: data,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// };

// const form = document.getElementsByTagName("form")[0];
// form.addEventListener("submit", handleFormSubmit);
