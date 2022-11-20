const order = ["description", "address", "email", "createdAt"]
const today_date = new Date().toDateString();

//badge HTML element
const badge = document.createElement("span");
badge.className = "badge rounded-pill bg-primary text-uppercase me-1";
badge.innerText = "Nouveau";

/**
 * function to fetch incidents relevant to search/date and to fill table with said elements
 * (gets all incidents if no args)
 *
 * @param date null if none specified
 * @param search null if none specified
 */
function get_incidents(date, search) {
    if (!search && window.location.search) {
        search = (new URLSearchParams(window.location.search)).get("search");
    }
    fetch(`/get_incidents?date=${date}&search=${search}`)
        .then(jsonres => {
            return jsonres.json()
        })
        .then(res => {
            //insert row then columns
            const table = document.getElementById("incident_table").getElementsByTagName("tbody")[0];
            table.innerHTML = null;
            for (let i = 0; i < res.length; i++) {
                const row = table.insertRow(0);

                let is_new = false;
                //are we on the same day as the incident ?
                if (new Date(res[i][order[3]]).toDateString() === today_date) {
                    is_new = true;
                }

                for (let j = 0; j < 4; j++) {
                    const cell = row.insertCell(j);

                    cell.innerHTML = res[i][order[j]];
                    if (is_new === true) {
                        //we have to clone the object, since there can be multiple badges
                        cell.prepend(badge.cloneNode(true));
                        is_new = false;
                    }
                }
            }
        })
}