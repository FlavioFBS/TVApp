/**
* Module Dependecies
*/
import $ from 'jquery'


export function getShows(fn) {
    $.ajax('http://api.tvmaze.com/shows', {
        success: function (shows, textStatus, xhr) {
            $.get('/api/votes', (votes) => {
                shows = shows.map(show => {
                    //seleccionar voto por id
                    var vote = votes.filter(vote => vote.showId === show.id)[0]
                    //dar valor del contador de votos 
                    show.count = vote ? vote.count : 0
                    return show
                })
                fn(shows)

            })
        }
    })
}

export function searchShow(querySearch, fn) {
    $.ajax('http://api.tvmaze.com/search/shows', {
        data: querySearch,
        success: function (res, textStatus, xhr) {
            fn(res)
        }
    })
}
