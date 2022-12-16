// Bônus - Para completar nosso censo, vamos incrementar o resultado da exibição de um planeta. 
//         Além dos dados solicitados no passo 3, vamos exibir uma lista dos habitantes mais famosos do planeta selecionado. 
//         Utilize os dados vindos no atributo residents para obter a URL de cada habitante. 
//         Com esta URL, faça novas chamadas à API People para obter o nome e a data de nascimento de cada um deles. 
//         Exiba estes dados como uma tabela HTML logo abaixo das informações do planeta.


// Escuta o carregamento da página
var control = document.getElementsByTagName('body')[0];
control.addEventListener('onload', listPlanets());

// Declaração dos conteiners
var listPlanetContainer = document.getElementById('planetario');
var detailPlanetContainer = document.getElementById('result');
var detailResidentContainer = document.getElementById('censo');
var divLoader = document.getElementById('carregando');

// Lista os residentes famosos em uma tabela
async function famousResident(residentUrl){
  divLoader.style.display = "block";
  detailResidentContainer.innerHTML = "";
  var urlsResidentList = residentUrl.split(",");
  if(urlsResidentList[0] === ''){
    let cardResident = document.createElement('h3');
    cardResident.innerHTML = "Este planeta não possui residentes famosos";
    detailResidentContainer.appendChild(cardResident);
  } else {
    let cardResident = document.createElement('table')
    cardResident.innerHTML = "<tr><th>Name</th><th>Birth Year</th></tr>";
    urlsResidentList.forEach(async urlResident => {
      var resultQueryResident = await fetch(`${urlResident}?format=json`);
      var resultQueryResidentJson = await resultQueryResident.json();
      cardResident.innerHTML += `<tr><td>${resultQueryResidentJson.name}</td><td class="center">${resultQueryResidentJson.birth_year}</td></tr>`;
    });
    detailResidentContainer.appendChild(cardResident);
  }
  divLoader.style.display = "none";
}

// Exibe detalhes de um planeta
async function detailPlanet(planetUrl){
  divLoader.style.display = "block";
  detailResidentContainer.innerHTML = "";
  detailPlanetContainer.innerHTML = "";
  var cardPlanetDetailItem = document.createElement('div');
  var resultQueryPlanet = await fetch(planetUrl);
  var resultQueryPlanetJson = await resultQueryPlanet.json();
  cardPlanetDetailItem.innerHTML = `<h2>${resultQueryPlanetJson.name}</h2>
                                    <p><strong>Climate:</strong> ${resultQueryPlanetJson.climate}</p>
                                    <p><strong>Population:</strong> ${resultQueryPlanetJson.population}</p>
                                    <p><strong>Terrain:</strong> ${resultQueryPlanetJson.terrain}</p>
                                    <button onclick="famousResident('${resultQueryPlanetJson.residents}')">Residentes Famosos de ${resultQueryPlanetJson.name}</button>`;
  detailPlanetContainer.appendChild(cardPlanetDetailItem);
  divLoader.style.display = "none";
}

// Rastreia todos os planetas
async function listPlanets(){
  var planetList = [];
  var urlPlanetList = 'https://swapi.dev/api/planets/?page=1&format=json';
  
  while(urlPlanetList != false){
    var resultQueryListPlanet = await fetch(urlPlanetList);
    var resulQueryListPlanetJson = await resultQueryListPlanet.json();

    
    resulQueryListPlanetJson.results.forEach(item => {
      planetList.push(item);
    });
    
    // Verifica a existencia da proxima página de resultados
    if (resulQueryListPlanetJson.next != null){
      urlPlanetList = resulQueryListPlanetJson.next;
    } else {
      urlPlanetList = false;
    }
  }
  // exibe os botões com os nomes dos planetas
  planetList.forEach(planetOfList => {
    var cardPlanetListItem = document.createElement('li');
    cardPlanetListItem.innerHTML = `<button onclick="detailPlanet('${planetOfList.url}?format=json')">${planetOfList.name}</button>`;
    listPlanetContainer.appendChild(cardPlanetListItem);
  });
  divLoader.style.display = "none";
}

// filtra os botões disponiveis pelo campo imput
function search() {
  var input, filter, ul, li, btn, i, txtValue;
  input = document.getElementById('searcher');
  filter = input.value.toUpperCase();
  ul = document.getElementById("planetario");
  li = ul.getElementsByTagName('li');
  
  for (i = 0; i < li.length; i++) {
    btn = li[i].getElementsByTagName("button")[0];
    txtValue = btn.textContent || btn.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}