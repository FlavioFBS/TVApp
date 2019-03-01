/**
* Module Dependecies
*/
import $ from 'jquery'
import socketio from 'socket.io-client'
import page from 'page'
// conectarse al servidor
let socket = socketio(/* <ip para conectarse, sino automaticamente al servidor ya existente> */)
// socket.emit('ping') // enviar evento
/* socket.on('pong', () => {
  console.log('pong en cliente')
}) // recibir evento
*/
var $tvShowsContainer = $('#app-body').find('.tv-shows')

$tvShowsContainer.on('click', 'button.like', function (ev) {
  let $this = $(this) // donde se hizo click
  let $article = $this.closest('.tv-show') // buscar el elemento padre(jerarquía) que cumpla condición
  let id = $article.data('id') // devuelve el valor de 'data-id'
  // enviando info al servidor en realTime
  socket.emit('vote', id)
  console.log(`en boton like-  id-->>> ${id}`)
  $article.toggleClass('liked')
})

$tvShowsContainer.on('click', 'button.chat', function (ev) {
  console.log(`boton de chat`)
  let $thisChat = $(this)
  let $articleChat = $thisChat.closest('.tv-show')
  let idChat = $articleChat.data('id')
  page('/chat/' + idChat)
})

$tvShowsContainer.on('keypress', '.chat-nick', function (ev) {
  console.log(`keypress de chat--nick`)
  let $this = $(this)
  let $chatInput = $('.chat-input')
  // habilitar el area para escribir mensajes
  $chatInput.prop('disabled', $this.val().length === 0)
})

$tvShowsContainer.on('keypress', '.chat-input', function (ev) {
  let $this = $(this)
  let nick = $('.chat-nick').val()
  // si se presiona 'enter'
  if (ev.which === 13) {
    let message = $this.val()
    // enviar el mensaje al servidor:
    socket.emit('message', { nick, message })
    addMessage(nick, message) // agregar mensaje
    $this.val('') // limpiar la zona de envía de mensajes
  }
})

// recibe evento que avisa que ya se realizó el voto
socket.on('vote:done', vote => {
  // devuelve un voto de un show, se revisará qué elemento se deberá actualizar
  let id = vote.showId
  // obtener el article que contiene al elemento a actualizar
  let $article = $tvShowsContainer.find(`article[data-id = ${id}]`)
  let counter = $article.find('.count')
  counter.html(`${vote.count}`) // actualizar el contenido (contador de likes)
})

socket.on('message', msg => {
  // obtener el nick y el mensaje:
  let { nick, message } = msg
  // agregar en la lista de mensajes
  addMessage(nick, message)
})

// para mostrar los mensajes
function addMessage (nick, message) {
  let $chatBody = $('.chat-body')
  $chatBody.append(`<p><b>${nick}: </b>${message}</p>`)
}

export default $tvShowsContainer
