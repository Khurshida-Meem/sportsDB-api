document.getElementById('spinner').style.display = 'none';
const textInput = document.getElementById('text-field');
const divContainer = document.getElementById('element-container');
const teamInfo = document.getElementById('team-info');
const showError = document.getElementById('show-error');

// load data for search all teams
const loadData = async () => {
    const input = textInput.value;
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${input}`
    document.getElementById('spinner').style.display = 'block';
    const res = await fetch(url);
    const data = await res.json();
    if(input === ''){
        divContainer.textContent = '';
        showError.innerText = "team name can't be empty";
    }
    else if(data.teams === null){
        divContainer.textContent = '';
        showError.innerText = "please provide a valid team name";
    }
    else{
        showError.textContent = '';
        showData(data.teams);
    }
    
    textInput.value = '';
    document.getElementById('spinner').style.display = 'none';
}

// show data for searched teams
const showData = datas => {
    divContainer.textContent = '';
    teamInfo.textContent = '';
    datas.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
         <div class="card h-100">
            <img src="${data.strTeamBadge}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">${data.strTeam}</h5>
                <p class="card-text">This is a wider card with supporting text below as anaturallead-in to additional content. This content is a little bit longer.</p>
            </div>
            <button class="btn btn-outline-success" onclick="loadTeamInfo(${data.idTeam})">See more</button>
        </div>
        `
        divContainer.appendChild(div);
    })
    document.getElementById('spinner').style.display = 'none';
}

const loadTeamInfo = async teamId => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`
    const res = await fetch(url);
    const data = await res.json();
    singleTeamInfo(data.teams[0]);

}

const singleTeamInfo = team => {
    teamInfo.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mb-3">
      <img src="${team.strTeamBanner}" class="card-img-top " alt="...">
      <div class="card-body">
        <h5 class="card-title">${team.strTeam}, ${team.strGender}</h5>
        <p class="card-text">${team.strDescriptionEN}</p>
        <p class="card-text"><small class="text-muted">${team.strCountry}</small></p>
      </div>
    </div>
    
    `
    teamInfo.appendChild(div);
}

