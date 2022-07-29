// Model
const student_info = [];
let student;
let num_trophies = 0;
let is_teacher = false;

const confirm_enrollment = (option_arr) => {
	const options = option_arr.map(option_el => option_el.value);
	options.forEach(class_option => {
		if (student.classes.includes(class_option)) {
			alert(`${student.name} has already enrolled in ${class_option}!`);
			return;
		}
		student.classes.push(class_option);
		alert(`${student.name} is now enrolled in ${class_option}!`);
		save_info("students", student_data);
	});
}


// Controller
const confirm_enrollment_controller = () => {
	const option_arr = Array.from(document.querySelector("#enroll-options").selectedOptions);
	confirm_enrollment(option_arr);
	generate_classes_to_enroll();
	generate_availabe_classes();
	generate_class_list();
	generate_scoreboard();
}


// View
$(function() {
	const student_info_container = document.querySelector("#student-info-header");
	if (window.location.search.includes("is_teacher=true")) {
		is_teacher = true;
	}
	new URLSearchParams(window.location.search).forEach((name, value) => {
		student_info.push(name);
		student_info_container.append(`${value.replace("_", " ")}: ${name} `); // prints student name and code on the top
		student_info_container.append(document.createElement("br"));
	});
	student = student_data.find(student => student.name === student_info[0] && student.code === student_info[1]);

	if (is_teacher) {
		document.body.style.backgroundColor = "lightblue"; 
		document.body.innerHTML = `
		<main id="scoreboard-container" style='position: absolute;top: 0; left: 50%; transform:translate(-50%);'>
			<h1 id="scoreboard-heading"><i class="fa-solid fa-trophy"></i> Scoreboard</h1>
			<div id="scoreboard-body"></div>
		</main>
		<button style='position:absolute; top:0; right:0; font-size:1rem; padding:1rem;'>Return</button>`;
		document.querySelector("button").addEventListener("click", function () {window.location.href = "../Teacher/teacher.html"});
		generate_scoreboard();
		$("#scoreboard-heading").on("click", function() {
			$(".scoreboard-class-tab").slideToggle(300, "swing");
			$(".exam-info-tab").fadeOut(300, "swing");
		});
		return;
	}

	$("#welcome-header").text(`Welcome ${(student.nickname === "") ? student.name : student.nickname}!`); // prints welcome text
	generate_classes_to_enroll();
	$("#student-enroll h3").on("click", function() {
		$(".triangle-icon:first").toggleClass("triangle-ccw");
		$("#student-div").slideToggle("300", "swing");
	});
	document.querySelector("#confirm-enroll-btn").addEventListener("click", () => { confirm_enrollment_controller() });
	$("#enroll-options").chosen();
	generate_availabe_classes();
	generate_class_list();
	generate_calendar();
	$("#class-list h3").on("click", function() {
		$(".class-tab, #class-list hr").slideToggle(300, "swing");
		$(".test-info-tab").fadeOut(300, "swing");
		$(".triangle-icon:eq(1)").toggleClass("triangle-ccw");
	});
	$("#student-calendar h3").on("click", function() {
		$("#student-calendar iframe").slideToggle(300, "swing");
		$(".triangle-icon:last").toggleClass("triangle-ccw");
	});
	generate_scoreboard();
	// $("#scoreboard-container, #scoreboard-container * ").addClass("remain");
	$("#scoreboard-heading").on("click", function() {
		$(".scoreboard-class-tab").slideToggle(300, "swing");
		$(".exam-info-tab").fadeOut(300, "swing");
	});
	generate_trophies();

	document.querySelector("#nickname-btn").addEventListener("click", function() {
		const nickname = document.querySelector("#nickname-input").value;
		if (nickname === "") return;
		student.nickname = nickname;
		alert(`Your nickname is now ${student.nickname}!`);
		save_info("students", student_data);
		$("#welcome-header").text(`Welcome ${(student.nickname === "") ? student.name : student.nickname}!`); //rerender welcome text
		generate_scoreboard();
	});
});

const generate_availabe_classes = () => {
	student.classes.forEach(class_name => {
		test_bank.forEach(test => {
			if (test.subject === class_name && !student.tests.some(t => t.name === test.name)) {
				student.tests.push(test);
				return;
			}
		});
	});
	save_info("students", student_data);
}

const generate_classes_to_enroll = () => {
	const select_el = document.querySelector("#enroll-options");
	select_el.innerHTML = "";
	classes_data.forEach(clas => {
		const num_enrolled = student_data.filter(student => student.classes.includes(clas)).length;
		const option_el = create_html(`<option value=${clas.toLowerCase()}> ${clas.toUpperCase()}: ${num_enrolled} Enrolled </option>`);
		select_el.appendChild(option_el);
	});
	$("#enroll-options").trigger("chosen:updated");
}

const generate_class_list = () => {
	const class_list = document.querySelector("#class-list");
	class_list.innerHTML = "<h3>My Classes <span class='triangle-icon' style='margin-right: 1rem;'>&#9660</span> </h3>";
	student.classes.forEach(clas => {
		const list_el = document.createElement("div");
		list_el.textContent = clas.toUpperCase();
		list_el.id = clas.toLowerCase();
		list_el.classList.add("class-tab");
		class_list.appendChild(document.createElement("hr"));
		// list_el.appendChild(triangle);
		class_list.appendChild(list_el);
		generate_class_tests(list_el.id);
		list_el.onclick = function() {
			$(`span[name=${this.id}-triangle]`).toggleClass("triangle-cw");
			$(`div[name=${this.id}-test]`).slideToggle(300, "linear");
		};
	});
}

const generate_class_tests = (el_id) => {
	const class_el = document.getElementById(el_id);
	student.tests.forEach(test => {
		if (test.subject === el_id) {
			const tab_el = create_html(`
			<div class='test-info-tab' name=${el_id}-test>
				<p>${test.name}</p>
				<p>${test.num_questions} Questions</p>
				<a name='begin-${test.name}' href='Test/test.html?test=${test.name}&student_name=${student.name}&student_code=${student.code}'>Begin!</a>
			</div>`);
			class_el.appendChild(tab_el);
			$(".test-info-tab").hide(); // tabs are hidden initially
		}
	});
}

const generate_calendar = () => {
	const calendar_container = document.querySelector("#student-calendar");
	calendar_container.innerHTML = "<h3>Show Calendar<span class='triangle-icon' style='margin-right: 1rem;'>&#9660</span> </h3>";
	const calendar = create_html(`
		<iframe
			src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York"
			style="border: 0" width="300" height="300" frameborder="0" scrolling="yes"></iframe>`);
	calendar_container.appendChild(calendar);
}

const generate_scoreboard = () => {
	const scoreboard = document.querySelector("#scoreboard-body");
	scoreboard.innerHTML = "";
	student.classes.forEach(clas => {
		const class_row_el = document.createElement("div");
		class_row_el.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${clas.toUpperCase()}`;
		class_row_el.classList.add("scoreboard-class-tab");
		class_row_el.id = `${clas.toLowerCase()}-scores`;
		scoreboard.appendChild(class_row_el);
		generate_tests(class_row_el.id);
		$(".scoreboard-class-tab").hide();
		class_row_el.onclick = function(e) {
			$(`div[name='${this.id}-exam']`).slideToggle(300, "linear");
			e.stopPropagation();
		};
	});
}

const generate_tests = (class_id) => {
	const class_el = document.getElementById(class_id);
	student.tests.forEach(test => {
		if (test.subject === class_id.substr(0, class_id.indexOf('-'))) {
			const test_row_el = create_html(`<div class='exam-info-tab' name='${class_id}-exam'></div>`);
			test_row_el.innerHTML = `<i class="fa-solid fa-book"></i> ${(test.name).toUpperCase()}`;
			test_row_el.id = `${test.name.toLowerCase()}-stats`;
			const available_students = student_data.filter(s => (s.tests.some(t => t.name === test.name && t.scores.length !== 0)));
			sort_by_high_score(available_students, test.name);
			const test_header = create_html(`
			<div class='student-stat-main'>	
				<p>Rank</p>
		 		<p>Name</p>
				<p>Score</p>
				<p>Percentage</p>
		 		<p>Time</p>
				<p>Date</p>
			</div>
			`);
			test_row_el.appendChild(test_header);
			class_el.appendChild(test_row_el);
			generate_test_stats(test_row_el.id, available_students, test.name);
			$(".exam-info-tab").hide();
			test_row_el.onclick = function(e) {
				$(`div[name='${this.id}-line']`).slideToggle(300, "linear");
				e.stopPropagation();
			}
		}
	});
}

generate_test_stats = (el_id, student_list, test_name) => {
	const test_el = document.getElementById(el_id);
	student_list.forEach(stu => {
		const name_val = (stu.nickname === "" || is_teacher) ? `${stu.name} (${stu.code})` : stu.nickname;
		const name = (stu.name === student.name && stu.code === student.code) ? `▶ ${name_val}` : name_val; // arrow for current student

		const score_row_el = create_html(`<div class='student-statistics' name='${el_id}-line'></div>`);
		score_row_el.id = `${stu.name}-${test_name}-scorelist`;
		const score_arr = stu.tests.find(t => t.name === test_name).scores;
		const score_copy = structuredClone(score_arr);
		get_score_obj(score_copy);
		const best_score = score_copy.shift();
		// get highest score object by comparing value, then completion time, then date
		if (student_list.indexOf(stu) === 0 && stu.name === student.name && stu.code === student.code) {
			num_trophies++;
		}
		score_row_el.innerHTML = `
					<div class='student-stat-main'>
						<p>${student_list.indexOf(stu) + 1}</p> 
						<p>${name}</p>	
						<p>${best_score.score_val}</p>
						<p>${Math.round(eval(best_score.percentage) * 100)}% (${best_score.percentage})</p>
						<p>${new Date(best_score.completion_time * 1000).toISOString().substr(11, 8)}</p>
						<p>${best_score.date}<p>
					</div>
						`;
		test_el.appendChild(score_row_el);
		if (stu.name === student.name && stu.code === student.code) {
			generate_previous_scores(score_row_el.id, score_copy);
		}
		$(".student-statistics").hide();
		score_row_el.onclick = function(e) {
			$(`div[name='${this.id}-prev']`).slideToggle(300, "linear");
			e.stopPropagation();
		};
	});
}

const generate_previous_scores = (el_id, score_arr) => {
	const stats_container = document.getElementById(el_id);
	score_arr.sort(function(a, b) { return (a.date < b.date) ? -1 : 1; });
	score_arr.forEach(score => {
		const prev_score_el = create_html(`<div class='student-prev-scores' name='${el_id}-prev'></div>`);
		prev_score_el.innerHTML = `
		<p></p>
		<p></p>
		<p>${score.score_val}</p>
		<p>${Math.round(eval(score.percentage) * 100)}% (${score.percentage})</p>
		<p>${new Date(score.completion_time * 1000).toISOString().substr(11, 8)}</p>
		<p>${score.date}</p>
		`;
		stats_container.appendChild(prev_score_el);
		$(".student-prev-scores").hide();
	});
}

const generate_trophies = () => {
	let count = num_trophies;
	const trophy_shelf = document.querySelector("#trophy-shelf");
	while (count-- > 0) {
		const trophy_el = create_html(`<div class='trophy'></div>`);
		trophy_shelf.appendChild(trophy_el);
	}
}

const get_high_score = (student, test_name) => {
	return Math.max.apply(null, student.tests.find(test => test.name === test_name).scores.map(score => score.score_val));
}

const sort_by_high_score = (student_list, test_name) => {
	student_list.sort(function(a, b) {
		return get_high_score(b, test_name) - get_high_score(a, test_name);
	});
}

const get_score_obj = (score_arr) => {
	score_arr.sort(function(b, a) {
		if (a.score_val !== b.score_val) return (a.score_val < b.score_val) ? -1 : 1;
		if (a.completion_time !== b.completion_time) return (a.completion_time < b.completion_time) ? 1 : -1;
		return (a.date < b.date) ? 1 : -1;
	});
}

