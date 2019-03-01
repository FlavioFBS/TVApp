/**
* Module Dependecies
*/

import $ from 'jquery'
import page from 'page'
import { getShows, searchShow } from 'src/client/tvmaze-api-client'
import { renderTemplate, renderChat } from 'src/client/render'
import $tvShowsContainer from 'src/client/tv-shows-container'
import 'src/client/search-form'
import qs from 'qs' // para leer los valores que lleguen por parametros

page('/', (ctx, next) => {
  $tvShowsContainer.find('.tv-show').remove()
  $tvShowsContainer.find('.chat-container').remove()
  console.log(`client-index--- /`)
  getShows(function (shows) {
    $tvShowsContainer.find('.loader').remove()
    renderTemplate(shows)
  })
})

page('/search', (ctx, next) => {
  $tvShowsContainer.find('.tv-show').remove()
  var $loader = $('<div class="loader">')
  $loader.appendTo($tvShowsContainer)
  // querystring -->   'q=showEjm'  ...  parse lo transformará a json
  const querySearch = qs.parse(ctx.querystring)
  searchShow(querySearch, function (shows) {
    $loader.remove()
    // map se hará por el backend
    renderTemplate(shows)
  })
})

page('/chat/:showId', (ctx, next) => {
  $tvShowsContainer.find('.tv-show').remove()
  renderChat(ctx.params.showId)
})

var productionEnv = !!~window.location.host.indexOf('github.io')

if (productionEnv) {
  page.base('/tvify')
}

page()
