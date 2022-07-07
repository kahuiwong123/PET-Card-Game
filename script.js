// Model
let student_data;
let teacher_data = [{ username: "user", password: "pass" }];
let teacher_username;

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
  if (typeof (student_form) === "undefined" || student_form === null) {
    const inputs = create_html(`
    <div id="student-form">
        <input id="student_name" type="text" placeholder="Name">
        <input id="student_class" type="text" placeholder="Class">
        <input id="student_code" type="text" placeholder="Code">
        <button class="student-login" onclick="student_login()">Login</button>
    </div>`
    );
    container.appendChild(inputs);
  } else {
    container.removeChild(student_form);
  }
}

const teacher_inputs = () => {
  const container = document.getElementById("teacher-container");
  const teacher_form = document.getElementById("teacher-form");
  if (typeof (teacher_form) === "undefined" || teacher_form === null) {
    const inputs = create_html(`
    <div id="teacher-form">
        <input id="teacher_user" type="text" placeholder="Username">
        <input id="teacher_pass" type="text" placeholder="Password">
        <button id="teacher-login" onclick="teacher_login()">Login</button>
    </div>`
    );
    container.appendChild(inputs);
  } else {
    container.removeChild(teacher_form);
  }
}

const render_add_student = () => {

}

const clear_textbox = (textbox) => {
  textbox.value = "";
}

// Controller

/** 
const add_student = () => {
  const student_name = document.getElementById("student_name");
  const student_class = document.getElementById("student_class");
  const student_code = document.getElementById("student_code");
  student_data.push({ name: student_name.value, class: student_class.value, code: student_code.value });
  save_students();
  clear_textbox(student_name);
  clear_textbox(student_class);
  clear_textbox(student_code);
  const container = document.getElementById("student-container");
  const student_form = document.getElementById("student-form");
  container.removeChild(student_form);
} */

const validate_student = (s_name, s_class, s_code) => {
  return student_data.some(student => {
    return student.name === s_name && student.class === s_class && student.code === s_code;
  });
}

const validate_teacher = (user, pass) => {
  return teacher_data.some(teacher => {
    return teacher.username === user && teacher.password === pass;
  });
}

const student_login = () => {
  const student_name = document.getElementById("student_name");
  const student_class = document.getElementById("student_class");
  const student_code = document.getElementById("student_code");
  if (student_name.value == "" || student_class.value == "" || student_code.value == "") {
    alert("One of the fields is empty! Please try again.")
  }
  else if (validate_student(student_name.value, student_class.value, student_code.value)) {
    alert("Student login successful!");
  } else {
    alert("Wrong student login information! Please try again.");
  }
}

const teacher_login = () => {
  const teacher_user = document.getElementById("teacher_user");
  const teacher_pass = document.getElementById("teacher_pass");
  const teacher_login_btn = document.getElementById("teacher-login");
  if (teacher_user.value == "" || teacher_pass.value == "") {
    alert("Username / Password cannot be empty! Please try again.");
  }
  else if (validate_teacher(teacher_user.value, teacher_pass.value)) {
    alert("Teacher login successful!");
    teacher_username = teacher_user.value;
    teacher_login_btn.onclick = window.location.href="Teacher/teacher.html"; 
  } else {
    alert("Wrong teacher login information! Please try again.");
  };
}


