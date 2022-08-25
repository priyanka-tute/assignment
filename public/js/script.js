const domain = "https://do4t98vdpdesj.cloudfront.net/";
const student_id = prompt("Enter student_id");
async function addFile() {
  console.log("In uploadFile");
  let formData = new FormData();
  let file = document.getElementById("assignment").files[0];
  console.log(file);
  formData.append("fileupload", file);

  formData.append("student_id", document.getElementById("student_id").value);
  formData.append(
    "assignment_id",
    document.getElementById("assignment_id").value
  );

  console.log(formData);
  let a = await fetch("/submit", {
    method: "POST",
    body: formData,
  }).then((response, data) => {
    console.log("Response in uploadFile....");
    console.log(response);
    console.log(data);
    if (response.status == 200) {
      alert("Assignment Submitted!");
    } else {
      alert("Could not submit assignment!");
    }
  });
  console.log("A = ", a);
  return a;
}

async function submitAssignment(student_id, assignment_id, subject_id, aid, n,question_no,question) {
  let count = 1;
  console.log("In submitAssignment");
  let formData = new FormData();
  // console.log(file);
  let fileList = [];
  let flag = true;
  for (let i = 0; i < n; i++) {
    let temp = document.getElementById(aid + "_" + i).files[0];
    console.log(temp);
    if (temp != undefined) formData.append(aid + "_" + i, temp);
    // fileList.push(temp);
    else {
      flag = false;
      break;
    }
  }
  if (flag) {
    // let files = document.getElementById(aid + "");
    // console.log("fl...", fileList);
    // console.log(files.files);
    // formData.append("fileupload", fileList);
    // formData.append("question_no", qno);
    formData.append("aid", aid);
    formData.append("n", n);
    formData.append("assignment_id", assignment_id);
    formData.append("student_id", student_id);
    formData.append("subject_id", subject_id);
    formData.append("submission_id", "63076a7b810d1312a3ddc61c");

    formData.append("attempt",count+1);
    formData.append("question_no",question_no);
    formData.append("question",question);
    formData.append("points",2);

    console.log(formData);
    let a = await fetch("/resubmit", {
      method: "POST",
      body: formData,
    }).then((response, data) => {
      console.log("Response in uploadFile....");
      console.log(response);
      console.log(data);
      if (response.status == 200) {
        alert("Assignment Submitted!");
        for (let i = 0; i < n; i++) {
          let temp = document.getElementById(aid + "_" + i);
          console.log(temp);
          if (temp != undefined) temp.disabled = true;
          // fileList.push(temp);
        }
      } else {
        alert("Could not submit assignment!");
      }
    });
    console.log("A = ", a);
    return a;
  } else alert("Please submit all the questions");
}

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
      let sub = document.getElementById("sub");
      sub.innerHTML = "";
      for (let i = 0; i < data.data.length; i++) {
        let a = document.createElement("a");
        a.onclick = () => {
          viewAssignments(data.data[i].subject_id, data.data[i].subject_name);
        };
        a.className =
          "list-group-item list-group-item-action list-group-item-light p-3";
        a.innerHTML = data.data[i].subject_name;
        sub.appendChild(a);
      }
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
  for (let j = 0; j < data.data[ass_num - 1].questions.length; j++) {
    let d = document.createElement("div");
    d.className = "mt-4 mb-4";
    let p = document.createElement("p");
    p.innerHTML = `${data.data[ass_num - 1].questions[j].question_no}. ${data.data[ass_num - 1].questions[j].question}`;
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
      data.data[ass_num - 1]["assignment_id"],
      subject_id,
      ass_num - 1,
      data.data[ass_num - 1].questions.length,
      data.data[ass_num - 1].questions[0].question_no,
      data.data[ass_num - 1].questions[0].question
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
  // const subject_id = document.getElementById("subject_id").value;
  $.get(
    "/assignment/view",
    { subject_id: subject_id, student_id: student_id },
    (data) => {
      console.log(data);
      let r = document.getElementById("result");
      r.innerHTML = "";
      let subName = document.createElement("h2");
      subName.className = "display-3";
      subName.innerHTML = subject_name;
      r.appendChild(subName);
      let submitted = document.createElement("div");
      let h4 = document.createElement("h4");
      h4.innerHTML = "Submitted";
      h4.className = "mb-4 mt-4";
      // if (data.data.submitted.length == 0) h4.innerHTML += "<br>---";
      r.appendChild(h4);
      // for (let i = 0; i < data.data.submitted.length; i++) {
      //   let li = document.createElement("a");
      //   li.className = "list-group-item list-group-item-action";
      //   li.role = "tab";
      //   $(li).attr("data-toggle", "list");
      //   li.onclick = () => {
      //     viewSubmittedAssignment(
      //       subject_id,
      //       data.data.submitted[i].a._id,
      //       i + 1,
      //       data,
      //       subject_name
      //     );
      //   };
      //   li.innerHTML = "Assignment-" + (i + 1);
      //   submitted.appendChild(li);
      // }
      // r.appendChild(submitted);
      let pending = document.createElement("div");
      let h4_2 = document.createElement("h4");
      h4_2.innerHTML = "Pending";
      h4_2.className = "mb-4 mt-4";
      // if (data.data.pending.length == 0) h4_2.innerHTML += "<br>---";
      r.appendChild(h4_2);
      // for (let i = 0; i < data.data.pending.length; i++) {
      //   console.log(data.data.pending[i]);

      //   let li = document.createElement("a");
      //   li.className = "list-group-item list-group-item-action";
      //   li.role = "tab";
      //   $(li).attr("data-toggle", "list");
      //   li.onclick = () => {
      //     viewPendingAssignment(
      //       subject_id,
      //       data.data.pending[i]._id,
      //       i + 1,
      //       data,
      //       subject_name
      //     );
      //   };
      //   li.innerHTML = "Assignment-" + (i + 1);
      //   pending.appendChild(li);
      // }
      for (let i = 0; i < data.data.length; i++) {
        console.log(data.data[i]);

        let li = document.createElement("a");
        li.className = "list-group-item list-group-item-action";
        li.role = "tab";
        $(li).attr("data-toggle", "list");
        li.onclick = () => {
          viewPendingAssignment(
            subject_id,
            data.data[i]._id,
            i + 1,
            data,
            subject_name
          );
        };
        li.innerHTML = "Assignment-" + (i + 1);
        pending.appendChild(li);
      }
      r.appendChild(pending);
    }
  );
}
