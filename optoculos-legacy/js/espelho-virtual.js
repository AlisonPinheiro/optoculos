var params = {
  apiKey: 'oP4Swp1JIgRXv15uugopLYObx8gY8J2Cq9tArzNs',
  popupIntegration: {
    centeredHorizontal: true,
    centeredVertical: true,
    width: '600px',
    height: '500px',
  },
};

window.fitmixInstance = FitMix.createWidget('my-fitmix-container', params);

function getButtons() {
  let glassid = oculos_list.find(el => el.codprod === Number($("body.product .mainProductInfo h6.productReference div").text()));
  if(glassid){
    $(".product-espelho-vitrine button").attr("onclick", `fitmixInstance.setFrame('${glassid["GLASSID"]}')`);
    $(".product-espelho-vitrine").show();
  }else{
    $(".product-espelho-vitrine").hide();
  }



  //PARA AS PRATELEIRAS

  let howManyShelfs = $(".shelf.productList li").length;

  for (let i = 0; i < howManyShelfs; i++) {
    let myId = $($(".shelf.productList li .idProd")[i]).text();
    myId = Number(myId);
    let shelfGlassId = oculos_list.find(el => el.IDPVTEX === myId);
    if (shelfGlassId == undefined) {
      //do nothing
    } else {
      $($(".product-espelho-vitrine-shelf button")[i]).attr("onclick", `fitmixInstance.setFrame('${shelfGlassId["GLASSID"]}')`);
      $($(".product-espelho-vitrine-shelf")[i]).css({ "display": "block" })
    }
  }
}


setTimeout(function () {
  getButtons()

}, 1000)

$(".btn-load-more.confira-todos-produtos").on('click', () => {
  console.log("buscando espelhos...")
  setTimeout(function () {
    getButtons()

  }, 2000)

})


