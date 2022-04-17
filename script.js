'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputCountryName = document.querySelector('.input-country-name');
const countryBtn = document.querySelector('.country-btn');

///////////////////////////////////////
// const getCountry= function(country){
// const request= new XMLHttpRequest();

// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// request.addEventListener('load',()=>{
//     const [data]= JSON.parse(request.responseText);
//     console.log(data);

//     const html= `<article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
//     </div>
//   </article>`

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity= 1;
// });
// };

// getCountry('peru');
// getCountry('bangladesh');
// getCountry('russia')

const renderCountry= function(data, className= ''){
    const html= `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
      <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
    </div>
  </article>`

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity= 1;
}

const getCountryData= function(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`).then(response=> response.json()).then(data=>{
        renderCountry(data[0]);
        if(!data[0].borders[0])return;
        data[0].borders.forEach(cuntrycode=>{fetch(`https://restcountries.com/v3.1/alpha/${cuntrycode}`).then(response=> response.json()).then(data=> {
            renderCountry(data[0], 'neighbour')
        })})

    });


}

countryBtn.addEventListener('click', ()=>{
  countriesContainer.innerHTML = '';
  getCountryData((inputCountryName.value).toLowerCase());
})


console.log('Test Start');
setTimeout(()=>console.log('Execute after 0 Sec'), 0);
Promise.resolve('resolve Promise 1').then(res=>console.log(res));
console.log('Test End')