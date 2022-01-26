//const api_url = "<heroku_app_url>"
const api_url = "https://esdtcetproject.herokuapp.com/api-users"
function loadData(records = []) {
    var table_data = "";
    for (let i = 0; i < records.length; i++) {
        table_data += `<tr>`;
        table_data += `<td><a href="view.html?id=${records[i]._id}">${records[i].name}</a></td>`;
        table_data += `<td>${records[i].email}</td>`;
        table_data += `<td>${records[i].contactNo}</td>`;
        table_data += `<td>`;
        table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary text-center">Edit</button></a>`;
        table_data += '&nbsp;&nbsp;';
        table_data += `<button class="btn btn-danger text-center" onclick=deleteData('${records[i]._id}')>Delete</button>`;
        table_data += `</td>`;
        table_data += `</tr>`;
    }
    //console.log(table_data);
    document.getElementById("tbody").innerHTML = table_data;
}
function getData() {
    fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            loadData(data);
        });
}
function getDataById(id) {
    fetch(`${api_url}/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("id").value = data._id;
            document.getElementById("name").value = data.name;
            document.getElementById("email").value = data.email;
            document.getElementById("contactNo").value = data.contactNo;
        })
}
function postData() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var contactNo = document.getElementById("contactNo").value;

    data = { name: name, email: email, contactNo: contactNo };
    fetch(api_url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            window.location.href = "users.html";
        })
}
function putData() {
    var _id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var contactNo = document.getElementById("contactNo").value;
    data = { _id: _id, name: name, email: email, contactNo: contactNo };
    fetch(api_url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.table(data);
            window.location.href = "users.html";
        })
}
function deleteData(id) {
    user_input = confirm("Are you sure you want to delete this record?");
    if (user_input) {
        fetch(api_url, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "_id": id })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
    }
}