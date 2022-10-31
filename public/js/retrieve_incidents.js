const order = ["description", "address", "email", "createdAt"]

function get_incidents(date) {
    fetch(`/get_incidents?date=${date}`)
        .then(jsonres => {
            return jsonres.json()
        })
        .then(res => {
            const table = document.getElementById("incident_table").getElementsByTagName("tbody")[0];
            table.innerHTML = null;
            for (let i = 0; i < res.length; i++) {
                const row = table.insertRow(0);
                for (let j = 0; j < 4; j++) {
                    const cell = row.insertCell(j);
                    cell.innerHTML = res[i][order[j]];
                }
            }
        })
}