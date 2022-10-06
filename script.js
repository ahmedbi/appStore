const API_URL = 'https://raw.githubusercontent.com/ahmedbi/web2020/main/reviews/movie.json'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280' // using in line 3
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main') // get tage Main in html File
const form = document.getElementById('form') // get tage for in html file Note form content search gat
const search = document.getElementById('search') // get search tage in html File


// Get initial movies
getMovies(API_URL)

async function getMovies(url) { // url is API_url
    const res = await fetch(url) // make request for API_URL
    const data = await res.json() // change Response to json Data

    showMovies(data.results)// Send Response Data to showMovies method for display on page :index.html
}

function showMovies(movies) {
    main.innerHTML = '' // Creat new InnerHTML to add Movies

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie // return value from json 

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        // make html for Move
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        //  add movie to HTML Page
        main.appendChild(movieEl)
    })
}


// return Movie Rate with color
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


// Listener Search Event 
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})