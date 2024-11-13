var fns = {
	lightboxOverlay: $('<div class="lightboxOverlay"></div>'),

    lightboxBlock: $('<div class="lightboxOverlayInner"></div><div class="lightboxBlock"><a href="#" class="lightboxClose"></a><div class="lightboxInner"></div></div>'),

    lightbox: function (content, width, height) {
        $(content).appendTo(".lightboxInner");

        var pageHeight = $(window).height();
        var pageWidth = $(window).width();
        var contentWidth = width;
        var contentHeight = height;
        var maxWidthContent = pageWidth * 0.8;
        var maxHeightContent = pageHeight * 0.8;

        if(contentWidth > maxWidthContent){
            var contentWidthFinal = maxWidthContent;
        } else {
            var contentWidthFinal = contentWidth;
        }

        if(contentHeight > maxHeightContent){
            var contentHeightFinal = maxHeightContent;
        } else {
            var contentHeightFinal = contentHeight;
        }

        $('.lightboxOverlay').css({
            'position':'fixed',
            'top':'0',
            'left':'0',
            'background-color':'rgba(0,0,0,0.5)',
            'height':'100%',
            'width': '100%',
            'z-index':'5005'
        });

        $('.lightboxOverlay').addClass("open");

        // console.log(contentHeightFinal);
        // console.log(contentWidthFinal);

        $('.lightboxClose').click(function(){
            $('.lightboxOverlay').removeClass("open");
            $(".lightboxInner").empty();
        });

        $('.lightboxOverlayInner').click(function(){
            $('.lightboxOverlay').removeClass("open");
            $(".lightboxInner").empty();
        });
    },

	tabs: function(){
		$(".tabNav").on("click", ".tabLink", function() {
	        var ref = $(this).attr("data-ref");
	        $(".tabLink, .tabContent").removeClass("active");
	        $(this).addClass("active");
	        $(".tabsItems").find("."+ref).addClass("active");
	    });  
	},

	isMobile: function(){
		var userAgent = navigator.userAgent.toLowerCase();
		if( userAgent.search(/(android|avantgo|blackberry|iemobile|nokia|lumia|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i)!= -1 ){			
			return true;
		};
	},

	shareWindow: function(urlProduct, urlMediaProduct){
		var facebook = "https://www.facebook.com/sharer/sharer.php?u=" + urlProduct,
		twitter = "https://twitter.com/home?status=" + urlProduct,
		pinterest = "https://pinterest.com/pin/create/button/?url=" + urlProduct + "&media=" + urlMediaProduct,
		gplus = "https://plus.google.com/share?url=" + urlProduct;

		$(".shareProduct .facebook").attr("href", facebook);
		$(".shareProduct .twitter").attr("href", twitter);
		$(".shareProduct .pinterest").attr("href", pinterest);
		$(".shareProduct .gplus").attr("href", gplus);

		$(".shareProduct a").on("click", function(){
        	newwindow=window.open($(this).attr('href'),'','height=400,width=400');
        	if (window.focus) {newwindow.focus()}
        	return false;	
		});
	},

	imageFull: function($element){
		$element.each(function() {
           var bImg = $(this).find("img").attr("src");
           $(this).find("a").attr("style","background-image:url("+bImg+");background-repeat: no-repeat; background-position: center; background-size: contain");
           $(this).find("img").remove();
        });
	},

	verifyWidth: function () {
		if ($(window).width() <= 1024) {
			$('body').addClass('isMobile');
			$('body').removeClass('notMobile');
			return true
		} else {
			$('body').removeClass('isMobile');
			$('body').addClass('notMobile');
			return false
		}
	},

	wrapText: function(string, strLength, complement) {
		if(string.substring().length > strLength) {
			return string.substring(0, strLength) + complement;
		} else {
			return string;
		}
	},
}

var global = {
	init: function () {
		global.selectToggle();
		global.floatHeader();
		global.menu();
    	global.menuOver();
    	global.menuToggle();
		global.toggleSearch();
		global.footerMenuToggle();
        global.flagDiscount();
        global.newsletterRegister();
        global.returnToTop();
        global.fixShelfHover();

		$(document).ajaxStop(function(){
            global.autocompleteClone();
        })
    },

    fixShelfHover: function() {
        
        $('.productList li').each(function(n){
            $(this).find('.productImage .secondImage img').length == 0 ? $(this).find('.productImage .firstImage').css('opacity','1') : '' ;
            console.log('second image');
        });
    },

    selectToggle: function(){
    	$('.dropdown .select').on('click', function (e) {
    		e.preventDefault();
    		if ($(this).parent().hasClass("active")) {
    			$(this).parent().removeClass("active");
    		} else {
    			$(this).parent().addClass("active");
    		}
    	})
    	$(document).mouseup(function(e) {
    		$('.dropdown').each(function () {
    			if ($(this).parent().addClass('active')) {
    				var container = $(this);
		            if (!container.is(e.target) && container.has(e.target).length === 0) {
		                container.removeClass("active");
		            }
    			}
    		})

	    })
    },
    
    floatHeader: function() {
        $(window).bind("scroll", function() {
            if ($(this).scrollTop() > 200) {
                $('body').addClass('floatElement');
            } else {
                $('body').removeClass('floatElement');
            }
            if ($(this).scrollTop() > 250) {
                $('.pageHeader').addClass('floatHeader');
                $('.navBar').addClass('floatNavBar');
            } else {
                $('.pageHeader').removeClass('floatHeader');
                $('.navBar').removeClass('floatNavBar');
            }
        });
    },

    userLogged: function(){
        vtexjs.checkout.getOrderForm().done(function(data){
            var userName;
            if (data.loggedIn){ // Se logado
                if(data.clientProfileData.firstName != null) {
                    userName = data.clientProfileData.firstName;
                } else {
                    userName = data.clientProfileData.email;
                }

                $('.enterAccount > a').text("Minha conta");
                $('.hideContent .welcomeMsg').addClass('userLogged').html('<a href="/no-cache/user/logout">Sair</a>');

                $('.navHead .welcomeMsg').addClass('userLogged').html('<span>Olá '+userName+'</span><a href="/no-cache/user/logout">Sair</a>');
                $('.navHead .accountMobileNav').addClass('userLogged');

            } else { // se NÃO logado
                //$('.welcomeMsg a').text("Entrar ");
            }
        });
    },
	
    menu: function(){
    	
    },

    menuOver: function() {
        var menuOutObject;
        var menuOutTimer;
        $('.pageNav .menu-departamento h3.hasSubmenu').hover(
            function() {
    			if (!fns.verifyWidth()) {
	                menuOutObject = $(this).next('.submenu');

	                if (!menuOutObject.is(':visible')) {
	                    hideMenuSubItems($('.pageNav .menu-departamento .submenu:visible'));
	                }
	                clearTimeout(menuOutTimer);
	                menuOutObject.fadeIn(300);
	                $('.navOverlay').addClass('active').fadeIn(300);
	                $('.modalSearch .closeModal').trigger('click');
    			}
            },

            function() {
                menuOutTimer = setTimeout(function() {
                	if (!fns.verifyWidth()) {
	                	hideMenuSubItems(menuOutObject);
	                	$('.navOverlay').removeClass('active').fadeOut(300);
                	}
	            }, 10);
        	}
        );

        $('.pageNav .menu-departamento .submenu').hover(
            function() {
            	if (!fns.verifyWidth()) {
	                menuOutObject = $(this);
	                clearTimeout(menuOutTimer);
	            }
            },
            function() {
                menuOutTimer = setTimeout(function() {
                	if (!fns.verifyWidth()) {
	                	hideMenuSubItems(menuOutObject);
	                	$('.navOverlay').removeClass('active').fadeOut(300);
	            	}
	            }, 10);
        	}
        );

        if (!fns.verifyWidth()) {
	        $(".pageNav .menu-departamento .submenu").mouseover(function(){
	            $(this).find('h3').addClass("active");
	        });
	        $(".pageNav .menu-departamento .submenu").mouseout(function(){
	            $(this).find('h3').removeClass("active");
	        });
        };

        function hideMenuSubItems(o) {
            o.stop(true,true).fadeOut(300);
        };
    },

    menuToggle: function () {
        // Open Menu
        $('.menu-mobile-toggle').on('click', function (e) {
            if (fns.verifyWidth()) {
                e.preventDefault();
                $('.pageNav').addClass('open');
                $('body').addClass('menuOpen');
                if ($('.navOverlay').css("display") == "none") {
                	$('.navOverlay').fadeIn(300);
                }
                //$('.navOverlay').addClass('active');
            }
        })

        //Close Menu
        $('.navHead .ico-close, .navOverlay').on('click', function (e) {
            if (fns.verifyWidth()) {
                e.preventDefault();
                $('.pageNav').removeClass('open');
                $('body').removeClass('menuOpen');
                if ($('.navOverlay').css("display") == "block") {
                	$('.navOverlay').fadeOut(300);
                }
                //$('.navOverlay').removeClass('active');
            }
        });


    	//Open Submenu
    	$('.menu-departamento h3 a i').on('click', function (e) {
            if (fns.verifyWidth()) {
            	if($(this).parent().parent().hasClass('hasSubmenu')){
                	e.preventDefault();            		
            	}
                var that = $(this);
                var depLink = that.parent().parent();
                var submenu = depLink.next();

                if (!submenu.hasClass('submenuOpen')) {
                    $('.submenu').removeClass('submenuOpen').stop(true,true).slideUp(300);
                    $('.menu-departamento .ico-expand').removeClass('active');
                    $('.menu-departamento h3').removeClass('active');
                    that.addClass('active');
                    depLink.addClass('active');
                    submenu.addClass('submenuOpen').stop(true,true).slideDown(300);
                } else {
                    that.removeClass('active');
                    depLink.removeClass('active');
                    submenu.removeClass('submenuOpen').stop(true,true).slideUp(300);
                }
            }
        })
    },
	
	toggleSearch: function () {
    	$('.toggleSearch').on('click', function(e) {
    		e.preventDefault();
    		$('.toggleSearch, .modalSearch').toggleClass('active');
    		$('body').toggleClass('hidden');
    		$('.modalSearch').stop(true,true).fadeToggle(400);
    	})
		$('.modalSearch .closeModal').on('click', function(e) {
			e.preventDefault();
			$('.toggleSearch, .modalSearch').removeClass('active');
			$('body').removeClass('hidden');
			$('.modalSearch').stop(true,true).fadeOut(400);			
		})
    },

    footerMenuToggle: function () {
    	$('footer .toggle h3').on('click', function (e) {
    		e.preventDefault();
    		var that = $(this);
    		var itemContent = that.parent().find('.itemContent');

			if ($(window).width() <= 720) {
	    		if (!itemContent.hasClass('active')) {
	    			$('footer .toggle h3').parent().find('.itemContent').stop(true,true).hide(300).removeClass('active');
	    			itemContent.addClass('active').stop(true,true).show(300);
	    			$('footer .toggle h3').removeClass('active');
	    			that.addClass('active');
				} else {
					that.removeClass('active');
					itemContent.stop(true,true).hide(300).removeClass('active');
				}
			}
    	})
    },

    autocompleteClone: function() {
        $('.ui-autocomplete').appendTo('.searchBox');
        //$('.ui-autocomplete').unbind();

        $('.ui-autocomplete li').each(function() {
            if($(this).find('img').length > 0) {

        		$(this).find('a').wrapInner('<span/>')
        		$(this).find('a').prepend($(this).find('img'));

                $(this).addClass('hasImage');
                var imgSrc = $(this).find('img').attr('src').replace('25-25','265-265');
                $(this).find('img').attr('src' , imgSrc).prop('width','265').prop('height','265');
            }
        });

        $('.ui-autocomplete').append('<button onclick="global.searchTerm()" class="searchTerm">Ver todos os resultados</button>')

        $('.hasImage').wrapAll('<ul class="product-found"></ul>')
    },

    searchTerm: function () {
        $('.ui-autocomplete').off();
        window.location = "/" + $('.fulltext-search-box').val();
        
    },

    flagDiscount: function() {
        $('.productList .flagDiscount').each(function() {
            var descpct = $(this).text().replace(',', '.');
            descpct = descpct.replace(' %', '');
            descpct = parseFloat(descpct);
            descpct = descpct.toFixed(0);
            if ((descpct == "0") || (descpct == 0)) {
                $(this).hide();
            } else {
                $(this).show().addClass("active");
                $(this).html("<span><strong>" + descpct + "% </strong>off</span>");
            }
        });
    },

    newsletterRegister: function () {
        // console.log("newsletterRegister()")
        const masterDataUrl = "/api/dataentities";
        const $newsModal = $("#news-modal");
        const $modalContent = $newsModal.find('.news-modal-content');
        
        const findUser = function(email){
            // console.log("findUser - email =" + email)
            return $.ajax({
                headers: {
                    "Accept": "application/vnd.vtex.ds.v10+json",
                    "Content-Type": "application/json",
                    "REST-Range": "resources=0-1"
                },
                type: 'GET',
                url: masterDataUrl + "/NR/search?_fields=id,email&_where=email=" + email
                
                
            })
        }
        
        const cadNews = function(data){
            // console.log("cadNews")
            // Requisição Ajax
            return $.ajax({
                url: '/api/dataentities/NR/documents/',
                dataType: 'json',
                type: 'PATCH',
                crossDomain: true,
                data: JSON.stringify(data),
                headers: {
                    'Accept': 'application/vnd.vtex.ds.v10+json',
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }
        
        const validateEmail = function(email) {
            var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            return re.test(email);
        };
        
        const centerModal = function(){
            // console.log("centerModal")
            const left = ($(window).width() / 2) - ($modalContent.outerWidth() / 2);
            const top = ($(window).height() / 2) - ($modalContent.outerHeight() / 2);
            $modalContent.css({'left':left, 'top':top})
        }
        
        if(!sessionStorage.getItem('showNews')){
            
            // console.log("sessionSotage showNews")
            $newsModal.show();
            centerModal()
            
            
            $newsModal.find('.news-modal-overlay,.news-modal-close,.btn-news-sucess').on('click',function(){
                $newsModal.hide();
                sessionStorage.setItem('showNews','true');
            })
            
            $newsModal.find(".send button").on('click',function(e){
                // console.log("click()")
                e.preventDefault();

                var _that = $(this);
                var parent = _that.parents('#form-modal-news');
                
                const name = $newsModal.find('[name="name"]').val();
                const email = $newsModal.find('[name="email"]').val();

                var jsonData = {};
           
                parent.find('input').each(function(){
                    var id;
                    var val;

                    if($(this).attr('type') == 'radio') {
                        if ($(this).is(':checked')) {
                            id = $(this).attr('name');
                            val = $(this).val();      		
                        }
                    } else {
                        id = $(this).attr('name');
                        val = $(this).val();      		
                    }

                    if(id != undefined){
                        jsonData[id] = val;
                    }
                });
                //  console.log("name:" + name.length + "gender:" + jsonData.gender)
                if (name.length > 0) {
                    // console.log("sending")
                    
                    if (validateEmail(email)) {
                        // console.log("email validado")
                        const reqFindUser = findUser(email);
                        reqFindUser.done(function(clientInfo){
                            
                            if (clientInfo.length == 0) { // Não existe email
                                // console.log("cliente nao existe")
                                const reqCad = cadNews(jsonData);
                                $newsModal.find('input').attr('readonly', 'true');
                                // console.log('reqCad',reqCad)
                                reqCad.done(function(email){
                                    $newsModal.find('input').val("").attr('readonly', false);
                                    sessionStorage.setItem('showNews','true')
                                    // alert("Pronto! Seu cadastro foi enviado! Agora é só esperar pelas ofertas, novidades e outros conteúdos exclusivos.");
                                    // $newsModal.hide();
                                    $newsModal.find('.form-modal-news').css('display','none');
                                    $newsModal.find('.news-modal-sucess').css('display','flex');
                                })
                            } else {
                                alert("Este e-mail já está cadastrado.");
                            }
                        })
                        
                    } else {
                        alert("E-mail inválido");
                    }
                } else {
                    alert("Digite um nome.");
                }
            })
            if(fns.verifyWidth()){
                var _originalSize = $(window).width() + $(window).height() 
                $(window).resize(function(){ 
                    if($(window).width() + $(window).height() != _originalSize){ 
                        $modalContent.css({'top':'initial', 'bottom':'10px'})
                    }
                    else{ 
                        setTimeout(function () { 
                            centerModal()
                         },300)
                        $modalContent.css({'bottom':'initial'})
                        $newsModal.removeClass('focus');
                        $newsModal.find('input').blur()
                    } 
                }); 
                $newsModal.find('input').on('focus',function(){
                    $newsModal.addClass('focus');
                    if (navigator.platform.toLowerCase() == "iphone") {
                        $modalContent.css({'top':'initial', 'bottom':'10px'})
                    }
                });
                $newsModal.find('input').on('blur',function(){
                    $newsModal.removeClass('focus');
                    if (navigator.platform.toLowerCase() == "iphone") {
                        setTimeout(function () { 
                            centerModal()
                         },300)
                        $modalContent.css({'bottom':'initial'})
                    }
                })
            }
            
        }

        $('.newsletter button').on('click', function(e) {//cadastro footer
            e.preventDefault();

            var _that = $(this);
            var parent = _that.parents('fieldset');

            var nameUser = parent.find('#ClientName').val();
            var emailUser = parent.find('#ClientEmail').val();
            var cupon;
            
            cupon = "<strong>Seu cadastro foi realizado com sucesso!</strong> Em breve você receberá o cupom de desconto em seu e-mail. Não esqueça de utilizá-lo na sua finalização de pedido.";
            
            var jsonData = {};
           
            parent.find('input').each(function(){
	            var id;
            	var val;

	            if($(this).attr('type') == 'radio') {
	            	if ($(this).is(':checked')) {
            			id = $(this).attr('name');
	            		val = $(this).val();      		
	            	}
	            } else {
	            	id = $(this).attr('name');
	            	val = $(this).val();      		
	            }

	            if(id != undefined){
	                jsonData[id] = val;
	            }
	        });

            function validateEmail(email) {
                var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                return re.test(email);
            };


            if (nameUser.length > 0 && jsonData.gender != undefined ) {

                if(validateEmail(emailUser)) {
                    
                    // console.log("before send forçado");
                    _that.text("Aguarde...");
                    parent.find('input').attr('readonly', true);

                    // Requisição Ajax
                    vtexjs.checkout.getOrderForm().then(function(orderForm) {
                       $.ajax({
                           headers: {
                               "Accept": "application/vnd.vtex.ds.v10+json",
                               "Content-Type": "application/json",
                               "REST-Range": "resources=0-1"
                           },
                           type: 'GET',
                           url: "/api/dataentities/NR/search?_fields=id,email&_where=email=" + emailUser

                       }).done(function(clientInfo) {
                            if(clientInfo.length == 0) { // Não existe email                               

                                $.ajax({
                                    url: '/api/dataentities/NR/documents/',
                                    dataType: 'json',
                                    type: 'PATCH',
                                    crossDomain: true,
                                    data: JSON.stringify(jsonData),
                                    headers: {
                                        'Accept': 'application/vnd.vtex.ds.v10+json',
                                        'Content-Type': 'application/json; charset=utf-8'
                                    },
                                    success:function(emailUser){
                                        $(parent).find('.campos').hide();
                                        $(parent).find('.success').html(cupon);
                                        $(parent).find('.success').show();

                                        _that.text("cadastrar");
						                parent.find('input').val("").attr('readonly', false);

						              //   setTimeout(function () {
						              //   	$(parent).find('.erro').hide();
            								// $(parent).find('.campos').show();
						              //       $(parent).find('.success').html();
						              //   },5000)
                                    }
                                });
                            } else {
                                $(parent).find('.duplicate').show();
                                $(parent).find('.campos').hide();
                            }
                       })
                    });
                } else {
                    $(parent).find('.server').show();
                    $(parent).find('.campos').hide();

                }
            } else {
                $(parent).find('.server').show();
                $(parent).find('.campos').hide();

            }
        });
        $('.tryAgain').on('click', function(e) {
            e.preventDefault();
            var parent = $(this).parents('fieldset');
            $(parent).find('.erro').hide();
            $(parent).find('.campos').show();
        });
        $('#news-modal button').on('click', function(){
            var textBox = $('#codigoPop')
            textBox.select();
            document.execCommand("copy");
            $('<div id="news-modal-copiado">Copiado</div>').insertAfter('#codigoPop')
            console.log('copiou')
        })
    },

    returnToTop: function () {
        var elem = $('body').find("#returnTop");
        
        var windowH = $(window).height();
        var documentH = $(document).height();
        var footerH = $('footer').height();
        if($('body').hasClass('notMobile')) {
            elem.remove();
        }else {
            $(window).bind("resize", function () {
                windowH = $(window).height();
            });
            $(window).bind("scroll", function () {
                if ($(window).scrollTop() > windowH)
                elem.show();
                else
                elem.hide();
                
                // if ($(window).scrollTop() > documentH - (windowH + footerH))
                //     elem.stop(true).fadeTo(300, 0, function() {
                //         elem.hide();
                //     });
                
            });
            elem.bind("click", function () {
                $('body, html').animate({
                    scrollTop: 0
                }, "slow");
                return false;
            });
        }
    },
}

var slider = {
	fullSlider: function (element, dots, arrows, backgroundImage) { // banner tv fullscreen		
		if (backgroundImage) {
			fns.imageFull(element.find('.box-banner'));
			element.addClass('bgImage');
        };

        element.slick({
            dots: dots,
            arrows: arrows,
            pauseOnHover: false,
			autoplay: true,
			fade: true,
            autoplaySpeed: 8000            
        });
	},
	
	bannerSlide: function(element, dots, arrows, slidesToShow, slidesToShowDesktop, slidesToShowTablet, slidesToShowMobile, centerMode) {
        element.slick({
            dots: dots,
            arrows: arrows,
            autoplay: false,
            pauseOnHover: false,
            autoplaySpeed: 4000,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToShow,
            dragable: true,
            centerMode: centerMode,
            responsive: [{
                    breakpoint: 1280,
                    settings: {
                        autoplay: true,
                        slidesToShow: slidesToShowDesktop,
                        slidesToScroll: slidesToShowDesktop,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        autoplay: true,
                        slidesToShow: slidesToShowTablet,
                        slidesToScroll: slidesToShowTablet,
                    }
                }, {
                    breakpoint: 720,
                    settings: {
                        autoplay: true,
                        slidesToShow: slidesToShowMobile,
                        slidesToScroll: slidesToShowMobile,
                        centerMode: false,                        
                    }
                }
            ]
        })
    },

    shelfSlider: function(element, dots, arrows, autoplay, slidesToShow, slidesToShowDesktop, slidesToShowTablet, slidesToShowMobile, centerMode) { // carrossel de produtos
        element.find('fieldset').remove();
        element.slick({
            dots: dots,
            arrows: arrows,
            autoplay: autoplay,
            pauseOnHover: false,
            autoplaySpeed: 4000,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToShow,
            dragable: true,
            centerMode: centerMode,
            responsive: [{
                    breakpoint: 1280,
                    settings: {
                        autoplay: true,
                        slidesToShow: slidesToShowDesktop,
                        slidesToScroll: slidesToShowDesktop,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        autoplay: true,
                        slidesToShow: slidesToShowTablet,
                        slidesToScroll: slidesToShowTablet,
                    }
                }, {
                    breakpoint: 720,
                    settings: {
                        autoplay: true,
                        slidesToShow: slidesToShowMobile,
                        slidesToScroll: slidesToShowMobile,
                        centerMode: false,                        
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        autoplay: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: false,                        
                    }
                }
            ]
        });
    },
}

var home = {
    init: function() {
        home.instafeed('optoculos');
    },

    instafeed: function(accountName) {
		// var	instagramClientId = '13de433f0ab74989add673ad1e92c596',
        // instagramDeveloperToken = '6732560389.13de433.409391735c054ffcaa8a7782830b1ad6';
        // $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + instagramDeveloperToken + '&callback=?', function(data) {
        //     for (i = 0; i < 5; i++) {
        //         var imageUrl = data.data[i].images.low_resolution.url;
        //         var item = '<div class="instaItem" style="background-image: url('+imageUrl+')"><a href="' + data.data[i].link + '" target="_blank"></a></div>';
        //         $('#instagram').append(item);
        //     }
        // }).done(function(){
        //     $('#instagram').show();
        // });



        new InstagramFeed({
            'username': accountName,
            'get_data': true,
            'callback': function(data){
                console.log(data)
                for (i = 0; i < 5; i++) {
                    var imageData = data.edge_owner_to_timeline_media.edges[i].node
                    var imageUrl = imageData.thumbnail_resources[3].src;
                    var linkImg = 'https://www.instagram.com/p/' + imageData.shortcode;
                    var titleImg = imageData.edge_media_to_caption.edges[0].node.text
                    var item = '<div class="instaItem" style="background-image: url(' + imageUrl + ')"><a href="' + linkImg + '" target="_blank" title="'+titleImg+'"></a></div>';
                    $('#instagram').append(item);
                }

                $('.instaFeed').show();
            }
        });
    },
}

var catalog = {
	
        // $(".navSidebar input[type='checkbox']").vtexSmartResearch();
        
        init: function () {
            catalog.smartResearch();
            
            if (!$('body').hasClass("searchResult")) {
                catalog.groupFilters();
                catalog.filterChoosed();
            } else {
                catalog.groupFiltersCategories(); 
                catalog.identifySearchPage();
            }
            
            // if ($('body').hasClass("colection")) {
            //     catalog.groupFiltersCategories();
            // }
            
            catalog.orderBy();
            catalog.groupFiltersToggle();
            catalog.menuFilterToggle();
            catalog.switchView();
            
            $('.navBar').css('display', 'flex');	

            $('.isMobile .navTopbar .filterOptions').prepend($('.catalog-options')); //add ordernar por no filtros de mobile.
            $('.isMobile .navTopbar .catalog-options').css('display', 'block');

            $('#mainContent').prepend($('#pageContent_title')); // title em departamento
            $('#pageContent_title').css('display', 'none'); 
            $('body.department.isMobile #pageContent_title').css('display', 'block'); 

        },

        smartResearch: function () {
            var resultItemsWrapperOffset = $('.vitrine.resultItemsWrapper').offset();
            $(".navTopbar .filterOptions input[type='checkbox']").vtexSmartResearch({
                ajaxCallback: function () {
                    $("li.helperComplement").remove();
                    global.flagDiscount();
                    global.fixShelfHover();
                    // verificaLogadoQualquerPag()
                },
                shelfCallback: function () {
                    $("li.helperComplement").remove();
                    global.flagDiscount();
                    global.fixShelfHover();
                    // verificaLogadoQualquerPag()
                },
                filterScrollTop: function (resultItemsWrapperOffset) {
                }
            });
        },

        filterChoosed: function () {
            $('<div class="filterChoosed"><span class="btnClean">Limpar todos os Filtros</span></div>').insertBefore('.main');
            $('<div class="filterChoosed"><a class="filter-close" >Aplicar <i class="ico-check"></i></a><a class="btnClean">Limpar <i class="ico-trash"></i></a></div>').insertAfter($('.filterOptions'));
            
            $('.refino label').unbind('click');
            
            
            $('.refino input:checkbox').change(function () {
                var text = $(this).parent('label').text();
                var className = $(this).parent('label').attr('class');
                className = className.replace(" sr_selected", "");
                
                
                if ($(this).is(':checked')) {
                    var template = '<div class="filter ' + className + '" data-class="' + className + '"> ' + text + '<i class="ico-close"></i></div>';
                    $(template).insertBefore('.filterChoosed .filter-close');
                    
                    click(className);
                    
                } else {
                    
                    $('.filterChoosed .filter[data-class="' + className + '"]').remove();
                }
            });
            
            function click(classElement) {
                $(".filter").on('click', function () {
                    var classFilter = $(this).attr('class');
                    classFilter = classFilter.replace("filter ", "");
                    
                    $('.refino label.sr_selected').each(function () {
                        if ($(this).hasClass(classFilter)) {
                            //$('.filterChoosed .'+classElement).remove();
                            $(this).trigger('click');
                        }
                    });
                });
            }
            
            $(".btnClean").on('click', function () {
                $('.refino label.sr_selected').each(function () {
                    $(this).trigger('click');
                    $('.filter').remove();
                });
            });
        },
        
        textItemDepartament: function (element) {
            var regexpItens = /\({1}([0-9])*?\){1}/g;
            for (var i = 0; i < element.length; i++) {
                var newText = $(element[i]).text().replace(regexpItens, "");
                $(element[i]).text(newText);
            };
        },
        
        groupFilters: function () {
            catalog.textItemDepartament($('.navTopbar .filterOptions h4 a'));
            
            // //Agrupar filtros de categoria
            $(".navTopbar .search-single-navigator h4").next("ul").remove();
            $(".navTopbar .search-single-navigator h4").wrapAll("<fieldset class='filterCategory'></fieldset>");
            $(".filterCategory").prepend("<h5>" + $('.search-single-navigator').find('h3 a').text() + "</h5>");
            $(".filterCategory h4").wrapAll("<div></div>");
            $(".filterCategory").prependTo(".search-multiple-navigator");
        },
        
        groupFiltersCategories: function () {
            catalog.textItemDepartament($('.navTopbar .filterOptions h3 a'));

            // console.log('groupFiltersCategories');
            
            //Agrupar filtros de categoria
            $(".navTopbar .filterOptions .search-single-navigator h3").next("ul").remove();
            $(".navTopbar .filterOptions .search-single-navigator h3").wrapAll("<fieldset class='filterCategory'></fieldset>");
            $(".filterCategory").prepend("<h5>Categorias</h5>");
            $(".filterCategory h3").wrapAll("<div></div>");
            $(".filterCategory").prependTo(".search-multiple-navigator");
        },
        
        groupFiltersToggle: function () {
            $('fieldset > h5').on('click', function (e) {
                e.preventDefault();
                if ($(this).parent().hasClass("active")) {
                    if (fns.verifyWidth()) {
                        $(this).parent().removeClass("active");
                        $(this).parent().find('div').hide(300);
                    } else {
                        $(this).parent().removeClass("active");
                        $(this).parent().find('div').fadeOut(300);
                    }
                } else {
                    if (fns.verifyWidth()) {
                        $(this).parent().addClass("active");
                        $(this).parent().find('div').show(300);
                    } else {
                        $(this).parent().addClass("active");
                        $(this).parent().find('div').fadeIn(300);
                    }
                }
            })
        },
        
        menuFilterToggle: function () {
            // Open Menu
            $('.filterMobileToggle').on('click', function (e) {
                if (fns.verifyWidth()) {
                    e.preventDefault();
                    $('.navTopbar').addClass('open');
                    $('body').addClass('menuOpen');
                    $('.navOverlay').fadeIn(300);
                }
            })
            
            //Close Menu
            $('.navTopbarHead .ico-close, .navOverlay, .filter-close').on('click', function (e) {
                if (fns.verifyWidth()) {
                    e.preventDefault();
                    $('.navTopbar').removeClass('open');
                    $('body').removeClass('menuOpen');
                    $('.navOverlay').fadeOut(300);
                }
            })
        },
        
        orderBy: function () {
            var $orderBy = $('.orderby-lightbox-content-body')
            var linkFiltro = $orderBy.find("a");
            linkFiltro.bind("click touchable", function (event) {
                event.preventDefault();
                var dataOrder = $(this).attr("data-order");
                var newUrl ;
                
                if (window.location.href.indexOf('O=') > 0) {
                    var _thisOrder = window.location.search.split('O=')[1];
                    _thisOrder = _thisOrder.indexOf('&') ? _thisOrder.split('&')[0] : _thisOrder ;
                    newUrl = window.location.href.replace( _thisOrder , dataOrder );
                }else {
                    if (window.location.href.indexOf('?') > 0) {
                        newUrl = window.location.href + '&O=' + dataOrder;                    
                    } else {
                        newUrl = window.location.href + '?O=' + dataOrder;
                    }
                }
                
                window.location.href = newUrl;
                
                //$(".orderBy select option[value='" + dataOrder + "'").eq(0).prop('selected', true).trigger('change').trigger('onchange');
            });
            
            // Lightbox ordenar por
            $('.orderby-toggle .toggle.order').on('click', function () {
                $('.orderby-toggle').stop(true, true).toggleClass('active');
                $('body').stop(true, true).toggleClass('lightbox-open');
            })
            
            // Adicionar a cor nas tags "a" de acordo com a página
            var urlFiltro = window.location.href;
            var menorPreco = /(PriceASC)/g;
            var maiorPreco = /(PriceDESC)/g;
            var maisVendidos = /(TopSale)/g;
            var melhorAvaliado = /(RateDESC)/g;
            var deAZ = /(NameASC)/g;
            var deZA = /(NameDESC)/g;
            var ordemLancamento = /(Release)/g;
            var melhorDesconto = /(BestDiscountDESC)/g;
            if (menorPreco.test(urlFiltro)) {
                $orderBy.find('.menor-preco').toggleClass("active");
                $('.orderby-toggle a span').html('<em>Ordenar por</em> Menor preço');
            } else if (maiorPreco.test(urlFiltro)) {
                $orderBy.find('.maior-preco').toggleClass("active");
                $('.orderby-toggle a span').html('<em>Ordenar por</em> Maior preço');
            } else if (maisVendidos.test(urlFiltro)) {
                $orderBy.find('.mais-vendidos').toggleClass("active");
                $('.orderby-toggle a span').html('<em>Ordenar por</em> Mais vendidos');
            } else if (melhorAvaliado.test(urlFiltro)) {
                $orderBy.find('.melhor-avaliado').toggleClass("active");
                $('.orderby-toggle a span').html('<em>Ordenar por</em> Melhores avaliações');
            } else if (deAZ.test(urlFiltro)) {
                $orderBy.find('.de-az').toggleClass("active");
                $('.orderby-toggle a span').html('<em>Ordenar por</em> A - Z');
            } else if (deZA.test(urlFiltro)) {
                $orderBy.find('.de-za').toggleClass("active");
                $('.orderby-toggle a span').html('<em>Ordenar por</em> Z - A');
            } else if (ordemLancamento.test(urlFiltro)) {
                $orderBy.find('.ordem-lancamento').toggleClass("active");
                $('.orderby-toggle a span').html('<em>Ordenar por</em> Data de lançamento');
            } else if (melhorDesconto.test(urlFiltro)) {
                $orderBy.find('.melhor-desconto').toggleClass("active");
                $('.orderby-toggle a span').html('<em>Ordenar por</em> Melhor desconto');
            } else {
                $('.orderby-toggle a span').html('Ordenar por');
            };
            
            if ($orderBy.find('.orderByLink .active').length) {
                //$orderBy.find('.orderByLink h5').text($(filtro).find('.orderByLink .active').text());
            }
        },
        
        switchView: function () {
            // console.log("switchview")
            var $_shelf = $('[id^=ResultItems_]');
            if (fns.verifyWidth()) {
                $_shelf.attr('view-grid', 'large');
            } else {
                $_shelf.attr('view-grid', 'small');
            }
            
            
            $('.selectView .device span').on('click', function () {
                var _this = $(this)
                var layout = _this.attr('data-layout');
                if ($_shelf.attr('view-grid') != layout) {
                    $_shelf.attr('view-grid', layout);
                    
                    $('.selectViewAction').each(function () {
                        $(this).removeClass('active')
                        if ($(this).attr('data-layout') == layout) {
                            $(this).addClass('active')
                        }
                    })
                }
            })
        },
        
        identifySearchPage: function () {
            var url = window.location.pathname.split('/');
            catalog.searchResult();
            
            if (url.length == 2) {
                $("body").addClass('firstLevel');
                catalog.searchBradCrumb();
            }
        },
        
        searchResult: function () {
            var searchString = $('.searchResultsTime .resultado-busca-termo .value').eq(0).text();
            var numberResult = $('.searchResultsTime .resultado-busca-numero .value').eq(0).text();
            if (numberResult == "1") {
                $('.searchDisplay').append('<p class="search-string">Você buscou por: <span>"' + searchString + '"</span></p><p class="number-result"> Encontramos <span>"' + numberResult + '"</span> resultado</p>');
            } else {
                $('.searchDisplay').append('<p class="search-string">Você buscou por: <span>"' + searchString + '"</span></p><p class="number-result"> Encontramos <span>"' + numberResult + '"</span> resultados</p>');
            }
        },
        
        searchBradCrumb: function () {
            var searchString = $('.searchResultsTime .resultado-busca-termo .value').eq(0).text();
            var templateLink = $('<li class="last"><a href="/">' + searchString + '</a></li>');
            
            $('.bread-crumb ul').append(templateLink);
        },
        
        emptySearch: function () {
            var word = $('meta[name="Abstract"]').attr('content');
            $(".box-emptySearch p em").text(word);
            // var templateLink = $('<li class="last"><a href="/">' + word + '</a></li>');
            
            // $('.bread-crumb ul').append(templateLink);
        },
        
        // searchInEmptySearch: function () {
        //     $('#btnBuscar').off().on('click', function (e) {
        //         e.preventDefault();
        //         var searchTerm = $('#text-search').val();
        //         if (searchTerm.length) {
        //             window.location = window.location.origin + "/" + searchTerm;
        //         } else {
        //             alert("Digite o que você está procurando!");
        //         }
        //     })
        // },

        ////////////////////////// add ateh aqui
	

	buscaVazia: function () {
		var pagina_busca = $('.search-result'),
	        busca_vazia = $('.busca-vazio');

		if (pagina_busca[0]) {
	        var url = window.location.toString().split('/'),
	            split_ft = url[3].split('?'),
	            termo = split_ft[0];
	        
	        if (busca_vazia[0]) {
	            pagina_busca.addClass('no-result');
	            $(".busca-vazio").append("<ul><li>Tente palavras menos específicas.</li><li>Digite pelo menos quatro caracteres no campo de busca.</li><li>Use os menus do site para navegar pelos departamentos de produtos</ul>");
				$(".navSidebar").remove();
	        } else {
	            var valorResult = $('.resultado-busca-termo:eq(0)').find('.value').text();
	            pagina_busca.addClass('resultado-encontrado');
	        };
	    }; 
	},

	searchWord: function () {
		var word = $(".resultado-busca-termo:eq(0)").find("strong").text();
		$(".navTopbar .titulo-sessao").html('<em>Você buscou por:</em>"' + word + '"');
	},

	// init: function  () {
	// }
}

var product = {
	init: function(){
        var imageWidth = $('#include').width();
        var imageHeight = $('#include').height();

        product.superZoom(imageWidth,imageHeight);
        product.installmentToggle();
        product.shippingBlock();
        product.buyTogetherMobile();
        product.productUnavailable();
        product.comprarComLente();
    },

    productUnavailable: function() {
        $('#notifymeButtonOK').attr('value','AVISE-ME');

        if(!skuJson.available) {
            $('body').addClass('unavailable');
        }
    },

    buyTogetherMobile: function() {
            if($(window).width() <= 720) {
                $('.productBuyTogether table').append('<tr class="line-2"></tr>');
                $('.productBuyTogether table').append('<tr class="line-3"></tr>');
                $('.productBuyTogether table tr.line-2').append($('.productBuyTogether table td.equal'));
                $('.productBuyTogether table tr.line-3').append($('.productBuyTogether table td.buy'));
                $('.productBuyTogether table td.equal').attr('colspan','3');
                $('.productBuyTogether table td.buy').attr('colspan','3');
            }
        
    },
    
    superZoom: function (width, height) {
		window.LoadZoom = function (pi) {
			if($(".image-zoom").length<=0) return false;			
			var optionsZoom = {
				zoomWidth: width,
				zoomHeight: height,
				preloadText: ''
			};			
	    	$(".image-zoom").jqzoom(optionsZoom);
		}
	    LoadZoom(0);
    },

    thumbSlider: function() {
        var imageFormat = "-460-460";        

        //troca formato da imagem
        $('ul.thumbs li img').each(function () {
            var src = $(this).attr('src');
            src = src.replace("-55-55", imageFormat);
            $(this).attr('src',src);
        })

        $('ul.thumbs').slick({
            infinite: false,
            autoplay: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            speed: 500,
            dots: false,
            arrows: true,
            draggable: false,
            vertical: true,
            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },{
                breakpoint: 720,
                settings: {
                draggable: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    vertical: false,
                }
            }]
        });
        
        $('ul.thumbs').slick('slickPrev');
    },

    installmentToggle: function () {

        $('.productPrice .skuBestInstallmentNumber').prepend('em até ');

        if ($('.other-payment-method-ul li').length > 1) {
            $('.other-payment-method-ul').prepend('<h6>Cartão de crédito</h6>').prepend('<a href="#" class="close"><i class="ico-close"></i></a>')
            $('.other-payment-method').prepend('<div class="installmentToggle"><span>Ver parcelas <i class="ico-expand"></i></span></div>');
            // $('.other-payment-method-intereset-no').prependTo('.other-payment-method-American strong'); 
            $('.other-payment-method-ul li.Express-à').html(function () {
                return $(this).html().replace(/à vista(?=[^>]*<)/ig, "<span class='a-vista'>$&</span>");
            });

            $('.other-payment-method-American').each(function(){
                $(this).find('span').html(function(){
                    return $(this).html().replace('de', '&nbsp;');
                })
            })
            $('.other-payment-method-American').each(function(){
                $(this).find('strong').appendTo(this).find('.other-payment-method-intereset-no');
            })
            $('.installmentToggle span').on('click', function (e) {
                e.preventDefault();
                $(this).toggleClass('active');
                $(this).find('i').toggleClass('active');
                $('.other-payment-method-ul').stop(true, true).slideToggle();
            })
            $('.other-payment-method-ul .close').on('click', function (e) {
                e.preventDefault();
                $('.other-payment-method-ul').siblings('div.installmentToggle').find('span').toggleClass('active');
                $('.other-payment-method-ul').siblings('div.installmentToggle').find('span i').toggleClass('active');
                $('.other-payment-method-ul').stop(true, true).slideToggle();
            })
        } 
    },

    shippingBlock: function () {
        ShippingValue();
        setTimeout(function () {
            $('.freight-btn').on('click', function() {
                $(document).ajaxStop(function() {
                    $('.close-shipping').remove();
                    $('.freight-values').prepend('<a href="#" class="close-shipping"><i class="ico-close"></i></a>');

                    $('.close-shipping').on('click', function(e){
                        e.preventDefault();
                        $('.freight-values').hide();
                    })
                })
            })

            $('#calculoFrete h2').html('Calcule o frete');
            $('#calculoFrete .freight-btn').val('Calcular');
            $('#calculoFrete .freight-zip-box').attr('placeholder', 'Digite seu CEP');
        }, 1000);        
    },
  
    comprarComLente: function () {
	    if(vtxctx.categoryId === '2'){
	      $('.mainProductInfo .buyProduct').addClass('comprar-com-lente');
        $('.buy-button').before($('<a>',{'class':'buy-button comprar-com-lente','href':location.pathname + '?lid=1b20dad8-0f46-424d-b72f-ab72d0827e06','text':'Comprar com grau'}))
      }
    }
}

var account = {
	buildModal: function () {
		// $('#edit-profile').append($("#editar-perfil").html());
		// $('#include-address').append($("#address-edit").html());
        // $('#exclude-address').append($("#address-remove").html());
        
        $('.edit-profile-link').insertAfter($('.profile-detail-display-info'))
        $('.edit-address-link').each(function(){
			$(this).insertAfter($(this).next('.address-display-unit-info'));
		})

		$("#editar-perfil").css("display","none");
		$("#address-edit").css("display","none");
		$("#address-remove").css("display","none");


		$("#edit-data-link").attr({rel: "modal:open"});
		$(".address-update").attr({rel: "modal:open"});
		$('#address-update').each(function () {
			$(this).attr({rel: "modal:open"})
		});
		$(".delete").each(function () {
			$(this).attr({rel: "modal:open"})
		});
		$('.modal-footer').each(function () {
			$(this).append('<a href="#close-modal" rel="modal:close" class="btn-link">Cancelar</a>');
        })
        
        // Validating and requiring Birth date
		if($("input#birthDate").val() == "") {
			$("#profile-submit").addClass('not-active');
		}
		$("input#birthDate").change(function(){
			if (validateDate($("input#birthDate").val()) == false) {
				$("label#error").html("*Formato inválido (Data de nascimento)");
				$("label#error").show().css('visibility','visible');
				$("input#birthDate").focus().addClass('error');
				$("#profile-submit").addClass('not-active');
			} else {
				$("input#birthDate").removeClass('error');
				$("label#error").hide().css('visibility','hidden');;
				$("#profile-submit").removeClass('not-active');
			}
		})
		
		function validateDate(value) {

			if (value.length != 10) return false;
	
			var data = value;
			var dia = data.substr(0, 2);
			var barra1 = data.substr(2, 1);
			var mes = data.substr(3, 2);
			var barra2 = data.substr(5, 1);
			var ano = data.substr(6, 4);
			if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return false;
			if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return false;
			if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return false;
			if (ano < 1900) return false;
			return true;
		}
	},

	init: function () {
		account.buildModal();
	}
}

var form_validate = {
    init : function(){
        this.mask();
        this.validate();
    },    
    send: function(enitdade){
        // cria o json
        // os ID's dos campos precisam ser iguais da entidade de dados
        var jsonData = {};
        $('.pageContent form input, .pageContent form select, .pageContent form textarea').each(function(){
            var id = $(this).attr('name');
            var val = $(this).val();
            if(id != undefined){
                jsonData[id] = val;
            }
        });

        $.ajax({
            url: '/api/dataentities/'+enitdade+'/documents/',
            dataType: 'json',
            type: 'PATCH',
            crossDomain: true,
            data: JSON.stringify(jsonData),
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            beforeSend: function () {
                $('button#submit').text("Aguarde");
                $('.pageContent form input, .pageContent form select, .pageContent form textarea').attr('readonly', true);
            },
            success:function(data){
                alert('Enviado com sucesso!');
                $('button#submit').text("Enviar");
                $('.pageContent form input, .pageContent form select, .pageContent form textarea').val("").attr('readonly', false);
                $('.pageContent form').addClass('hide').parent().append('<p class="success"><strong>Obrigado!</strong> Formulário enviado com sucesso!<br/> Em breve entraremos em contato!<p>');
                setTimeout(function () {
                    $('.pageContent form').removeClass('hide').parent().find('.success').remove();
                },5000)
            },
            error: function (xhr, ajaxOptions, thrownError) {
                erro = JSON.parse(xhr.responseText);
                alert(erro.Message);                
            }
        });
    },
    validate: function(){
        $('button#submit').click(function(e){
            e.preventDefault();
            var enitdade = $(this).attr('data-entity');            
            var testEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            $('.pageContent form input, .pageContent form select, .pageContent form textarea').each(function(){
                if($(this).attr('required')){ 
                    if($(this).val() == ''){
                        $(this).addClass('error');
                    } else{
                        $(this).removeClass('error');
                    }
                }
                if($(this).attr('type') == 'checkbox'){
                    if ($(this).is(':checked')) {
                        $(this).attr('value', 'true');
                    } else {
                        $(this).attr('value', 'false');
                    }
                }
            });

            //validar email
            var email = $('#email').val();
            if(!testEmail.test(email)){
                $('#email').addClass('error');                
                alert('Email Inválido!');
            }

            if(!$('.error').length){
                form_validate.send(enitdade);
            }else{
                alert('Preencha todos os campos.');
            }
        });
    },
    mask:function(){
        var maskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        options = {onKeyPress: function(val, e, field, options) {
            field.mask(maskBehavior.apply({}, arguments), options);}
        };        

        // $('.cep').mask('00000-000');
        $('#data_de_nascimento').mask('00/00/0000');
        $('#rendimento_mensal').mask('R$ ###.##0,00');
        $('#telefone, #celular').mask(maskBehavior, options);
    },
}

var stores = {
    init: function () {
        stores.mapModal();
    },
    
    mapModal: function () {
        $('.linkMap').on('click', function (e) {
            if (!fns.isMobile()) {
                e.preventDefault();
                var mapUrl = $(this).attr('data-modal');
                var modalUrl = $('#modalLojas .mapa iframe').attr('src');
                if (mapUrl != modalUrl) {
                    $('#modalLojas .mapa iframe').attr('src', mapUrl);
                }
                $('#modalLojas').show();
                $('#modalLojas .overlay').fadeIn();
                setTimeout(function () {
                    $('#modalLojas .mapa').fadeIn();
                }, 250)
            }
        });

        $('#modalLojas .closeModal, #modalLojas .overlay').live('click', function() {
            stores.closeModal();
        });
    },

    closeModal: function () {
        $('#modalLojas').fadeOut();
        $('#modalLojas .overlay').fadeOut();
        $('#modalLojas .mapa').fadeOut();
    },
}

var institutional = {
    init: function() {
        institutional.linkSidebar();
        institutional.toggleMenu();
        
        if ($('body').hasClass('form')) {
            form_validate.init();
    	}
        if ($('body').hasClass('nossas-lojas')) {
            stores.init();
        }
    },

    linkSidebar: function (){
        $(".institutionalLinks li a").each(function(){
        	var page = $(this).text();
            var link = $(this).attr('href');
            var url = window.location.pathname;
            if(link == url){
            	$('h3.selected span').text(page);
                $(this).addClass("current");
            }
        });
    },

    toggleMenu: function () {
    	$('.institutionalLinks').addClass('active');
		$('h3.selected').on('click', function () {
            $(this).toggleClass('active');
			$('.institutionalLinks').stop(true,true).toggleClass('active');
		})
    },    
}

$(document).ready(function () {
	/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
    (function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
	typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
	
	$(".helperComplement").remove();
	
	global.init();

	if ($('body').hasClass("home")) {
        home.init();
		$(window).load(function () {
            slider.fullSlider($('#tvDesktop'), true, false, true);
            slider.fullSlider($('#tvMobile'), true, false, false);
            slider.shelfSlider($('.shelfCarousel ul'), false, true, false, 4, 4, 3, 2, false);
        });   
	}
    
	if ($('body').hasClass("product")) {
        product.init();
        setTimeout(function() {
            product.thumbSlider();
        }, 100);
        $(window).load(function () {
            slider.shelfSlider($('.shelfCarousel ul'), false, true, false, 4, 4, 3, 2, false);
        })
	};

	if ( $('body').hasClass("catalog")) {
		catalog.init();
    };
    
    if ($('body').hasClass("emptySearch")) {
        catalog.emptySearch();
        // catalog.searchInEmptySearch();
        $(window).load(function () {
            slider.shelfSlider($('.shelfCarousel ul'), false, true, false, 4, 4, 3, 2, false);
        });
    };

	if ($('body').hasClass("institutional")) {
		institutional.init();
    };
    
    if ($('body').hasClass("account")) {
		account.init();
	};
});

$(window).load(function() {
    global.userLogged();
    $(window).resize(function() {
       fns.verifyWidth();
    })
});
$(document).ajaxStop(function() {
    $(".helperComplement").remove();
})

$('#news-modal button').on('click', function(){
    var textBox = $('#codigoPop')
    textBox.select();
    document.execCommand("copy");
    $('<div id="news-modal-copiado">Copiado</div>').insertAfter('#codigoPop')
    console.log('copiou')
})