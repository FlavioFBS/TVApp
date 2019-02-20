var $ = require('jquery')
var localStorage = ``
var $loader = ``
/* cuando termina de cargar el DOM
window.onload = function () {
    alert('cargado')
}
*/
// con JQuery:  $ === jQuery  (ambas son funcion)
$(function () {
  var $tvShowsContainer = $('#app-body').find('.tv-shows')
  $tvShowsContainer.on('click', 'button.like', function (ev) {
    console.log('dando like en:\n' + $(this).text())
    var $this = $(this) // donde se hizo click
    $this.closest('.tv-show').toggleClass('liked') // buscar el elemento padre(jerarquía) que cumpla condición
    /* $this.animate({
      'backGround': 'red',
      'fontSize': '25px',
      'border': '1 solid red'
    }, 'fast') */
  })

  // buscar
  $('#app-body')
    .find('form')
    .submit((ev) => {
      ev.preventDefault()
      let querySearch = $(this)
        .find('input[type="text"]')
        .val() // obtener el valor
      $tvShowsContainer.find('.tv-show').remove()
      $loader = $('<div class="loader">')
      $loader.appendTo($tvShowsContainer)
      // alert("buscado: "+ querySearch)
      $.ajax({
        url: 'http://api.tvmaze.com/search/shows',
        data: { q: querySearch },
        success: function (res, textStatus, xhr) {
          $loader.remove()
          var shows = res.map((el) => {
            return el.show
          })
          renderTemplate(shows)
        }
      })
    })
  var template =
    '<article class="tv-show">' +
    '<div class="left img-container">' +
    '<img src=":img:" alt=":imga alt:">' +
    '</div>' +
    '<div class="right info">' +
    '<h1>:name:</h1>' +
    '<p>:summary:</p>' +
    '<button class="like">Like</button>' +
    '</div>' +
    '</article>'
  /* con callback
  $.ajax({
    url: 'http://api.tvmaze.com/shows',
    success: function(shows, textStatus, xhr){
      // console.log(shows)
      $tvShowsContainer.find('.loader').remove()
      renderTemplate(shows)
    }
  })
  */

  if (!localStorage.shows) {
    console.log('no hay localStorage')
    // con promise:
    $.ajax('http://api.tvmaze.com/shows')
      .then((shows) => {
        $tvShowsContainer.find('.loader').remove()
        localStorage.shows = JSON.stringify(shows) // stringify: de Json a String
        renderTemplate(shows)
      })
  } else {
    console.log('hay localStorage')
    renderTemplate(JSON.parse(localStorage.shows)) // parse: de String a Json
  }

  function renderTemplate (shows) {
    $tvShowsContainer.find('.loader').remove()
    shows.forEach(function (show) {
      var article = template
        .replace(':name:', show.name)
        .replace(':img:', show.image.medium)
        .replace(':summary:', show.summary)
        .replace(':img alt:', `${show.name} Logo`)
      var $article = $(article)
      $tvShowsContainer.append($article.fadeIn(3500))
    })
  }
  /** Guía de tutorial
    /* obtener los 'p' de la clase text, que tengan 'a'
    $('p')
      .filter('.text')
      .has('a')
      eq(1) // elemento en posicion 1 (con respecto al arreglo que retorna)
      *
    // agregar elementos al DOM
    var a = $( '<a>', {
      href: 'www.google.com',
      target: '_blank',
      html: 'Link agregado con JQuery'
    })
    $('#app-body').append(a[0])
    console.log(a.attr('href'))  // ver atributos de un objeto (getter)
    a.attr('href', 'https:youtube.com') // setter de atributos
    // agregar contenido:
    $('header#app-header')
      .append($('<p>', {html: 'Recien creado'}))
  })
  // otras formas:
  /*
  $().ready(function(){})
  $(function(){})
  **En caso de usar prototype, hacer: $.noConflict() -> y $==prototype
  */
})
