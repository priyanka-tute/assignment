const domain = "https://do4t98vdpdesj.cloudfront.net/";
const admin_id = prompt("Enter Admin ID");

function getAssignmentsBySID() {
  const sid = document.getElementById("sid").value;
  $.get("/assignment/student", { student_id: sid }, (data) => {
    if (data.success) {
      display(data.data.Items);
    }
  });
}

function getAssignmentsByAID() {
  const aid = document.getElementById("aid").value;
  $.get("/assignment/subject", { assignment_id: aid }, (data) => {
    if (data.success) {
      display(data.data.Items);
    }
  });
}

function display(Items) {
  const table = document.createElement("table");
  for (let i = 0; i < Items.length; i++) {
    let tr = document.createElement("tr");
    let sidtd = document.createElement("td");
    let aidtd = document.createElement("td");
    let fname = document.createElement("td");
    let flink = document.createElement("td");
    sidtd.innerHTML = Items[i].student_id.S;
    aidtd.innerHTML = Items[i].assignment_id.S;
    fname.innerHTML = Items[i].filename.S;
    flink.innerHTML = "<a href='" + Items[i].assignment_link.S + "'>Link</a>";
    tr.appendChild(sidtd);
    tr.appendChild(aidtd);
    tr.appendChild(fname);
    tr.appendChild(flink);
    table.appendChild(tr);
  }
  document.getElementById("result").appendChild(table);
}

function addMoreQuestions() {
  let t = document.createElement("input");
  t.name = "question";
  document.getElementById("questions").appendChild(t);
}

function addAssignment() {
  let questionsElements = document.getElementsByName("question");
  let questions = [];
  for (let i = 0; i < questionsElements.length; i++) {
    if (questionsElements[i]) questions.push(questionsElements[i].value);
    console.log(questions[i]);
  }
  const subject_id = document.getElementById("subject_id").value;
  $.post(
    "/assignment/add",
    { subject_id: subject_id, questionSet: questions },
    (data) => {
      if (data.success) {
        alert("Assignment added!");
      }
    }
  );
}

function getSubjects() {
  $.get("/subjects", (data) => {
    if (data.success) {
      console.log("subjects...", data);
      let r = document.getElementById("result");
      r.innerHTML = "";
      let s = document.createElement("select");
      s.id = "subject";
      for (let i = 0; i < data.data.length; i++) {
        let a = document.createElement("option");
        a.onselect = () => {
          viewAssignments(data.data[i].subject_id, data.data[i].subject_name);
        };
        a.className =
          "list-group-item list-group-item-action list-group-item-light p-3";
        a.innerHTML = data.data[i].subject_name;
        a.value = i;
        s.appendChild(a);
        // r.appendChild(div);
      }
      let btn = document.createElement("button");
      btn.className = "btn btn-outline-primary";
      btn.onclick = () => {
        const i = document.getElementById("subject").value;
        console.log("i = ", i);
        const subject_id = data.data[i].subject_id;
        const subject_name = data.data[i].subject_name;
        console.log("assignments for ", subject_id, " ", subject_name);
        viewAssignments(subject_id, subject_name);
      };
      btn.innerHTML = "Show Assignments";
      r.appendChild(s);
      r.appendChild(btn);
    }
  });
}

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  getSubjects();
});

function viewSubmittedAssignment(
  subject_id,
  assignment_id,
  ass_num,
  data,
  subject_name
) {
  let r = document.getElementById("result");
  r.innerHTML = "";
  let h2 = document.createElement("h2");
  h2.innerHTML = "Assignment-" + ass_num;
  let div = document.createElement("div");
  div.id = ass_num - 1 + "";
  div.className = "mt-4 mb-4";
  r.appendChild(div);
  div.appendChild(h2);
  for (
    let j = 0;
    j < data.data.submitted[ass_num - 1].q.questions.length;
    j++
  ) {
    let div = document.createElement("div");
    div.className = "mt-4 mb-4";
    let p = document.createElement("p");
    let btn = document.createElement("button");
    div.appendChild(p);
    // r.appendChild(ip);
    div.appendChild(btn);
    p.innerHTML = `${j + 1}. ${
      data.data.submitted[ass_num - 1].q.questions[j]
    }`;
    p.className = "lead my-2";
    // let ip = document.createElement("input");
    // ip.type = "file";

    btn.onclick = function () {
      open(
        domain + "/" + data.data.submitted[ass_num - 1].a.solutions[j].filename,
        "_blank"
      );
    };
    btn.className = "btn btn-outline-primary";
    btn.innerHTML = "View Assignment";
    r.appendChild(div);
  }
  let back = document.createElement("button");
  back.onclick = function () {
    viewAssignments(subject_id, subject_name);
  };
  back.innerHTML = "Back";
  back.className = "btn btn-primary";
  r.appendChild(back);
}

function viewPendingAssignment(
  subject_id,
  assignment_id,
  ass_num,
  data,
  subject_name
) {
  let r = document.getElementById("result");
  r.innerHTML = "";
  let h2 = document.createElement("h2");
  h2.innerHTML = "Assignment-" + ass_num;
  let div = document.createElement("div");
  div.id = ass_num - 1 + "";
  div.className = "mt-4 mb-4";
  r.appendChild(div);
  div.appendChild(h2);
  for (let j = 0; j < data.data.pending[ass_num - 1].questions.length; j++) {
    let d = document.createElement("div");
    d.className = "mt-4 mb-4";
    let p = document.createElement("p");
    p.innerHTML = `${j + 1}. ${data.data.pending[ass_num - 1].questions[j]}`;
    p.className = "lead my-2";
    let ip = document.createElement("input");
    ip.type = "file";
    ip.id = ass_num - 1 + "_" + j;
    ip.className = "custom-file-input";
    d.appendChild(p);
    d.appendChild(ip);
    div.appendChild(d);
  }
  let btn = document.createElement("button");
  btn.onclick = function () {
    submitAssignment(
      student_id,
      data.data.pending[ass_num - 1]["_id"],
      subject_id,
      ass_num - 1,
      data.data.pending[ass_num - 1].questions.length
    );
  };
  btn.innerHTML = "Submit Assignment";
  btn.className = "btn btn-success mt-3 mb-3 mr-3";
  // div.appendChild(document.createElement("br"));
  div.appendChild(btn);

  let back = document.createElement("button");
  back.onclick = function () {
    viewAssignments(subject_id, subject_name);
  };
  back.innerHTML = "Back";
  back.className = "btn btn-primary mt-3 mb-3 mx-3";
  div.appendChild(back);
}
function viewAssignments(subject_id, subject_name) {
  console.log("In viewAssignments...");
  // const subject_id = document.getElementById("subject_id").value;
  $.get("/admin/subject/assignments", { subject_id: subject_id }, (data) => {
    if (data.success) {
      console.log(data);
      let content2 = document.getElementById("content2");
      content2.innerHTML = "";

      let content = document.getElementById("content");
      content.innerHTML = "";

      const assignments = data.data;
      for (let i = 0; i < assignments.length; i++) {
        let btn = document.createElement("btn");
        btn.innerHTML = "Assignment - " + (i + 1);
        btn.onclick = () => {
          viewStudents(content, subject_id, assignments[i]._id, content2);
        };
        btn.className = "btn btn-outline-primary";
        content.appendChild(btn);
      }
    }
  });
}

function viewStudents(content, subject_id, assignment_id, content2) {
  $.get(
    "/admin/assignment/student",
    { subject_id: subject_id, assignment_id: assignment_id },
    (data) => {
      if (data.success) {
        console.log(data);

        const assignments = data.data;
        for (let i = 0; i < assignments.length; i++) {
          let btn = document.createElement("btn");
          btn.innerHTML = "Student - " + assignments[i].student_id;
          btn.onclick = () => {
            viewAssignment(content2, assignments[i]);
          };
          btn.className = "btn btn-outline-success";
          content.appendChild(btn);
        }
      }
    }
  );
}
function viewAssignment(content, assignment) {
  $.get("/assignment", { assignment_id: assignment._id }, (a) => {
    console.log("a in viewAssignment...", a);
    for (let j = 0; j < assignment.solutions.length; j++) {
      let p = document.createElement("p");
      let stud = document.createElement("p");
      let btn = document.createElement("button");
      let ip = document.createElement("input");
      let rc = document.createElement("input");
      let ri = document.createElement("input");
      let lri = document.createElement("label");
      let lrc = document.createElement("label");
      let submitFeedback = document.createElement("button");
      lrc.innerHTML = " Correct ";
      lri.innerHTML = " Incorrect ";
      stud.innerHTML = "Student_id: " + assignment.student_id;
      lrc.appendChild(rc);
      lri.appendChild(ri);
      ri.type = "radio";
      rc.type = "radio";
      rc.name =
        "correct" +
        assignment.assignment_id +
        "_" +
        assignment.student_id +
        "_" +
        j; //assignmentindex_studid_qindex
      ri.name =
        "correct" +
        assignment.assignment_id +
        "_" +
        assignment.student_id +
        "_" +
        j;
      rc.value = "true";
      ri.value = "false";
      rc.innerHTML = "Correct";
      ri.innerHTML = "Incorrect";
      ip.placeholder = "feedback";
      ip.id =
        "feedback" +
        assignment.assignment_id +
        "_" +
        assignment.student_id +
        "_" +
        j; //assignmentindex_qindex
      btn.className = "btn btn-outline-primary";
      btn.onclick = () => {
        open(domain + assignment.solutions[j].filename, "_blank");
      };
      btn.innerHTML = "View Solution";
      p.innerHTML = a.data.questions[j];

      submitFeedback.onclick = () => {
        submitFeedback(assignment);
      };
      content.appendChild(p);
      content.appendChild(stud);
      content.appendChild(btn);
      content.appendChild(ip);
      content.appendChild(lrc);
      content.appendChild(lri);
    }
  });
}

function submitFeedback(assignment) {
  let feedback = [];
  for (let j = 0; j < assignment.solutions.length; j++) {
    let f = document.getElementById(
      "feedback" +
        assignment.assignment_id +
        "_" +
        assignment.student_id +
        "_" +
        j
    );
    let correct = document.getElementsByName(
      "correct" +
        assignment.assignment_id +
        "_" +
        assignment.student_id +
        "_" +
        j
    )[0].selected;
    console.log(`correct for = ${j} = ${correct} `);
    console.log(`feedback for = ${j} = ${f} `);

    feedback.push({ correct: correct, feedback: f });
  }
  console.log(feedback);
}
