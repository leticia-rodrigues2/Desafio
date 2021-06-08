const PRIVATE_KEY = "6293c16d7ab6b2f922e531d77336f0c9d8e651fd";
const PUBLIC_KEY = "096afae68d49ac8cbef20effc5ebaa40";
// gerar a senha por meio do hash

function generateHash() {
    return CryptoJS.MD5(`1${PRIVATE_KEY}${PUBLIC_KEY}`).toString();
}
async function getHerois() {
    let nameStartsWith =  $('#searchInput').val();
    try {
        // Parametros de consulta
        let data = {
            apikey: PUBLIC_KEY,
            ts: 1,
            hash: generateHash(),
            offset: 0,
            orderBy: '-modified',
        };
        // filtrar pesquisa pelo nome
        if (nameStartsWith)
            data.nameStartsWith = nameStartsWith;
        return await $.ajax({
            url: `https://gateway.marvel.com/v1/public/characters`,
            data
        });
    } catch (e) {
        alert(e);
    }       
}

// criando os card com cada elemento do vetor e criando a parte de pesquisa

async function pesquisar(){
    let herois = (await getHerois()).data.results;
    let html = '';
    for(let h of herois) {
        html += `<div class="col">
         <div class="card h-100" <span class="border border-secondary"></span>
          <img src="${h.thumbnail.path}.${h.thumbnail.extension}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${h.name}</h5>
            <p class="card-text">${h.description}</p>
          </div>
        </div>
      </div>`;
    }
    $('#herois').html(html);
}


