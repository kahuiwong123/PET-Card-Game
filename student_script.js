// Model
const student_info = [];
let student;
// Controller 


// View
$(function() {
	const student_info_container = document.querySelector("#student-info-header");
	new URLSearchParams(window.location.search).forEach((name, value) => {
		student_info.push(name);
		student_info_container.append(`${value.replace("_", " ")}: ${name} `); // prints student name and code on the top
		student_info_container.append(document.createElement("br"));
	});
	student = student_data.find(student => student.name === student_info[0] && student.code === student_info[1]);
	$("#welcome-header").text(`Welcome ${student.name}!`); // prints welcome text
	generate_class_list();
	generate_calendar();
	$("#class-list h3").on("click", function() {
		$(".class-tab, #class-list hr").slideToggle(300, "swing");
		$(".test-info-tab").fadeOut(300, "swing");
		$(".triangle-icon:first").toggleClass("triangle-ccw");
	});
	$("#student-calendar h3").on("click", function() {
		$("#student-calendar iframe").slideToggle(300, "swing");
		$(".triangle-icon:last").toggleClass("triangle-ccw");
	});
	generate_scoreboard(true);
	$("#scoreboard-container").on("click", function() {
		$(".scoreboard-class-tab").slideToggle(300, "swing");
		$(".exam-info-tab").fadeOut(300, "swing");
	});
});

const generate_class_list = () => {
	const class_list = document.querySelector("#class-list");
	class_list.innerHTML = "<h3>My Classes <span class='triangle-icon' style='margin-right: 1rem;'>&#9660</span> </h3>";
	student.classes.forEach(clas => {
		const list_el = document.createElement("div");
		list_el.textContent = clas.toUpperCase();
		list_el.id = clas.toLowerCase();
		list_el.classList.add("class-tab");
		const triangle = create_html(`<span class='triangle-icon' name=${clas.toLowerCase()}-triangle style='margin-right: 1rem;'>&#9654</span>`);
		class_list.appendChild(document.createElement("hr"));
		list_el.appendChild(triangle);
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
			class_el.parentNode.insertBefore(tab_el, class_el.nextSibling);
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

const generate_scoreboard = (sort_val) => {
	const scoreboard = document.querySelector("#scoreboard-body");
	scoreboard.innerHTML = "";
	student.classes.forEach(clas => {
		const class_row_el = document.createElement("div");
		class_row_el.textContent = clas.toUpperCase();
		class_row_el.classList.add("scoreboard-class-tab");
		class_row_el.id = `${clas.toLowerCase()}-scores`;
		scoreboard.appendChild(class_row_el);
		generate_tests(class_row_el.id, sort_val);
		class_row_el.onclick = function() {
			$(`div[name='${this.id}-exam']`).slideToggle(300, "linear");
		};
	});
}

const generate_tests = (class_id, sort_val) => {
	const class_el = document.getElementById(class_id);
	student.tests.forEach(test => {
		if (test.subject === class_id.substr(0, class_id.indexOf('-'))) {
			const test_row_el = create_html(`<div class='exam-info-tab' name='${class_id}-exam'>${(test.name).toUpperCase()}</div>`);
			test_row_el.id = `${test.name.toLowerCase()}-stats`;
			const available_students = student_data.filter(s => (s.tests.some(t => t.name === test.name && t.scores.length !== 0)));
			console.log(available_students);
			sort_by_high_score(available_students, test.name);
			class_el.parentNode.insertBefore(test_row_el, class_el.nextSibling);
			generate_test_stats(test_row_el.id, available_students, test.name);
			$(".exam-info-tab").hide();
			test_row_el.onclick = function() {
				$(`div[name='${this.id}-line']`).slideToggle(300, "linear");
			}
		}
	});
}

generate_test_stats = (el_id, student_list, test_name) => {
	const test_el = document.getElementById(el_id);
	student_list.forEach(student => {
		const score_row_el = create_html(`<div class='student-statistics' name='${el_id}-line'></div>`);
		const score_arr = student.tests.find(t => t.name === test_name).scores;
		score_row_el.innerHTML = `
						<p>${student_list.indexOf(student) + 1}</p> 
						<p>${student.name}</p>	
						<p>${get_high_score(student, test_name)}</p>
						<p>${get_quickest_time(student, test_name)}</p>
						<p>${score_arr[score_arr.length - 1].date}<p>
						`;
		test_el.appendChild(score_row_el);
		$(".student-statistics").hide();
	});
}

const get_high_score = (student, test_name) => {
	return Math.max.apply(null, student.tests.find(test => test.name === test_name).scores.map(score => score.score_val));
}

const get_quickest_time = (student, test_name) => {
	return Math.min.apply(null, student.tests.find(test => test.name === test_name).scores.map(score => score.completion_time));
}

const sort_by_high_score = (student_list, test_name) => {
	student_list.sort(function(a, b) {
		return get_high_score(b, test_name) - get_high_score(a, test_name);
	});
}

const sort_by_competion_time = (student_list, test_name) => {
	student_list.sort(function(a, b) {
		return get_quickest_time(b, test_name) - get_quickest_time(a, test_name);
	});
}
