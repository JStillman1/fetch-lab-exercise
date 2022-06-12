const container = document.querySelector("#container");
const form = document.querySelector("#getInfo");
const loading = document.querySelector("h4");


const getCountryByName = (countryName) => {
    loading.innerText = "Loading..."
    container.innerHTML = "";
    fetch("https://restcountries.com/v3.1/name/" + countryName)
        .then(response => checkSuccess(response))
        .then(data => {
            addToDocument(data[0]);
            loading.innerText = "";
        })
        .catch(error => console.error(error))
}

const addToDocument = (countryData) => {
    const newHeading = document.createElement("h2");
    const newCapital = document.createElement("p");
    const newPopulation = document.createElement("p");
    const newFlag = document.createElement("img");

    newHeading.innerHTML = countryData.name.common;
    newCapital.innerText = ("Capital: " + countryData.capital);
    newPopulation.innerText = ("population is: " + countryData.population);
    newFlag.src = countryData.flags.png;
    container.appendChild(newHeading);
    container.appendChild(newCapital);
    container.appendChild(newPopulation);
    container.appendChild(newFlag);

}

const getAllCountries = () => {
    loading.innerText = "Loading..."
    container.innerHTML = "";
    fetch("https://restcountries.com/v3.1/all")
        .then(response => checkSuccess(response))
        .then(dataArray => {
            dataArray.forEach(addToDocument)
            loading.innerText = "";
        })
        .catch(error => console.error(error))
}

const checkSuccess = (response) => {
    if(!response.ok){
        return Promise.reject("An error occurred");
    }
    return response.json();
}



form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(event.target.countryInfo.value === ""){
        getAllCountries();
    }
    else{
        getCountryByName(event.target.countryInfo.value);
    }
})