/**
* Module Dependecies
*/
import $ from 'jquery'

var $tvShowsContainer = $('#app-body').find('.tv-shows');

$tvShowsContainer.on('click', 'button.like', function(ev){
    var $this = $(this);  //donde se hizo click
    var $article = $this.closest('.tv-show')
    let id = $article.data('id'); //devuelve el valor de 'data-id'
    $.post(`/api/vote/${id}`, ()=>{
        let counter = $this.closest('article').find('.count')
        let content = counter.html()
        let count = Number(content)
        count=count+1
        counter.html(count)
        $article.toggleClass('liked')   //buscar el elemento padre(jerarquía) que cumpla condición

    })

})

export default $tvShowsContainer
