
const bannertv = () =>{
    const $slick = $('.js-bannertv')
    const $title = $('.banner-navigation h2')

    $slick.slick({
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        cssEase: 'linear',
        dots:true,
        dotsClass: 'custom-paging',
        customPaging: function (slider, i) {
            return  (i + 1) + '/' + slider.slideCount;
        },
        appendDots: $('.slick-navigation'),
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next')
    
    });

    titleNavigation($title, $slick)
}

const titleNavigation = (title, slick) =>{
    let initialtitle = $('.slick-slide.slick-active .banner-title').text()
    title.text(initialtitle)
    slick.on('afterChange', function (){
        let nextTitle = $('.slick-slide.slick-active .banner-title').text()
        title.text(nextTitle)
    })
}

$(document).ready(function(){
    bannertv();
})
