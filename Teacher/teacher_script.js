//Model
// import { student_data, classes_data, teachers_data, load_info, save_info, create_html } from "../script.js";
// import {test_bank} from "./Question/question_script.js";

const add_student = (name, code) => {
	student_data.push({ name: name, nickname: "", classes: [], code: code, tests: [] });
	student_data.sort((a, b) => (a.name < b.name) ? -1 : 1);
	save_info("students", student_data);
	alert(`${name} successfully added!`);
}
const delete_student = (button_name) => {
	student_data = student_data.filter(student => {
		if (student.code === button_name) {
			return false;
		} else {
			return true;
		}
	});
	save_info("students", student_data);
}

const create_class = (class_name) => {
	classes_data.push(class_name.toLowerCase());
	classes_data.sort();
	save_info("classes", classes_data);
	alert(`${class_name} successfully added!`);
}


const class_exists = (_class) => {
	return classes_data.some(exist_class => {
		return exist_class === _class;
	});
}


const code_exists = (code) => {
	return student_data.some(student => {
		return student.code === code;
	});
}

const assign_class = (class_el, codes_el) => {
	let message = "";
	let error_msg = "";
	if (codes_el.length === 0) {
		alert("Please select a student!");
	} else {
		const students = (Array.from(codes_el)).map(code_el => student_data.find(student => student.code === code_el.value));
		students.forEach(student => {
			if (student.classes.includes(class_el.value)) {
				error_msg += student.name + ", ";
			} else {
				student.classes.push(class_el.value);
				message += student.name + ", ";
			}
		});
		if (error_msg !== "") {
			let plural;
			error_msg.split(',').length - 1 === 1 ? plural = "is" : plural = "are";
			alert(`${error_msg.slice(0, -2)} ${plural} already in the ${class_el.value} class!`);
		}
		if (message !== "") {
			let plural;
			message.split(',').length - 1 === 1 ? plural = "has" : plural = "have";
			alert(`${message.slice(0, -2)} ${plural} been added to the ${class_el.value} class!`);
		}
		save_info("students", student_data);
		generate_table();
	}
}

const deassign_class = (class_el, codes_el) => {
	const students = (Array.from(codes_el)).map(code_el => student_data.find(student => student.code === code_el.value));
	if (codes_el.length === 0) {
		alert("Please select a student!");
	} else {
		students.forEach(student => {
			if (!student.classes.includes(class_el.value)) {
				alert(`${student.name} is not in the ${class_el.value} class!`);
			} else {
				student.classes = student.classes.filter(clas => { return clas !== class_el.value });
				alert(`${student.name} has been removed from the ${class_el.value} class!`);
			}
		});
		save_info("students", student_data);
		generate_table();
	}
}

const confirm_send_test = (selected_tests_el, selected_class_el) => {
	const selected_class = selected_class_el.value;
	const error_container = document.getElementById("send-error");
	const correct_container = document.getElementById("correct-msg");
	error_container.innerHTML = "";
	correct_container.innerHTML = "";
	let wrong_class_msg = "";
	let selected_tests = (Array.from(selected_tests_el)).map(test_el => test_bank.find(test => test.name === test_el.value));
	selected_tests = selected_tests.filter(test => {
		if (test.subject !== selected_class) {
			wrong_class_msg += test.name + ", ";
			return false;
		} else {
			return true;
		}
	});
	if (wrong_class_msg !== "") {
		let plural;
		wrong_class_msg.split(',').length - 1 === 1 ? plural = "do" : plural = "does";
		// error_container.innerHTML = `&#8226; ${wrong_class_msg.slice(0, -2)}'s subject ${plural} not correspond with the ${selected_class} class! <br>`;
		alert(`${wrong_class_msg.slice(0, -2)}'s subject ${plural} not correspond with the ${selected_class} class!`);
	}

	if (!student_data.some(student => student.classes.includes(selected_class))) {
		// error_container.innerHTML += `&#8226; the ${selected_class} class does not have any students! <br>`;
		alert(`the ${selected_class} class does not have any students!`);
	}

	student_data.forEach(student => {
		let error_message = "";
		let correct_message = "";
		selected_tests.forEach(test => {
			if (student.tests.some(t => t.name === test.name)) { // if the student already has the test
				student.tests = student.tests.filter(_test => {
					if (_test.name === test.name) {
						// student.tests.push(test);
						// console.log(student.tests);
						return false;

					} else {
						// console.log(student.tests);
						return true;
					}
				});
				// console.log(student.tests);
				student.tests.push(test);
				error_message += test.name + ", ";
				save_info("students", student_data);
			}
			else if (student.classes.includes(selected_class)) {
				student.tests.push(test);
				correct_message += test.name + ", ";
				save_info("students", student_data);
			}
		});

		//err_message -> update when its the same exam
		if (error_message !== "") {
			let plural;
			error_message.split(',').length - 1 === 1 ? plural = "is" : plural = "are";
			// error_container.innerHTML += `&#8226; ${error_message.slice(0, -2)} ${plural} already received by ${student.name}! <br>`
			alert(`${error_message.slice(0, -2)} ${plural} has been resent to ${student.name}!`);
		}

		if (correct_message !== "") {
			let plural;
			correct_message.split(',').length - 1 === 1 ? plural = "has" : plural = "have";
			// correct_container.innerHTML += `&#8227; ${correct_message.slice(0, -2)} ${plural} been assigned to ${student.name}! <br>`;
			alert(`${correct_message.slice(0, -2)} ${plural} been assigned to ${student.name}!`);
		}
	});
}

//View
$(function() {
	document.querySelector("#create-question-btn").addEventListener("click", function() { window.location.href = 'Question/question.html' });
	document.querySelector("#log-out-btn").addEventListener("click", function() { window.location.href = '../Student/student.html' });
	document.querySelector("#teacher-logout").addEventListener("click", function() { window.location.href = '../index.html' });
	document.querySelector("#confirm-send-btn").addEventListener("click", function() { confirm_send_test_controller() });
	document.querySelector("#teacher-add-stu").addEventListener("click", function() { add_student_controller() });
	document.querySelector("#assign-class-btn").addEventListener("click", function() { assign_class_controller() });
	document.querySelector("#deassign-class-btn").addEventListener("click", function() { deassign_class_controller() });
	document.querySelector("#create-class-btn").addEventListener("click", function() { add_class_controller() });
	document.querySelector("#remove-class-btn").addEventListener("click", function() { remove_class_controller() });
	get_select_send_test();
	get_student_codes();
	generate_class_option();
	get_view_students();
	$(".chzn-select").chosen();
	generate_table();
	show_cur_class();
	document.querySelector("#view-student-btn").addEventListener("click", function () {
		const selected_student = document.querySelector("#select-view-student").value;
		const student_info = selected_student.split("-");
		window.location.href = `../Student/student.html?student_name=${student_info[0]}&student_code=${student_info[1]}&is_teacher=true`;
	});
});

//generate options when adding a class to students 
const get_student_codes = () => {
	const code_select = document.querySelector("#select-student-code");
	code_select.innerHTML = "";
	student_data.forEach(student => {
		const option = document.createElement("option");
		option.value = student.code;
		option.textContent = `${student.code}: ${student.name}`;
		code_select.appendChild(option);
	});
	$("#select-student-code").trigger("chosen:updated");
}

const get_view_students = () => {
	const select_el = document.querySelector("#select-view-student");
	select_el.innerHTML = "";
	student_data.forEach(student => {
		select_el.appendChild(create_html(`<option value=${student.name}-${student.code}>${student.name} (${student.code})</option>`));
	});
}

// generate options in "Select tests to send" input
const get_select_send_test = () => {
	const select_container = document.getElementById("select-send-test");
	select_container.innerHTML = "<option value='no-value' disabled>---</option>";
	test_bank.forEach(test => {
		const option = document.createElement("option");
		option.value = test.name;
		option.textContent = test.name;
		select_container.appendChild(option);
	});
}

// generates dropdown options for selecting classes on the teacher page
const generate_class_option = () => {
	const add_stu_sele = document.getElementById("add-class-name");
	const send_class_sele = document.getElementById("select-send-class");
	const rem_class_sele = document.getElementById("remove_class_sel");
	add_stu_sele.innerHTML = "<option value='' disabled>-----</option>";
	send_class_sele.innerHTML = "<option value='' disabled>-----</option>";
	rem_class_sele.innerHTML = "<option value='' disabled>-----</option>";
	classes_data.forEach(_class => {
		const option = document.createElement("option");
		option.value = _class.toLowerCase();
		option.textContent = _class.toUpperCase();

		const option2 = document.createElement("option");
		option2.value = _class.toLowerCase();
		option2.textContent = _class.toUpperCase();

		const option3 = document.createElement("option");
		option3.value = _class.toLowerCase();
		option3.textContent = _class.toUpperCase();

		add_stu_sele.appendChild(option);
		send_class_sele.appendChild(option2);
		rem_class_sele.appendChild(option3);
	})
}

const show_cur_class = () => {
	const curr_classes = document.getElementById("current-classes");
	curr_classes.innerHTML = "";
	classes_data.forEach(clas => {
		const list_el = document.createElement("li");
		list_el.textContent = clas.toUpperCase();
		curr_classes.appendChild(list_el);
	});
}

const generate_table = () => {
	const table = document.getElementById("student-info-table");
	table.innerHTML = "";
	if (student_data.length !== 0) {
		const header = create_html(`<tr class="table-row-elem">
            <th class="table-col-1">Name</th>
            <th class="table-col-2">Class</th>
            <th class="table-col-3">Code</th>
            <th class="table-col-4">Delete</th>
          </tr>`);
		table.appendChild(header);
		student_data.forEach(student => {
			const row_el = document.createElement("tr");
			row_el.classList.add("student-row");

			const name_col = document.createElement("td");
			name_col.textContent = student.name;
			name_col.classList.add("table-col-1");

			const class_col = document.createElement("td");

			if (student.classes.length > 0) {
				class_col.textContent = student.classes.join(", ");
			} else {
				class_col.textContent = "none"
			}

			class_col.classList.add("table-col-2");

			const code_col = document.createElement("td");
			code_col.textContent = student.code;
			code_col.classList.add("table-col-3");

			const del_col = document.createElement("td");
			del_col.classList.add("delete-btn-container");

			const button_col = document.createElement("button");
			button_col.textContent = "Delete";
			button_col.name = student.code;
			del_col.appendChild(button_col);
			button_col.addEventListener("click", function() { confirm_delete_student(button_col.name) });
			row_el.appendChild(name_col);
			row_el.appendChild(class_col);
			row_el.appendChild(code_col);
			row_el.appendChild(del_col);
			row_el.classList.add("student-row-el");
			table.appendChild(row_el);
		});
	}
}

//Controller
const add_student_controller = () => {
	const student_name = document.getElementById("stu-fullname");
	let student_code = generate_code();
	while (code_exists(student_code)) {
		student_code = generate_code();
	}

	if (student_name.value === "") {
		alert("Student name cannot be empty!");
		return;
	}
	add_student(student_name.value, student_code);
	generate_table();
	get_view_students();
	get_student_codes();
}

const delete_student_controller = (button_name) => {
	delete_student(button_name);
	generate_table();
	get_view_students();
	get_student_codes();
}

const remove_class_controller = () => {
	let selected_class = $("#remove_class_sel option:selected").text().toLowerCase();

	if (selected_class === "english" || selected_class === "math" || selected_class === "art" || selected_class === "history") {
		alert(`Default Class ${selected_class} can not be removed`);
		return;
	}
	classes_data = classes_data.filter(_class => {
		if (_class === selected_class && confirm("Confirm to remove class!")) {
			alert(`${selected_class} has been removed`);
			return false;
		}
		else {
			return true;
		}
	});
	student_data.forEach(student => {
		student.classes = student.classes.filter(clas => { return clas !== selected_class });
	});

	save_info("classes", classes_data);
	save_info("students", student_data);
	show_cur_class();
	generate_table();
	generate_class_option();
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

const confirm_delete_student = (button_name) => {
	const student = student_data.find(student => student.code === button_name);
	if (confirm(`Do you want to delete ${student.name}?`)) {
		delete_student_controller(button_name);
	}
}

const confirm_send_test_controller = () => {
	const selected_class_el = document.getElementById("select-send-class");
	const selected_tests_el = document.getElementById("select-send-test").selectedOptions;
	confirm_send_test(selected_tests_el, selected_class_el);
}


const add_class_controller = () => {
	const class_name = document.getElementById("new_class_name");
	if (class_name.value === "" || class_name.value === "") {
		alert("Class Name cannot be empty!")
	} else {
		if (class_exists(class_name.value)) {
			alert(`${class_name.value} already esist`);
		} else if (confirm("Confirm to add class!") == true) {
			create_class(class_name.value);
			generate_class_option();
			show_cur_class();
		} else {
			alert(`${class_name.value} has NOT been added`);
		}
	}
}

const assign_class_controller = () => {
	const class_el = document.querySelector("#add-class-name");
	const codes_el = document.querySelector("#select-student-code").selectedOptions;
	assign_class(class_el, codes_el);
}

const deassign_class_controller = () => {
	const class_el = document.querySelector("#add-class-name");
	const codes_el = document.querySelector("#select-student-code").selectedOptions;
	deassign_class(class_el, codes_el);
}