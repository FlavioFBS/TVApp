
import $ from 'jquery';
import page from 'page'

$('#app-body')
    .find('form')
    .submit(function(ev){
        ev.preventDefault();
        var querySearch = $(this)
            .find('input[type="text"]')
            .val(); //obtener el valor
            console.log("--->", querySearch);
        page(`/search?q=${querySearch}`)

    })
