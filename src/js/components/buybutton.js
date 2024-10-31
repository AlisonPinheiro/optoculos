import Swal from "sweetalert2";

const buyButton = () =>{
    $('body').on('click', '.js-buy' , function(){
        Swal.fire({
            html: `<h2 class="product-confirmation">Pedido realizado com sucesso!</h2> <span class="line"></span>`,
            width: 400,
            heightAuto: false,
            padding: '1em',
            color: '#716add',
            showCloseButton: true,
            closeButtonHtml: `<svg width="47" height="50" viewBox="0 0 47 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.0712 37.5068C40.9748 30.5996 40.9748 19.4008 34.0712 12.4935C27.1675 5.58633 15.9745 5.58633 9.07092 12.4935C2.16729 19.4008 2.16729 30.5996 9.07092 37.5068C15.9745 44.414 27.1675 44.414 34.0712 37.5068Z" fill="#F55959"/>
            <path d="M14.9136 16.6666L13.2461 18.3333L29.0878 34.1668L30.7554 32.5001L14.9136 16.6666Z" fill="white"/>
            <path d="M29.9219 18.3336L28.2544 16.6669L13.2464 31.667L14.914 33.3337L29.9219 18.3336Z" fill="white"/>
            </svg>
            ` ,
            showConfirmButton: false,
            background: `
                #fff 
                url(/img/mario-success.png)
                center bottom
                no-repeat
                `,
            backdrop:'rgba(8, 65, 84, 0.62)'
          })

          $(this).addClass('is-purchased')
          $(this).text('comprado')
        countMinicart();
    })
}

const countMinicart = () =>{
    let productCount = $('.minicart-count').text()
    productCount = parseInt( productCount)
    $('.minicart-count').text(productCount + 1)
}

$('document').ready(function(){
    buyButton();
})