const express = require('express')
const router = express.Router()
const request = require('request')
const fs = require('fs')

let movieDb

let options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/4/list/1',
    qs: { api_key: '2d1610b0077610c43b2fe59ad827cfec', page: '1' },
    headers:
        {
            authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDE2MTBiMDA3NzYxMGM0M2IyZmU1OWFkODI3Y2ZlYyIsInN1YiI6IjVhNzFmZTVjMGUwYTI2NWFmMjAwYzAwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1AbXhcWFz0KbNElO3dRBGzq8Lk5KGLT7y5mytHrxdVE',
            'content-type': 'application/json;charset=utf-8'
        },
    body: {},
    json: true
}

request(options,(error, response, body) => {
    if (error) throw new Error(error);

    fs.writeFile('list.txt', JSON.stringify(body.results), (err) => {
    })
});

fs.readFile('list.txt', 'UTF8', (err, data) => {
    movieDb = JSON.parse(data)
})


router.get('/', (req, res) => {
    res.render('index', {
        movies: getMovies(),
    })
})

router.get('/movie/:movieId', (req, res) => {
    const { movieId } = req.params
    res.render('movie', {
        movie: getMovies(movieId)
    })
});

router.get('/search', (req, res) => {
    const { searchTerm } = req.query
    res.render('search', {
        movieQuery: filterMovie(searchTerm)
    })
})

const filterMovie = (searchTerm) => {
    let arrayOfTerms = searchTerm.split(' ')
    let filteredDB = movieDb.filter((movie, index) => {
        let keywordFound = false
        let count = 0
        let titleArray = movie.title.split(' ')
        titleArray.forEach((titleWord, index) => {
            arrayOfTerms.forEach((word, index) => {
                if (titleWord.toUpperCase().includes(word.toUpperCase())) {
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

const getMovies = (movieId)=> {
    let filteredMovie
    if (movieId === undefined) {
        return movieDb
    } else {
        filteredMovie = movieDb.find((movie) => {
            if (movie.id == movieId) {
                return movie
            }
        })

    }
    return filteredMovie
}



module.exports = router 
