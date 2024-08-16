const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {
    console.log(data);

    // destructuring properties
    const { cityDetails, weather } = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.LocalizedName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span> <span>&deg;C</span>
        </div>  
    `;

    // remove 'd-none' class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    };

    // update the night/day & icon images
    const iconSrc = `assets/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    const timeSrc = weather.IsDayTime ? 'assets/img/day.svg' : 'assets/img/night.svg';
    time.setAttribute('src', timeSrc);

};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

const storedCity = localStorage.getItem('city');
if (storedCity !== null) {
    // update the UI with new city
    forecast.updateCity(storedCity)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}