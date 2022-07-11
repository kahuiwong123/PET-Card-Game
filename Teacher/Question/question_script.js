// Model
let questions = [];
let test = { name: "name", subject: "math", num_questions: 100, questions: questions };
let test_bank;

const load_data = (key) => {
	const saved_data = JSON.parse(localStorage.getItem(key));
	if (Array.isArray(saved_data) && saved_data.length > 0) {
		return saved_data;
	} else {
		return [];
	}
}

test_bank = load_data("test_bank");

const add_question = (question, correct_choice, choices, question_code, test_name) => {
	const test = test_bank.find(t => t.name === test_name.value);
	choices_objects = [];
	choices.forEach(choice => {
		let correct;
		(choice.id === correct_choice.value) ? correct = true : correct = false;
		choices_objects.push({ choice_val: choice.value, correct: correct });
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
	alert("Question has been deleted!");
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
	$("#create-test-btn").on("click", function() {
		$("#create-test-form").slideToggle("fast", "linear");
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

const generate_test_table = () => {
	const table = document.getElementById("test-table");
	if (table !== null) {
		table.innerHTML = "";
	}

	if (test_bank.length !== 0) {
		const header = create_html(`
		<tr>
			<th/>
			<th>Test name</th>
      <th>Subject</th>
      <th>Number of questions</th>
      <th>View question table</th>
		</tr>
	`);
		table.appendChild(header);
	}
	test_bank.forEach(test => {
		const row = document.createElement("tr");
		const name = document.createElement("td");
		name.textContent = test.name;
		const subject = document.createElement("td");
		subject.textContent = test.subject;
		const num_questions = document.createElement("td");
		num_questions.textContent = test.num_questions;
		const view_btn = document.createElement("button");
		view_btn.textContent = "View questions";
		view_btn.onclick = function() { generate_question_table(test.name) };
		const delete_btn = document.createElement("td");
		delete_btn.innerHTML = "<input type='checkbox'>";
		delete_btn.firstElementChild.id = test.name;
		delete_btn.firstElementChild.onclick = function() { delete_test_controller(delete_btn.firstElementChild.id) };
		row.appendChild(delete_btn);
		row.appendChild(name);
		row.appendChild(subject);
		row.appendChild(num_questions);
		row.appendChild(view_btn);
		table.appendChild(row);
	});
}

const generate_question_table = (test_name) => {
	const test = test_bank.find(t => t.name === test_name);
	const table = document.getElementById("questions-answer-table");

	if (!(table === null)) {
		table.innerHTML = "";
	}
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

		const choice1_col = document.createElement("tr");
		choice1_col.textContent = "1.) " + question.all_choices[0].choice_val;
		const choice2_col = document.createElement("tr");
		choice2_col.textContent = "2.) " + question.all_choices[1].choice_val;
		const choice3_col = document.createElement("tr");
		choice3_col.textContent = "3.) " + question.all_choices[2].choice_val;
		const choice4_col = document.createElement("tr");
		choice4_col.textContent = "4.) " + question.all_choices[3].choice_val;

		const correct_obj = question.all_choices.find(choice => choice.correct === true);
		const corr_choice_col = document.createElement("td");
		corr_choice_col.textContent = (question.all_choices.indexOf(correct_obj) + 1) + ".) " + correct_obj.choice_val;

		//delete question
		const edit_col = document.createElement("button");
		edit_col.textContent = "Edit";
		const button_col = document.createElement("button");
		button_col.textContent = "Delete";
		button_col.name = question.code;
		button_col.onclick = function() { delete_question_controller(button_col.name, test.name) };

		const btn_el = document.createElement("td");
		btn_el.appendChild(edit_col);
		btn_el.appendChild(button_col);

		const ans_el = document.createElement("td");
		ans_el.appendChild(choice1_col);
		ans_el.appendChild(choice2_col);
		ans_el.appendChild(choice3_col);
		ans_el.appendChild(choice4_col);

		row_el.appendChild(que_col);
		row_el.appendChild(ans_el);
		row_el.appendChild(corr_choice_col);
		row_el.appendChild(btn_el);
		table.appendChild(row_el);
	});
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
	const correct_choice = document.getElementById("correct-answer-choice");
	const ans_choices = [choice_1, choice_2, choice_3, choice_4];
	const ans_choices2 = [choice_1.value, choice_2.value, choice_3.value, choice_4.value];
	const question_code = test_name.value + "/" + question.value + "/" + correct_choice.value;
	let proceed = true;

	if (test_bank.length === 0) {
		alert("There are currently no tests!");
		proceed = false;
	}

	else if (test.questions.some(q => q.question === question.value)) {
		alert("This question is already on the test!");
		proceed = false;
	}

	else if (empty_choice_exists(ans_choices)) {
		proceed = false;
	}

	else if (question.value === "") {
		alert("Question cannot be empty!");
		proceed = false;
	}

	else if (correct_choice.value === "correct-choice-blank") {
		alert("Correct choice cannot be empty!");
		proceed = false;
	}

	else if ((new Set(ans_choices2)).size !== ans_choices2.length) {
		alert("Choices cannot contain duplicates!");
		proceed = false;
	}

	if (proceed) {
		add_question(question, correct_choice, ans_choices, question_code, test_name);
		alert("Question successfully added!");
		generate_question_table(test_name.value);
		generate_test_table();
	}
}

const delete_question_controller = (button_name, test_name) => {
	delete_question(button_name, test_name);
	generate_question_table(test_name);
	generate_test_table();
}

const empty_choice_exists = (ans_choices) => {
	for (let i = 0; i < ans_choices.length; i++) {
		if (ans_choices[i].value === "") {
			alert(`Answer Choice ${i + 1} cannot be empty!`);
			return true;
		}
	}
	return false;
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
		generate_test_table();
		get_select_test();
	}
}

const delete_test_controller = (btn_id) => {
	delete_test(btn_id);
	generate_test_table();
	get_select_test();
}