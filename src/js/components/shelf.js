const productList = () => {
    if (window.screen.width > 1024) return
    $('.product-list').slick({
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        cssEase: 'linear',
        prevArrow: `<button type="button" class="slick-prev">
                        <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3575 0L0.786 12.5715L0 13.3935L0.786 14.2155L13.3575 26.787L15.0075 25.137L3.249 13.3935L14.9985 1.644L13.3575 0Z" fill="black"/>
                        </svg>
        
                    </button>`,
        nextArrow: `<button type="button" class="slick-next">
                        <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.64414 0L-0.00585938 1.65L11.7436 13.3995L-0.00585938 25.149L1.64414 26.799L14.2156 14.2275L15.0016 13.4055L14.2156 12.5835L1.64414 0Z" fill="black"/>
                        </svg>
                    </button>`,
    });
}

$(document).ready(function () {
    productList();
})