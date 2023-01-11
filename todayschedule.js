

var uid = localStorage.getItem('uid');
var jwt = localStorage.getItem('jwt');
var client = localStorage.getItem('client');


var uid = localStorage.getItem('uid');
var jwt = localStorage.getItem('jwt');
var client = localStorage.getItem('client');


const createTask = async () => {
    const name = document.getElementById('createTaskname').value;
    const createTaskRequest = await fetch(`https://dev.thanqminh.com:3001/task_lists`, {
        method: 'POST',
        headers: {
            'Access-Token': jwt,
            'UID': uid,
            'Client': client,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    });
            alert('Create selected task successfully');
            document.location.reload();
  
}


function taskListRequest() {

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `https://dev.thanqminh.com:3001/task_lists`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Access-Token", jwt);
    xhttp.setRequestHeader("Uid", uid);
    xhttp.setRequestHeader("Client", client);
    xhttp.send();

    var counter = 0;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            for (let list of objects) {

                var tbody = document.getElementById('inputtask');
                var tr = document.createElement('tr');

                var num = document.createElement('td');
                var taskname = document.createElement('td');

                var action = document.createElement('td');

                var ul = document.createElement('ul');
                var li_edit = document.createElement('li');
                var li_delete = document.createElement('li');
                var li_mark = document.createElement('li');
                var a_edit = document.createElement('a');
                var a_delete = document.createElement('a');
                var a_mark = document.createElement('a');
                var i_edit = document.createElement('i');
                var i_delete = document.createElement('i');
                

                a_edit.setAttribute('data-toggle', 'modal');
                a_delete.setAttribute('data-toggle', 'modal');
                a_mark.setAttribute('data-toggle', 'modal');
                a_edit.setAttribute('data-target', '#editModal');
                a_delete.setAttribute('data-target', '#deleteModal');
                

                ul.className = "action-list";

                i_edit.className = 'fa fa-edit';
                i_delete.className = 'fa fa-remove';
                

                tbody.appendChild(tr);
                tr.appendChild(num)
                tr.appendChild(taskname);
                tr.appendChild(action);

                action.appendChild(ul);

                ul.appendChild(li_edit);
                ul.appendChild(li_delete);
                

                li_edit.appendChild(a_edit);
                li_delete.appendChild(a_delete);
                

                a_edit.appendChild(i_edit);
                a_delete.appendChild(i_delete);
                

                num.innerHTML = counter + 1;
                taskname.innerHTML = list['name'];

                a_edit.className = 'taskedit';
                a_delete.className = 'taskdelete';
                

                var edit = document.getElementsByClassName('taskedit')[counter];
                edit.addEventListener('click', function () {
                    var buttonedit = document.getElementById('edittask');

                    buttonedit.addEventListener('click', function () {
                        var taskname = document.getElementById('edittaskname').value;;

                        const request = new XMLHttpRequest();
                        request.open("PATCH", `https://dev.thanqminh.com:3001/task_lists/${list['id']}`);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.setRequestHeader("Access-Token", jwt);
                        request.setRequestHeader("Uid", uid);
                        request.setRequestHeader("Client", client);

                        request.send(JSON.stringify({
                            "name": taskname,
                        }));
                        request.onreadystatechange = function () {
                            if (this.readyState == 4) {
                                alert('Edit task successfully');
                                document.location.reload();
                            }
                        }

                    })

                })

                var deleted = document.getElementsByClassName('taskdelete')[counter];
                deleted.addEventListener('click', function () {
                    var buttondelete = document.getElementById('deletetask');

                    buttondelete.addEventListener('click', function () {
                        var deletedtask = document.getElementById('deletetask');

                        const deleted = new XMLHttpRequest();
                        deleted.open("DELETE", `https://dev.thanqminh.com:3001/task_lists/${list['id']}`);
                        deleted.setRequestHeader("Content-Type", "application/json");
                        deleted.setRequestHeader("Access-Token", jwt);
                        deleted.setRequestHeader("Uid", uid);
                        deleted.setRequestHeader("Client", client);

                        deleted.send();

                        deleted.onreadystatechange = function () {
                            if (this.readyState == 4) {
                                alert('Delete selected task successfully');
                                document.location.reload();
                            }
                        }
                    })
                })



                counter++;

            }

        }
    };
}


