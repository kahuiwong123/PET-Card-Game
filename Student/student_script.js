// Model
const student_info = [];
let student;


// Controller 


// View
$(function() {
	const student_info_container = document.querySelector("#student-info-header");
	new URLSearchParams(window.location.search).forEach((name, value) => {
		student_info.push(name);
		student_info_container.append(`${value}: ${name} `);
		student_info_container.append(document.createElement("br"));
	});
	student = student_data.find(student => student.name === student_info[0] && student.code === student_info[1]);
	$("#welcome-header").text(`Welcome ${student.name}!`);
});

const generate_classes_table = () => {
	
}