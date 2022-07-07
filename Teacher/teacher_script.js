//Model
const save_data = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const add_student = (name, s_class, code) => {
  student_data.push({name:name, class:s_class, code:code});
  save_data("students", student_data);
  setTimeout(generate_table, 1);
}

const remove_all_students = () => {
  student_data.length = 0;
  save_data("students", student_data);
}

const student_exists = (s_name) => {
  return student_data.some(student => {
    return student.name === s_name;
  });
}

//View
const generate_table = () => {
  const table = document.getElementById("student-info-table");
  table.innerHTML = "";
  const header = create_html(`<tr>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Code</th>
                    </tr>`);
  table.appendChild(header);
  student_data.forEach(student => {
    const row_el = document.createElement("tr");
    
    const name_col = document.createElement("td");
    name_col.textContent = student.name;
    
    const class_col = document.createElement("td");
    class_col.textContent = student.class;

    const code_col = document.createElement("td");
    code_col.textContent = student.code;

    

    const button_col = document.createElement("button");
    button_col.textContent = "Delete";
    button_col.name = student.code;
    button_col.onclick = function () {delete_student(button_col.name)};
    
    row_el.appendChild(name_col);
    row_el.appendChild(class_col);
    row_el.appendChild(code_col);
    row_el.appendChild(button_col);
    table.appendChild(row_el);
  });
}
setTimeout(generate_table, 1);

//Controller
document.getElementById("teacher-logout").onclick = function () {location.href="../index.html"};

const delete_student = (button_name) => {
   student_data = student_data.filter(student => {
     if (student.code === button_name) {
       alert(student.name + " has been removed")
       return false;
     } else {
       return true;
     }
   });
   save_data("students", student_data);
   setTimeout(generate_table, 1);
} 

const add_student_controller = () => {
  const student_name = document.getElementById("stu-fullname");
  const student_class = document.getElementById("add-class-name");
  const student_code = generate_code();
  if (student_exists(student_name.value)) {
    alert("This student already exists in the system!")
  } else {
  add_student(student_name.value, student_class.value, student_code);
    alert("Student successfully added!");
  }
  clear_textbox(student_name);
}

const generate_code = () => {
  let generated_code = "";
  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let i = 0; i < 3; i++){
    generated_code += alpha.charAt(Math.floor(Math.random() * alpha.length));
    generated_code += Math.floor(Math.random() * 10);
  }
  return generated_code;
}