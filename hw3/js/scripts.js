document.querySelector("#searchButton").addEventListener("click", findQuakes);

async function findQuakes(){
    try{
        let dateStart = document.querySelector("#dateStart").value;
        let dateEnd = document.querySelector("#dateEnd").value;
        let magnitude = document.querySelector("#mag").value;

        let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dateStart}&endtime=${dateEnd}T23:59:59&minmagnitude=${magnitude}&maxmagnitude=${Number (magnitude)+1}`
        let response = await fetch(url);
        let data = await response.json();

        let results = document.querySelector("#quakeResults");

        results.innerHTML=""

        if (data.features.length === 0) {
            results.innerHTML = `
                <tr>
                    <td colspan="3">No earthquakes found</td>
                </tr>
            `;
            return;
        }

        for(let quake of data.features){
            let row = document.createElement("tr")

            let dateCell = document.createElement("td");
            let locationCell = document.createElement("td")
            let magnitudeCell = document.createElement("td")

            dateCell.textContent = new Date(quake.properties.time).toLocaleDateString("en-US", {timeZone: "UTC"});
            locationCell.textContent = quake.properties.place;
            magnitudeCell.textContent = quake.properties.mag;

            row.appendChild(dateCell);
            row.appendChild(locationCell);
            row.appendChild(magnitudeCell);

            results.appendChild(row);
        }
    }catch (error){
        document.querySelector("#quakeResults").innerHTML =`
            <tr>
                <td colspan="3">Unable to retrieve earthquakes</td>
            </tr>
        `;
        console.error(error);
    }
}