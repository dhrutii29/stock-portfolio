//const api_url = "<heroku_app_url>"
const api_url = "https://esdtcetproject.herokuapp.com/api-users"
function loadData(records = []) {
    console.log(records);
    var table_data = "";
    for (let i = 0; i < records.favs.length; i++) {
        console.log("I am here now")
        table_data += `<tr>`;
        table_data += `<td>${records.favs[i].stock}</a></td>`;
        table_data += `<td>`;
        table_data += '&nbsp;&nbsp;';
        table_data += `<button class="btn btn-danger text-center" onclick=deleteData('${records._id}')>Remove</button>`;
        table_data += `</td>`;
        table_data += `</tr>`;
    }
    console.log(table_data);
    document.getElementById("tbody").innerHTML = table_data;
}

function getDataById(id) {
    fetch(`${api_url}/${id}`)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            loadData(data);
            // document.getElementById("id").value = data._id;
            // document.getElementById("name").value = data.name;
            // document.getElementById("email").value = data.email;
            // document.getElementById("contactNo").value = data.contactNo;
        })
}
function postData() {
    var stock = document.getElementById("stock").value;
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