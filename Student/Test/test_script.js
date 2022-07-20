// Model
let test;
let test_length;
let curr_question_num = 0;
let temp_test;
let current_score = 0;

// Controller
const get_next_question_controller = () => {
	if (temp_test.questions.length === 0) // if test is done, go to end page
		return;

	const questionIndex = Math.floor(Math.random() * temp_test.questions.length);
	get_next_question(questionIndex);
	let time = 25;
	const question_timer = document.querySelector("#timer");
	question_timer.innerHTML = `${time}`;
	timer(time);
	curr_question_num += 1;
	display_progress();
}

// View
$(function() {
	const test_name = new URLSearchParams(window.location.search).get("test");
	test = test_bank.find(t => t.name.trim() === test_name);
	test_length = test.num_questions;
	temp_test = structuredClone(test);
	get_next_question_controller();
});

const timer = (time) => {
	let timer = setInterval(function() {
		//html for timer goes here
		time--;
		const question_timer = document.querySelector("#timer");
		question_timer.innerHTML = `${time}`;
		question_timer.inner
		if (time <= 0) {
			clearInterval(timer);
			get_next_question_controller();
		}
	}, 1000);
}

const display_progress = () => {
	const question_progress = document.querySelector("#progress-text");
	question_progress.innerHTML = `${curr_question_num} / ${test_length}`;
	$("#green-progress").animate({ width: `${(curr_question_num / test_length) * 100}%` }, 500);
}

const points_calculator = (time, time_left) => {
	return ((time / (time - time_left)) * 600) + 400;
}

const get_next_question = index => {
	document.querySelector("#question-body").innerHTML = `
	<h1 id="question-title"></h1>
	<hr>
	<form id="answer-choices"></form>`; // clear container 
	document.querySelector("#question-title").textContent = temp_test.questions[index].question; // generate question title
	generate_answer_choices(index);
}

const generate_answer_choices = index => {
	const answer_choices = document.querySelector("#answer-choices");
	answer_choices.innerHTML = "";
	temp_test.questions[index].all_choices.forEach(choice => {
		const choice_el = create_html(`<input type='button' value='${choice.choice_val}'>`);
		answer_choices.appendChild(choice_el);
		choice_el.onclick = function() {
			if (choice.correct) {
				console.log("correct");
				// add point
			}
		};
	});
	console.log("test");
	temp_test.questions.splice(index, 1); // remove answered question
	// move to next question
}