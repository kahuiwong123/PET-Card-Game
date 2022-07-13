//Model
const save_data = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
}

const add_student = (name, s_class, code) => {
	student_data.push({ name: name, class: s_class, code: code, tests: [] });
	save_data("students", student_data);
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
	save_data("students", student_data);
}

const code_exists = (code) => {
	return student_data.some(student => {
		return student.code === code;
	});
}

const confirm_send_test = (selected_tests_el, selected_class_el) => {
	const selected_class = document.getElementById("select-send-class").value;
	let error_message_1 = "";
	let error_message_2 = "";
	const error_container = document.getElementById("send-error");
	error_container.innerHTML = "";
	let selected_tests = (Array.from(selected_tests_el)).map(test_el => test_el.value);

	if (!student_data.some(student => student.class === selected_class)) {
		error_container.innerHTML += `&#8226; ${selected_class} does not have any students! <br>`
	}
	
	student_data.forEach(student => {
		if (student.tests.some(test => test.name === selected_test.name)) {
			error_message_1 += student.name + ", ";

		} else {
			selected_classes.forEach(clas => {
				if (student.class === clas) {
					student.tests.push(selected_test);
					alert(`${student.name} has received ${selected_test.name}!`);
				}
			});
		}
	});

	if (error_message_1 !== "") {
		const message = ("The following students already received this test: " + error_message_1).slice(0, -2);
		error_container.innerHTML += `&#8226; ${message} <br>`;
	}
	save_data("students", student_data);
}

//View
$(function() {
	get_select_send_test();
	$(".chzn-select").chosen();
	generate_table();
});

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
			class_col.textContent = student.class;
			class_col.classList.add("table-col-2");

			const code_col = document.createElement("td");
			code_col.textContent = student.code;
			code_col.classList.add("table-col-3");

			const del_col = document.createElement("td");

			const button_col = document.createElement("button");
			button_col.textContent = "Delete";
			button_col.name = student.code;
			button_col.classList.add("delete-student-btn");
			button_col.onclick = function() { confirm_delete_student(button_col.name) };

			del_col.appendChild(button_col);
			row_el.appendChild(name_col);
			row_el.appendChild(class_col);
			row_el.appendChild(code_col);
			row_el.appendChild(del_col);
			table.appendChild(row_el);
		});
	}
}

//Controller
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
		generate_table();
	}
}

const delete_student_controller = (button_name) => {
	delete_student(button_name);
	generate_table();
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
