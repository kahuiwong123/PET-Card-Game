// Model
const load_data = (key) => {
	const saved_data = JSON.parse(localStorage.getItem(key));
	if (Array.isArray(saved_data) && saved_data.length > 0) {
		return saved_data;
	} else {
		return [];
	}
}

let classes = load_data("classes");
let test_bank = load_data("test_bank");

const add_question = (question, correct_choice, choices, question_code, test_name) => {
	const test = test_bank.find(t => t.name === test_name.value);
	choices_objects = [];
	choices.forEach(choice => {
		if (choice.value !== "") {
			let correct;
			(choice.id === correct_choice.value) ? correct = true : correct = false;
			choices_objects.push({ choice_val: choice.value, correct: correct });
		}
	});
	test.num_questions += 1;
	test.questions.push({ question: question.value, all_choices: choices_objects, code: question_code });
	save_data("test_bank", test_bank);
}

const delete_question = (button_name, test_name) => {
	const test = test_bank.find(t => t.name === test_name);
	test.questions = test.questions.filter(question => {
		if (question.code === button_name) {
			return false;
		} else {
			return true;
		}
	});
	test.num_questions -= 1;
	save_data("test_bank", test_bank);
}

const save_test = (name, subject) => {
	test_bank.push({ name: name.value, subject: subject.value, num_questions: 0, questions: [] });
	save_data("test_bank", test_bank);
	alert(`${name.value} has been added to the test bank!`);
}

const delete_test = (btn_id) => {
	test_bank = test_bank.filter(test => {
		if (test.name === btn_id) {
			alert(`${test.name} has been removed from the test bank!`);
			return false;
		} else {
			return true;
		}
	});
	save_data("test_bank", test_bank);
}

// View
$(function() {
	get_select_test();
	generate_test_table();
	get_class_options();
	$("option[value='correct-choice-blank']").attr("selected", "selected");

	$("#create-test-btn").on("click", function() {
		$("#create-test-form").slideToggle("fast", "linear");
	});

	$("#correct-choice-1").on("keyup change", function() {
		const checker = $.trim($(this).val()).length === 0;
		$("option[value='correct-choice-1']").attr("disabled", checker);
	});

	$("#correct-choice-2").on("keyup change", function() {
		const checker = $.trim($(this).val()).length === 0;
		$("option[value='correct-choice-2']").attr("disabled", checker);
	});

	$("#correct-choice-3").on("keyup change", function() {
		const checker = $.trim($(this).val()).length === 0;
		$("option[value='correct-choice-3']").attr("disabled", checker);
	});

	$("#correct-choice-4").on("keyup change", function() {
		const checker = $.trim($(this).val()).length === 0;
		$("option[value='correct-choice-4']").attr("disabled", checker);
	});

	$("#correct-choice-5").on("keyup change", function() {
		const checker = $.trim($(this).val()).length === 0;
		$("option[value='correct-choice-5']").attr("disabled", checker);
	});

	$(".view-btn").on("click", function() {
		$("#questions-answer-table").fadeIn("normal", "linear");
	});
});

document.getElementById("back-dashboard-button").onclick = function() { location.href = "../teacher.html" };
document.getElementById("question-logout-btn").onclick = function() { location.href = "../../index.html" };
const get_select_test = () => {
	const select_container = document.getElementById("select-test");
	select_container.innerHTML = "<option value='no-value' disabled>---</option>";
	test_bank.forEach(test => {
		const option = document.createElement("option");
		option.value = test.name;
		option.textContent = test.name;
		select_container.appendChild(option);
	});
}

const get_class_options = () => {
	const select_el = document.querySelector("#test-subject");
	classes.forEach(clas => {
		const option = document.createElement("option");
		option.value = clas.toLowerCase();
		option.textContent = clas.toUpperCase();
		select_el.appendChild(option);
	});
}

const generate_test_table = () => {
	const table = document.getElementById("test-table");
	table.innerHTML = "";
	if (test_bank.length !== 0) {
		const header = create_html(`
		<tr>
			<th>Delete</th>
			<th>Test name</th>
      <th>Subject</th>
      <th>Number of questions</th>
      <th>View question table</th>
		</tr>
	`);
		table.appendChild(header);
		test_bank.forEach(test => {
			const row = document.createElement("tr");
			const name = document.createElement("td");
			name.textContent = test.name;
			const subject = document.createElement("td");
			subject.textContent = test.subject;
			const num_questions = document.createElement("td");
			num_questions.textContent = test.num_questions;
			const delete_btn = document.createElement("td");
			delete_btn.innerHTML = "<input type='checkbox'>";
			delete_btn.firstElementChild.id = test.name;
			delete_btn.firstElementChild.onclick = function() { delete_test_controller(delete_btn.firstElementChild.id) };
			delete_btn.firstElementChild.classList.add("delete-button");
			const view_btn_container = document.createElement("td");
			view_btn_container.innerHTML = "<button>View questions</button>";
			view_btn_container.firstElementChild.addEventListener("click", function() { generate_question_table(test.name) });
			view_btn_container.firstElementChild.classList.add("view-btn");
			view_btn_container.firstElementChild.name = test.name;
			row.appendChild(delete_btn);
			row.appendChild(name);
			row.appendChild(subject);
			row.appendChild(num_questions);
			row.appendChild(view_btn_container);
			table.appendChild(row);
		});
	}
}

const generate_question_table = (test_name) => {
	const test = test_bank.find(t => t.name === test_name);
	const table = document.getElementById("questions-answer-table");
	table.innerHTML = "";
	if (test.questions.length !== 0) {
		const header = create_html(`<tr name="table-title">
                                <th>Question</th>
                                <th>Answer Choices</th>
                                <th>Correct Choice</th>
                                <th>Delete</th>
                              </tr>`);
		table.appendChild(header);
		test.questions.forEach(question => {
			const row_el = document.createElement("tr");

			const que_col = document.createElement("td");
			que_col.textContent = question.question;

			const correct_obj = question.all_choices.find(choice => choice.correct === true);
			const corr_choice_col = document.createElement("td");
			corr_choice_col.classList.add("correct-choice-td");
			corr_choice_col.textContent = (question.all_choices.indexOf(correct_obj) + 1) + ".) " + correct_obj.choice_val;

			//delete question
			const edit_col = document.createElement("button");
			edit_col.textContent = "Edit";
			edit_col.classList.add("edit-btn");
			const button_col = document.createElement("button");
			button_col.textContent = "Delete";
			button_col.name = question.code;
			button_col.onclick = function() { confirm_delete_question(button_col.name, test.name) };

			const btn_el = document.createElement("td");
			btn_el.appendChild(edit_col);
			btn_el.appendChild(button_col);
			const ans_el = document.createElement("td");

			for (let i = 0; i < question.all_choices.length; i++) {
				if (question.all_choices[i].choice_val !== "") {
					const choice_col = document.createElement("tr");
					choice_col.textContent = `${i + 1}.) ` + question.all_choices[i].choice_val;
					choice_col.classList.add("inner-tr");
					ans_el.appendChild(choice_col);
				}
			}
			row_el.appendChild(que_col);
			row_el.appendChild(ans_el);
			row_el.appendChild(corr_choice_col);
			row_el.appendChild(btn_el);
			table.appendChild(row_el);
		});
	}
}

// Controller
const add_question_controller = () => {
	const test_name = document.getElementById("select-test");
	const test = test_bank.find(t => t.name === test_name.value);
	const question = document.getElementById("question-input");
	const choice_1 = document.getElementById("correct-choice-1");
	const choice_2 = document.getElementById("correct-choice-2");
	const choice_3 = document.getElementById("correct-choice-3");
	const choice_4 = document.getElementById("correct-choice-4");
	const choice_5 = document.getElementById("correct-choice-5");
	const correct_choice = document.getElementById("correct-answer-choice");
	const ans_choices = [choice_1, choice_2, choice_3, choice_4, choice_5];
	let inputs = [choice_1.value, choice_2.value, choice_3.value, choice_4.value, choice_5.value];
	inputs = inputs.filter(element => {
		return element !== "";
	});
	const question_code = test_name.value + "/" + question.value + "/" + correct_choice.value;

	if (validate_add_question(test, inputs, question.value, correct_choice.value)) {
		add_question(question, correct_choice, ans_choices, question_code, test_name);
		alert("Question successfully added!");
		generate_question_table(test_name.value);
		generate_test_table();
	}
}

const validate_add_question = (test, input_array, question_val, correct_choice_val) => {
	if (test_bank.length === 0) {
		alert("There are currently no tests!");
		return false;
	}

	else if (question_val === "") {
		const question_text = document.getElementById("question-input");
		question_text.placeholder = "Question cannot be empty!";
		return false;
	}

	else if (correct_choice_val === "correct-choice-blank") {
		alert("Please choose the correct answer choice!");
		return false;
	}
	else if (input_array.length < 2) {
		alert("Question must have at least 2 choices!");
		return false;
	}

	else if (test.questions.some(q => q.question === question_val)) {
		alert("This question is already on the test!");
		return false;
	}

	else if ((new Set(input_array)).size !== input_array.length) {
		alert("Choices cannot contain duplicates!");
		return false;
	}

	return true;
}

const delete_question_controller = (button_name, test_name) => {
	delete_question(button_name, test_name);
	generate_test_table();
	generate_question_table(test_name);
}


const save_test_controller = () => {
	const test_name = document.getElementById("test-name");
	const test_subject = document.getElementById("test-subject");
	if (test_bank.some(test => test.name === test_name.value)) {
		alert(test_name.value + " " + "is already in the test bank!");
	}

	else if (test_name.value === "" || test_subject.value === "") {
		alert("One of the inputs is empty! Please try again.");
	} else {
		save_test(test_name, test_subject);
		get_select_test();
		generate_test_table();
	}
}

let curr_btn = "";
let test_name_var = "";
remove_item = true;

const popup_remove = () => {
	document.getElementById("delete-pop-up").style.visibility = "hidden";
	remove_item = true;
	delete_test(curr_btn);
	generate_test_table();
	get_select_test();
	generate_question_table(test_name_var);
}

const popup_keep = () => {
	remove_item = false;
	document.getElementById("delete-pop-up").style.visibility = "hidden";
	document.getElementById(curr_btn).checked = false;
}

const delete_test_controller = (btn_id, test_name) => {
	curr_btn = btn_id;
	test_name_var = test_name;
	document.getElementById("delete-pop-up").style.visibility = "visible";
	get_select_test();
}

const confirm_delete_question = (button_name, test_name) => {
	if (confirm("Do you want to delete this question?")) {
		delete_question_controller(button_name, test_name);
	}
}

