// Model
<<<<<<< HEAD
// import { default_classes, default_students } from "./default.js";

=======
>>>>>>> 7b92dbdd6763da55aaa321e7de8c273ec0545320
const load_info = (key, default_val) => {
	const saved_data = JSON.parse(localStorage.getItem(key));
	if (Array.isArray(saved_data) && saved_data.length > 0) {
		return saved_data;
	}
	return default_val;
}

const save_info = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
<<<<<<< HEAD
}

let classes_data = load_info("classes", default_classes);
let student_data = load_info("students", []);
let teachers_data = [{ username: "user", password: "pass" }];


// View
$(function() {
	$("#student-button").on("click", function() { student_inputs() });
	$("#teacher-button").on("click", function() { teacher_inputs() });
});

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
    <form id="student-form" action="Student/student.html" method="get">
        <input id="student_name" name="student_name" type="text" placeholder="Name" required>
        <input id="student_code"  name="student_code" type="text" placeholder="Code" required>
        <button id="student-login" type="submit">Login</button>
    </form>`
		);
		container.appendChild(inputs);
		document.querySelector("#student-login").addEventListener("keydown", function(event) { student_login2(event) });
		document.querySelector("#student-login").addEventListener("click", function(event) { student_login(event) });
	} else {
		container.removeChild(student_form);
	}
}

const teacher_inputs = () => {
	const container = document.getElementById("teacher-container");
	const teacher_form = document.getElementById("teacher-form");
	if (typeof (teacher_form) === "undefined" || teacher_form === null) {
		const inputs = create_html(`
    <form id="teacher-form" action="Teacher/teacher.html" method="get">
        <input id="teacher_user" type="text" placeholder="Username"" required>
        <input id="teacher_pass" type="password" placeholder="Password"" required>
        <button id="teacher-login" type="submit">Login</button>
    </form>`
		);
		container.appendChild(inputs);
		document.querySelector("#teacher-login").addEventListener("keydown", function(event) { teacher_login2(event) });
		document.querySelector("#teacher-login").addEventListener("click", function(event) { teacher_login(event) });
	} else {
		container.removeChild(teacher_form);
	}
}

// Controller
const validate_student = (s_name, s_code) => {
	return student_data.some(student => {
		return student.name === s_name && student.code === s_code;
	});
}

const validate_teacher = (user, pass) => {
	return teachers_data.some(teacher => {
		return teacher.username === user && teacher.password === pass;
	});
}

const student_login = (event) => {
	const student_name = document.getElementById("student_name");
	const student_code = document.getElementById("student_code");
	const log_in_btn = document.getElementById("student-login");
	if (student_name.value === "" || student_code.value === "") {
		alert("One of the fields is empty! Please try again.");
	}
	else if (validate_student(student_name.value, student_code.value)) {
		alert("Student login successful!");
		log_in_btn.onclick = window.location.href = "Student/student.html";
	} else {
		alert("Wrong student login information! Please try again.");
		event.preventDefault();
	}
}

const student_login2 = (event) => {
	event.preventDefault();
=======
}

let classes_data = load_info("classes", ["art", "english", "history", "math"]);
let student_data = load_info("students", []);
let teachers_data = [{ username: "user", password: "pass" }]; // placeholder


// View
$(function() {
	$("#student-button").on("click", student_inputs);
	$("#teacher-button").on("click", teacher_inputs);
});

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
    <form id="student-form" action="Student/student.html" method="get">
        <input id="student_name" name="student_name" type="text" placeholder="Name" onkeypress="student_login2(event)" required>
        <input id="student_code"  name="student_code" type="text" placeholder="Code" onkeypress="student_login2(event)" required>
        <button id="student-login" type="submit" onclick="student_login()">Login</button>
    </form>`
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
        <input id="teacher_user" type="text" placeholder="Username" onkeypress="teacher_login2(event)" required>
        <input id="teacher_pass" type="password" placeholder="Password" onkeypress="teacher_login2(event)" required>
        <button id="teacher-login" type="submit" onclick="teacher_login()">Login</button>
    </div>`
		);
		
		container.appendChild(inputs);
	} else {
		container.removeChild(teacher_form);
	}
}

const clear_textbox = (textbox) => {
	textbox.value = "";
}

// Controller
const validate_student = (s_name, s_code) => {
	return student_data.some(student => {
		return student.name === s_name && student.code === s_code;
	});
}

const validate_teacher = (user, pass) => {
	return teachers_data.some(teacher => {
		return teacher.username === user && teacher.password === pass;
	});
}

const student_login = () => {
	const student_name = document.getElementById("student_name");
	const student_code = document.getElementById("student_code");
	const log_in_btn = document.getElementById("student-login");
	if (student_name.value === "" || student_code.value === "") {
		alert("One of the fields is empty! Please try again.");
	}
	else if (validate_student(student_name.value, student_code.value)) {
		alert("Student login successful!");
		log_in_btn.onclick = window.location.href = "Student/student.html";
	} else {
		alert("Wrong student login information! Please try again.");
		clear_textbox(student_name);
		clear_textbox(student_code);
	}
}

const student_login2 = (event) => {
>>>>>>> 7b92dbdd6763da55aaa321e7de8c273ec0545320
	if (event.keyCode == 13) {
		student_login();
	}
}
<<<<<<< HEAD

const teacher_login = (event) => {
=======

const teacher_login = () => {
>>>>>>> 7b92dbdd6763da55aaa321e7de8c273ec0545320
	const teacher_user = document.getElementById("teacher_user");
	const teacher_pass = document.getElementById("teacher_pass");
	const teacher_login_btn = document.getElementById("teacher-login");
	if (teacher_user.value == "" || teacher_pass.value == "") {
		alert("Username / Password cannot be empty! Please try again.");
	}
	else if (validate_teacher(teacher_user.value, teacher_pass.value)) {
		alert("Teacher login successful!");
		teacher_login_btn.onclick = window.location.href = "Teacher/teacher.html";
	} else {
		alert("Wrong teacher login information! Please try again.");
<<<<<<< HEAD
		event.preventDefault();
=======
>>>>>>> 7b92dbdd6763da55aaa321e7de8c273ec0545320
	};
}

const teacher_login2 = (event) => {
<<<<<<< HEAD
	event.preventDefault();
	if (event.keyCode == 13) {
		teacher_login();
	}
}

// export { student_data, classes_data, teachers_data, load_info, save_info, create_html };



=======
	if (event.keyCode == 13) {
		teacher_login()
	}
}

// export {student_data, classes_data, teachers_data, load_info, save_info, create_html};
>>>>>>> 7b92dbdd6763da55aaa321e7de8c273ec0545320




<<<<<<< HEAD
=======



>>>>>>> 7b92dbdd6763da55aaa321e7de8c273ec0545320
