$("#inputPhone").mask("(00) 0000-0000");

var students = [];

var classes = [];

var shifts = [
  {
    id_shift: 1,
    name: "Manhã",
  },
  {
    id_shift: 2,
    name: "Tarde",
  },
  {
    id_shift: 3,
    name: "Noite",
  },
];

loadCourses();
loadStudents();
 
function loadCourses(){  
  $.ajax({
    url: "http://localhost:8080/courses",
    type: "GET",
    async: false,
    success: (response) => {
      classes = response;
      for(var clas of classes){ 
        document.getElementById('selectCourses').innerHTML+=`<option value=${clas.id_course}>${clas.class_name}</option>`
      }
    },
  }); 

 


}

function loadStudents() { 

    //getJson só chamada assincrona
    $.getJSON("http://localhost:8080/students", (response) => {
      students = response;
      for (let stud of students) { 
        // aqui é for ao inves de in
        addNewRow(stud);
      }
    });
}

function addNewRow(student) {
  try {
    console.log(student);
    var table = document.getElementById("studentsTable");
    var newRow = table.insertRow();

    var idNode = document.createTextNode(student.id);
    var idCell = newRow.insertCell();
    idCell.className = "text-center";
    idCell.appendChild(idNode);
    //newRow.insertCell().appendChild(idNode);

    var nameNode = document.createTextNode(student.name);
    var nameCell = newRow.insertCell();
    nameCell.className = "text-center";
    nameCell.appendChild(nameNode);
    // Adicionar as células na tabela

    //newRow.insertCell().appendChild(nameNode);

    var emailNode = document.createTextNode(student.email);
    var emailCell = newRow.insertCell();
    emailCell.className = "d-none d-md-table-cell text-center";
    emailCell.appendChild(emailNode);
    //newRow.insertCell().appendChild(emailNode);

    var phoneNode = document.createTextNode(student.phone);
    var phoneCell = newRow.insertCell();
    phoneCell.className = "d-none d-lg-table-cell text-center";
    phoneCell.appendChild(phoneNode);
    //newRow.insertCell().appendChild(phoneNode);

    var courseName = classes[student.idCurso-1].class_name;
    var courseNode = document.createTextNode(courseName);
    var courseCell = newRow.insertCell();
    courseCell.className = "d-none d-xl-table-cell text-center";
    courseCell.appendChild(courseNode);
    //newRow.insertCell().appendChild(courseNode);

    var shiftName = student.name;
    var shiftNode = document.createTextNode(shiftName);
    var shiftCell = newRow.insertCell();
    shiftCell.className = "d-none d-xl-table-cell text-center ";
    shiftCell.appendChild(shiftNode);
    //newRow.insertCell().appendChild(shiftNode);
  } catch (error) {
    console.log(error);
  }
}

function save() {
  try {
    const fetchRadioBtns = document.getElementsByName("gridRadios");
    var shiftValue;
    for (let radio_Option of fetchRadioBtns) {
      if (radio_Option.checked) {
        shiftValue = radio_Option.value;
        break;
      }
    }
    var student = {
      id: students.length + 1,
      name: document.getElementById("inputNome").value,
      email: document.getElementById("inputEmail").value,
      phone: document.getElementById("inputPhone").value,
      course: document.getElementById("selectCourses").value,
      shift: shiftValue,
    };

    console.log(student.shift);

    addNewRow(student);
    students.push(student);
    document.getElementById("studentsForm").reset();
  } catch (error) {
    console.log(`save error:${error}`);
  }
}
