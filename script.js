// Model
let student_data;
let all_students = [{name: "John Doe", class:"math", code:"H8W1"},
                   {name: "Jane Doe", class:"english",code:"H8W2"},
                   {name: "Tom", class:"art", code:"H8W3"}];

const load_students = () => {
 const saved_students = JSON.parse(localStorage.getItem("students"));
  if (Array.isArray(saved_students) && saved_students.length > 0) {
    student_data = saved_students;
  } else {
    student_data = [];
  }
}

load_students();

const save_students = () => {
  localStorage.setItem("students", JSON.stringify(student_data));
}
// View
const create_html = (html) => {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}

const student_inputs = () => {
    const container = document.getElementById("student-container");
    const student_form = document.getElementById("student-form");
    if (typeof(student_form) === "undefined" || student_form === null) {
    const inputs = create_html(`
    <div id="student-form">
        <input id="student_name" type="text" placeholder="Name">
        <input id="student_class" type="text" placeholder="Class">
        <input id="student_code" type="text" placeholder="Code">
        <button class="student-submit" onclick="validate_student()">Login</button>
    </div>`
    );
    container.appendChild(inputs);
    } else {
      container.removeChild(student_form);
    }
}

const clear_textbox = (textbox) => {
  textbox.value = "";
}

// Controller
const add_student = () => {
   const student_name = document.getElementById("student_name");
   const student_class = document.getElementById("student_class");
   const student_code = document.getElementById("student_code");
   student_data.push({name:student_name.value,class:student_class.value, code:student_code.value});
   save_students();
   clear_textbox(student_name);
   clear_textbox(student_class);
   clear_textbox(student_code);
   const container = document.getElementById("student-container");
   const student_form = document.getElementById("student-form");
   container.removeChild(student_form);
}

const validate_student = () => {
    let valid = false;
    const student_name = document.getElementById("student_name");
    const student_class = document.getElementById("student_class");
    const student_code = document.getElementById("student_code");
    all_students.forEach(function(student){
      console.log([student.name, student.class, student.code])
      if (student.name === student_name.value && student.class === student_class.value && student.code === student_code.value) {
        valid = true;
      }
    });
  if(valid){
    alert("login successful");
    
    return true;
  }else{
    alert("login unsuccessful");
    return false;
  }
} 











const teacher_inputs = () => {
    const container = document.getElementById("teacher-container");
    const teacher_form = document.getElementById("teacher-form");
    if (typeof(teacher_form) === "undefined" || teacher_form === null) {
    const inputs = create_html(`
    <div id="teacher-form">
        <input id="teacher_user" type="text" placeholder="Username">
        <input id="teacher_pass" type="text" placeholder="Password">
        <button class="teacher-login" onclick="teacher_login()">Login</button>
    </div>`
    );
    container.appendChild(inputs);
    } else {
      container.removeChild(teacher_form);
    }
}

const teacher_login = () => {
  const teacher_user = document.getElementById("teacher_user");
  const teacher_pass = document.getElementById("teacher_pass");
  if(teacher_user.value === "user" && teacher_pass.value === "pass"){
    alert("login successful");
  }else{
    alert("wrong login information");
  }
}


