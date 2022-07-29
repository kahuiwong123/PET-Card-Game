// Model
let student_obj;
let test;
let temp_test;
let test_length;
let num_correct = 0;
let curr_question_num = 1;
let given_time = 30; // time given for entire test
let current_score = 0;
let question_time = 0; // time taken for each question
let completion_time = 0; // time taken to complete the entire test

const save_score = () => {
	test.scores.push({ score_val: current_score, percentage: `${num_correct}/${test_length}`, completion_time: completion_time, date: new Date().toLocaleDateString() });
	save_info("students", student_data);
	alert("Your score has been saved!");
}

// Controller
const get_next_question_controller = () => {
	if (temp_test.questions.length === 0) { // if test is done, go to end page
		generate_end_page();
		return;
	}
	const questionIndex = Math.floor(Math.random() * temp_test.questions.length);
	get_next_question(questionIndex);
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

const test_timer = setInterval(function() {
	document.querySelector("#total-time").innerHTML = given_time;
	given_time--;
	if (given_time <= 0) {
		clearInterval(test_timer);
		generate_end_page();
	}
}, 1000);


let question_timer = setInterval(function() {
	document.querySelector("#timer").textContent = question_time;
	question_time++;
	completion_time++;
}, 1000);


const display_progress = () => {
	const question_progress = document.querySelector("#progress-text");
	question_progress.innerHTML = `${curr_question_num} / ${test_length}`;
	$("#green-progress").animate({ width: `${((curr_question_num) / test_length) * 100}%` }, 500);
}

const points_calculator = (response_time, given_time) => {
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
				num_correct++;
				current_score += points_calculator(Number(document.querySelector("#timer").textContent), given_time / test_length);
				this.style.backgroundColor = "rgb(11, 223, 36)";
			} else {
				this.style.backgroundColor = "rgb(231, 26, 3)";
			}
			clearInterval(question_timer);
			question_time = 0;
			question_timer = setInterval(function() {
				document.querySelector("#timer").textContent = question_time; // reset timer for button click
				question_time++;
				completion_time++;
			}, 1000);
			curr_question_num++;
			temp_test.questions.splice(index, 1); // remove answered question
			setTimeout(function() { get_next_question_controller(); }, 333); // add delay for getting next question
		};
	});
}

const generate_end_page = () => {
	clearInterval(question_timer);
	clearInterval(test_timer);
	const main_container = document.querySelector("#main-container");
	const previous_score = (test.scores.length === 0) ? 0 : Math.max.apply(null, test.scores.map(score => score.score_val));
	main_container.innerHTML = `
	<div id='end-page-body'>
		<h1><i class="fa-solid fa-crown"></i> SCORE: ${current_score}</h1>
		<h2><i class="fa-solid fa-hashtag"></i> Percentage: ${Math.round(eval(num_correct/test_length) * 100)}% (${num_correct}/${test_length})</h2>
		<h2><i class="fa-solid fa-stopwatch"></i> COMPLETION TIME: ${new Date(completion_time * 1000).toISOString().substr(11, 8)}</h2>
		<h2><i class="fa-solid fa-fire"></i> PREVIOUS HIGH SCORE: ${previous_score}</h2>
		<input class='end-page-inputs' type='button' value='Save'>
		<input class='end-page-inputs' type='button' value='Play Again'>
		<input class='end-page-inputs' type='button' value='Return to Dashboard'>
	</div>
	`;
	$("input[value='Save']").on("click", save_score);
	$("input[value='Play Again']").on("click", function() {
		location.reload();
	});
	$("input[value='Return to Dashboard']").on("click", function() {
		window.location.href = `../student.html?student_name=${student_obj.name}&student_code=${student_obj.code}`;
	});
}