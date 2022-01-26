//const api_url = "<heroku_app_url>"
const api_url = "https://esdtcetproject.herokuapp.com/api-shares"
function loadData(records = []) {
    var table_data = "";
    for (let i = 0; i < records.length; i++) {
        table_data += `<tr>`;
        table_data += `<td>${records[i].Name}</td>`;
        table_data += `<td>${records[i].Sector}</td>`;
        table_data += `<td>${records[i].Open}</td>`;
        table_data += `<td>${records[i].Close}</td>`;
        table_data += `<td>${records[i].Low}</td>`;
        table_data += `<td>${records[i].High}</td>`;
        table_data += `<td>${records[i].Volume}</td>`;
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

