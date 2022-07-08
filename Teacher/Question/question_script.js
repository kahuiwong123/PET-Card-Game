
// Model
let questions;

const load_question = () => {
  const saved_questions = JSON.parse(localStorage.getItem("questions"));
  if (Array.isArray(saved_questions) && saved_questions.length > 0) {
    questions = saved_questions;
  } else {
    questions = [];
  }
}

load_question();

const add_question = (question, correct_choice, choices, question_code) => {
  choices_objects = [];
  choices.forEach(choice => {
    let correct;
    (choice.id === correct_choice.value) ? correct = true : correct = false; 
    choices_objects.push({choice_val: choice.value, correct: correct});
  });
  questions.push({question: question.value, all_choices: choices_objects, code:question_code});
  save_data("questions", questions);
}

const delete_question = (button_name) => {
  questions = questions.filter(question => {
    if (question.code === button_name) {
      return false;
    } else {
      return true;
    }
  });
  save_data("questions", questions);
}


// View
document.getElementById("back-dashboard-button").onclick = function () { location.href = "../teacher.html" };

const generate_question_table = () =>{
  const table = document.getElementById("questions-answer-table");
  if(!(table === null)){
    table.innerHTML = "";
  }
  const header = create_html(`<tr>
                                <th>Question</th>
                                <th>Answer Choices</th>
                                <th>Correct Choice</th>
                                <th>Delete</th>
                              </tr>`);
  table.appendChild(header);
  questions.forEach(question => {
    const row_el = document.createElement("tr");
    
    const que_col = document.createElement("td");
    que_col.textContent = question.question;

    const  choice1_col = document.createElement("tr");
    choice1_col.textContent = question.all_choices[0].choice_val;
    const  choice2_col = document.createElement("tr");
    choice2_col.textContent = question.all_choices[1].choice_val;
    const  choice3_col = document.createElement("tr");
    choice3_col.textContent = question.all_choices[2].choice_val;
    const  choice4_col = document.createElement("tr");
    choice4_col.textContent = question.all_choices[3].choice_val;

    const correct_obj = question.all_choices.find(choice => choice.correct === true);
    const  corr_choice_col = document.createElement("td");
    corr_choice_col.textContent = correct_obj.choice_val;
  
    //delete question
    const button_col = document.createElement("button");
    button_col.textContent = "Delete";
    button_col.name = question.code;
    button_col.onclick = function () {delete_question_controller(button_col.name) };


    const ans_el = document.createElement("td");
    ans_el.appendChild(choice1_col);
    ans_el.appendChild(choice2_col);
    ans_el.appendChild(choice3_col);
    ans_el.appendChild(choice4_col);
    
    row_el.appendChild(que_col);
    row_el.appendChild(ans_el);
    row_el.appendChild(corr_choice_col);
    row_el.appendChild(button_col);
    table.appendChild(row_el);
  });
}
setTimeout(generate_question_table, 100);

// Controller
const add_question_controller = () => {
  const question = document.getElementById("question-input");
  const choice_1 = document.getElementById("correct-choice-1");
  const choice_2 = document.getElementById("correct-choice-2");
  const choice_3 = document.getElementById("correct-choice-3");
  const choice_4 = document.getElementById("correct-choice-4");
  const correct_choice = document.getElementById("correct-answer-choice");
  const ans_choices = [choice_1, choice_2, choice_3, choice_4];
  const question_code = question.value + "/" + correct_choice.value;

  if (question.value === "") {
    alert("Question cannot be empty!");
  }

  else if (!question.value === "") {
    for(let i = 0; i < ans_choices.length; i++){
      if(ans_choices[i].value === "") {
        alert(`Answer Choice ${i + 1} cannot be empty!`);
        break;
      }
    }
  }

  else {
   const ans_choices_set = new Set(ans_choices);
    if(ans_choices_set.size === ans_choices.length){
      if(correct_choice.value === "correct-choice-blank"){
        alert("correct answer choice can not be empty")
      } else{
        alert("Question successfully added!");
        add_question(question, correct_choice, ans_choices, question_code);
        setTimeout(generate_question_table, 100);
      }
    } else{
      alert(`Duplicate answer choices found`);
    } 
  }
}

const delete_question_controller = (button_name) => {
  delete_question(button_name);
  setTimeout(generate_question_table, 100);
}