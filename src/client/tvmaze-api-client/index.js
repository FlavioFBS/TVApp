/**
* Module Dependecies
*/
import $ from 'jquery'

export function getShows (fn) {
  $.ajax('/api/shows', {
    success: function (shows, textStatus, xhr) {
      fn(shows) // el callback hará el renderizado
    }
  })
}

export function searchShow (busqueda, fn) {
  $.ajax('/api/search', {
    data: busqueda,
    success: function (shows, textStatus, xhr) {
      fn(shows)
    }
  })
}
