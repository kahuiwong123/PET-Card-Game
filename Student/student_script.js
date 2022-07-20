// Model
const student_info = [];
let student;


// Controller 
const begin_test_controller = test_name => {
	console.log(test_name);
}

// View
$(function() {
	const student_info_container = document.querySelector("#student-info-header");
	new URLSearchParams(window.location.search).forEach((name, value) => {
		student_info.push(name);
		student_info_container.append(`${value}: ${name} `); // prints student name and code on the top
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
				<a name='begin-${test.name}' href='Test/test.html?test=${test.name}'>Begin!</a>
			</div>`);
			class_el.parentNode.insertBefore(tab_el, class_el.nextSibling);
			$(".test-info-tab").hide();
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
