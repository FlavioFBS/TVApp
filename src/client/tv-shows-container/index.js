/**
* Module Dependecies
*/
import $ from 'jquery'
import socketio from 'socket.io-client'

// conectarse al servidor
let socket = socketio(/* <ip para conectarse, sino automaticamente al servidor ya existente> */)
// socket.emit('ping') // enviar evento
/* socket.on('pong', () => {
  console.log('pong en cliente')
}) // recibir evento
*/
var $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function (ev) {
  var $this = $(this) // donde se hizo click
  var $article = $this.closest('.tv-show') // buscar el elemento padre(jerarquía) que cumpla condición
  let id = $article.data('id') // devuelve el valor de 'data-id'
  // enviando info al servidor en realTime
  socket.emit('vote', id)
  /* $.post(`/api/vote/${id}`, function () {
    var counter = $this.closest('article').find('.count')
    var content = counter.html()
    var count = parseInt(content)
    count = count + 1
    counter.html(count)
  })
  */
  $article.toggleClass('liked')
})

// recibe evento que avisa que ya se realizó el voto
socket.on('vote:done', vote => {
  // devuelve un voto de un show, se revisará qué elemento se deberá actualizar
  let id = vote.showId
  // obtener el article que contiene al elemento a actualizar
  let $article = $tvShowsContainer.find(`article[data-id = ${id}]`)
  let counter = $article.find('.count')
  counter.html(vote.count) // actualizar el contenido (contador de likes)
})
export default $tvShowsContainer
