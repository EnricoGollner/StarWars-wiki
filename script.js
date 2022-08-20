window.onload = ()=>{
    fetch('https://sevencoders-starwars-wiki.herokuapp.com/films')
    .then(async (data)=>{  // Recebe os dados da API consumida no fetch
        console.log(data)

        const response = await data.json()
        console.log(response)

        const list = document.getElementById('films-list')

        response.forEach( film =>{
            const filmCard = document.createElement('div')
            filmCard.style.backgroundImage = `url(${film.image_url})`
            filmCard.className = 'film-card'  // Adicionamos uma class name no filmCard
            list.appendChild(filmCard)
        })

    })
    .catch( (error)=>{
        alert('Erro ao carregar os filmes')
        console.log( {error} )  // Exibe no console qual foi o erro
    })
}