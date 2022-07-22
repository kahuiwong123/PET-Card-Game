// Model
let student_obj;
let test;
let test_length;
let curr_timer;
let curr_question_num = 1;
let temp_test;
let given_time = 10;
let current_score = 0;
let completion_time = 0;

const save_score = () => {
	test.scores.push({ score_val: current_score, completion_time: completion_time, date: new Date().toLocaleDateString() });
	save_info("students", student_data);
	alert("Your score has been saved!");
}

// Controller
const get_next_question_controller = () => {
	if (temp_test.questions.length === 0) { // if test is done, go to end page
		generate_end_page();
		clearInterval(total_timer);
		return;
	}
	const questionIndex = Math.floor(Math.random() * temp_test.questions.length);
	get_next_question(questionIndex);
	set_timer(given_time);
	display_progress();
}

// View
$(function() {
	const test_name = new URLSearchParams(window.location.search).get("test");
	const student_name = new URLSearchParams(window.location.search).get("student_name");
	const student_code = new URLSearchParams(window.location.search).get("student_code");
	student_obj = student_data.find(s => s.name === student_name && s.code === student_code);
	test = student_obj.tests.find(t => t.name === test_name);
	test_length = test.num_questions;
	temp_test = structuredClone(test);
	get_next_question_controller();
});

const set_timer = (time) => {
	const question_timer = document.querySelector("#timer");
	question_timer.innerHTML = time;
	curr_timer = setInterval(function() {
		time--;
		question_timer.innerHTML = time;
		if (time < 0) {
			curr_question_num++;
			clearInterval(curr_timer);
			get_next_question_controller();
		}
	}, 1000);
}


const total_timer = setInterval(function() {
	completion_time++;
}, 1000);

const display_progress = () => {
	const question_progress = document.querySelector("#progress-text");
	question_progress.innerHTML = `${curr_question_num} / ${test_length}`;
	$("#green-progress").animate({ width: `${((curr_question_num) / test_length) * 100}%` }, 500);
}

const points_calculator = (current_time, given_time) => {
	const response_time = given_time - current_time;
	return Math.round((1 - ((response_time / given_time) / 2)) * 1000);
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
	temp_test.questions[index].all_choices.forEach(choice => {
		const choice_el = create_html(`<input type='button' value='${choice.choice_val}'>`);
		answer_choices.appendChild(choice_el);
		choice_el.name = choice.choice_val;
		choice_el.onclick = function() {
			if (choice.correct) {
				current_score += points_calculator(Number(document.querySelector("#timer").textContent), given_time);
			}
			clearInterval(curr_timer);
			curr_question_num++;
			get_next_question_controller();
		};
	});
	temp_test.questions.splice(index, 1); // remove answered question
}

const generate_end_page = () => {
	const main_container = document.querySelector("#main-container");
	const container_html = main_container.innerHTML;
	const previous_score = (test.scores.length === 0) ? 0 : Math.max.apply(null, test.scores.map(score => score.score_val));
	main_container.innerHTML = `
	<div id='end-page-body'>
		<h1><i class="fa-solid fa-crown"></i>SCORE: ${current_score}</h1>
		<h2>PREVIOUS HIGH SCORE: ${previous_score}</h2>
		<input class='end-page-inputs' type='button' value='Save'>
		<input class='end-page-inputs' type='button' value='Play Again'>
		<input class='end-page-inputs' type='button' value='Return to Dashboard'>
	</div>
	`;
	$("input[value='Save']").on("click", save_score);
	$("input[value='Play Again']").on("click", function() {
		temp_test = structuredClone(test);
		main_container.innerHTML = container_html; // reset temp test and html
		curr_question_num = 1;
		current_score = 0;
		completion_time = 0;
		get_next_question_controller();
	});
	$("input[value='Return to Dashboard']").on("click", function() {
		window.location.href = `../student.html?student_name=${student_obj.name}&student_code=${student_obj.code}`;
	});
}