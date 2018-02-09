const express = require('express')
const app = express()
const port = 8080
const request = require ('request')
const fs = require('fs')
app.set('view engine', 'ejs')
app.use(express.static('public'))


let options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/4/list/1',
    qs: { api_key: '2d1610b0077610c43b2fe59ad827cfec', page: '1' },
    headers:
        {
            authorization: 'Bearer <<access_token>>',
            'content-type': 'application/json;charset=utf-8'
        },
    body: {},
    json: true
}

request(options, function (error, response, body) {
    
    if (error) throw new Error(error);
    
    fs.writeFile('list.txt', JSON.stringify(body.results), (err) => {
    })
});


let movieDb
fs.readFile('list.txt', 'UTF8', (err, data)=>{
    movieDb = JSON.parse(data)
})









app.get('/', (req, res)=>{
    res.render('index',{
        movies: getMovies(),

    })
})


app.get('/movie/:movieId', (req, res) => {
    const {movieId} = req.params
    res.render('movie', {
       movie: getMovies(movieId)
    })
});

app.get('/search', (req, res)=>{
    const {searchTerm} = req.query
    res.render('search', {
        movieQuery: filterMovie(searchTerm) 
    })
})

function filterMovie(searchTerm) {
    let arrayOfTerms = searchTerm.split(' ')
    let filteredDB = movieDb.filter((movie, index) => {
        let keywordFound = false
        let count = 0
        let titleArray = movie.title.split(' ')
        titleArray.forEach((titleWord, index) => {
            arrayOfTerms.forEach((word, index) => {
                if (titleWord.toUpperCase() == word.toUpperCase()) {
                    count++
                }
            })
        })
        if (count === arrayOfTerms.length) {
            keywordFound = true
        }
        return keywordFound
    })
    return filteredDB
}


function getMovies(movieId) {
    let filteredMovie 
    if (movieId === undefined) {
        return movieDb 
    } else {
        filteredMovie = movieDb.find((movie)=>{
            if (movie.id == movieId) {
                return movie 
            }
        })  
        
    }  
    return filteredMovie
}







app.listen(port, () => {
    console.log(`Now listening on port: ${port}`)
})