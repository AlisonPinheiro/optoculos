const $body = $('body')
const menu = () =>{
    $body.on('click', '.js-menu-open', function(){
        $body.toggleClass('menu-is-open')
    })

    if (!window.screen.width > 1024) return
    $body.on('mouseenter', '.menu-nav', function(){
        $body.addClass('menu-is-open')
    })
    $body.on('mouseleave', '.menu-nav', function(){
        $body.removeClass('menu-is-open')
    })
}

$(document).ready(function(){
    menu();
})