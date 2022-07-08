//Model
const save_data = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const add_student = (name, s_class, code) => {
  student_data.push({ name: name, class: s_class, code: code });
  save_data("students", student_data);
  alert("Student successfully added!");
}

const delete_student = (button_name) => {
  student_data = student_data.filter(student => {
    if (student.code === button_name) {
      alert(student.name + " has been removed");
      return false;
    } else {
      return true;
    }
  });
  save_data("students", student_data);
}


const code_exists = (code) => {
  return student_data.some(student => {
    return student.code === code;
  });
}

//View
const generate_table = () => {
  const table = document.getElementById("student-info-table");
  if(!(table === null)){
    table.innerHTML = "";
  }
  const header = create_html(`<tr class="table-row-elem">
                      <th class="table-col-1">Name</th>
                      <th class="table-col-2">Class</th>
                      <th class="table-col-3">Code</th>
                      <th class="table-col-4">Delete</th>
                    </tr>`);
  table.appendChild(header);
  student_data.forEach(student => {
    const row_el = document.createElement("tr");
    row_el.classList.add("table-row-elem");
    
    const name_col = document.createElement("td");
    name_col.textContent = student.name;
    name_col.classList.add("table-col-1");

    const class_col = document.createElement("td");
    class_col.textContent = student.class;
    class_col.classList.add("table-col-2");
    
    const code_col = document.createElement("td");
    code_col.textContent = student.code;
    code_col.classList.add("table-col-3");

    const del_col = document.createElement("td");
    
    const button_col = document.createElement("button");
    button_col.textContent = "Delete";
    button_col.name = student.code;
    button_col.onclick = function () { delete_student_controller(button_col.name) };
    button_col.classList.add("table-col-4");

    del_col.appendChild(button_col);
    row_el.appendChild(name_col);
    row_el.appendChild(class_col);
    row_el.appendChild(code_col);
    row_el.appendChild(del_col);
    table.appendChild(row_el);
  });
}
setTimeout(generate_table, 100);

//Controller
document.getElementById("teacher-logout").onclick = function () { location.href = "../index.html" };

document.getElementById("create-question-btn").onclick = function () {
  location.href = "Question/question.html";
}

const add_student_controller = () => {
  const student_name = document.getElementById("stu-fullname");
  const student_class = document.getElementById("add-class-name");
  let student_code = generate_code();
  while (code_exists(student_code)) {
    student_code = generate_code();
  }

  if (student_name.value === "" || student_class.value === "") {
    alert("Student name / class cannot be empty!");
  } else {
    add_student(student_name.value, student_class.value, student_code);
    clear_textbox(student_name);
    setTimeout(generate_table, 1);
  }
}

const delete_student_controller = (button_name) => {
  delete_student(button_name);
  setTimeout(generate_table, 1);
}

const generate_code = () => {
  let generated_code = "";
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 3; i++) {
    generated_code += alpha.charAt(Math.floor(Math.random() * alpha.length));
    generated_code += Math.floor(Math.random() * 10);
  }
  return generated_code;
}
