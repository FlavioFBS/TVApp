/**
* Module Dependecies
*/

import $ from 'jquery';
import page from 'page'
import { getShows, searchShow } from 'src/client/tvmaze-api-client'
import renderTemplate from 'src/client/render'
import $tvShowsContainer from 'src/client/tv-shows-container'
import 'src/client/search-form'
import qs from 'qs'   //para leer los valores que lleguen por parametros

page('/', (ctx, next)=>{
    $tvShowsContainer.find('.tv-show').remove()
    //if(!localStorage.shows){
        getShows(function(shows){
            console.log("no hay localStorage");
            $tvShowsContainer.find('.loader').remove();
            localStorage.shows=JSON.stringify(shows);  //stringify: de Json a String
            renderTemplate(shows);
        })
    //}
    /*else{
        console.log('hay localStorage');
        renderTemplate(JSON.parse(localStorage.shows));  //parse: de String a Json
    }*/
})

page('/search', (ctx, next)=>{
    $tvShowsContainer.find('.tv-show').remove()
    var $loader=$('<div class="loader">');
    $loader.appendTo($tvShowsContainer);
    // querystring -->   'q=showEjm'  ...  parse lo transformará a json
    const querySearch = qs.parse(ctx.querystring)
    console.log("a buscar xd: ", querySearch , "en contexto: ", ctx );
    searchShow( querySearch,function(res){
        $loader.remove();
        var shows = res.map(function(el){
            return el.show;
        })
        renderTemplate(shows)
    })
})


page()
