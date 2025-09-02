// Spinner
const spinner = style =>{
    document.getElementById('spinner').style.display = style;
}
// Search Countries
const searchBtn = () =>{
    document.getElementById('display-search').textContent = ''
    const searchFiled = document.getElementById('search-filed')
    const searchResult = searchFiled.value
    searchFiled.value = ''
    spinner('block')
    const error = document.getElementById('error')
    error.innerText = ''
    if(searchResult == ''){
        error.innerText = 'Please enter a country name here'
        spinner('none')
    }
    else{
        const url = `https://restcountries.com/v3.1/name/${searchResult}`
        fetch(url)
        .then(res => res.json())
        .then(data =>
        {if(data[0]==undefined){
            error.innerText = `Result Not Found "${searchResult}"`
            error.className = 'text-danger'
            spinner('none')
        }
    else{
        error.innerText = `${data.length} search result found "${searchResult}"`
        error.className = 'text-success'
        displayResult(data)
        spinner('none')
    }})
    }
}
const displayResult = name =>{
    const displaySearch = document.getElementById('display-search')
    displaySearch.textContent = ''
    const div = document.createElement('div')
    div.className = 'col'
    div.innerHTML =`
    <img src="${name[0].flags.png}">
    <h2>Country Name : ${name[0].name.common}</h2>
    <h4>Region: ${name[0].region}</h4>
    <h6>Population: ${name[0].population}</h6>
    <a target="blank" href="${name[0].maps.googleMaps}"><button class="btn btn-primary">Google Map</button></a>
    `
    displaySearch.appendChild(div)
}
// Display all country
const allCountry = () =>{
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => displayCountries(data))
}
allCountry()
const displayCountries = countries =>{
    const display = document.getElementById('display-country')
    countries.forEach(country =>{
        const div = document.createElement('div')
        div.className = 'col'
        div.innerHTML =`
            <img src="${country.flags.png}">
            <h2>Country Name : ${country.name.common}</h2>
            <h4>Region: ${country.region}</h4>
            <h6>Population: ${country.population}</h6>
            <a target="blank" href="${country.maps.googleMaps}"><button class="btn btn-primary">Google Map</button></a>
            `
        display.appendChild(div)

    })
}