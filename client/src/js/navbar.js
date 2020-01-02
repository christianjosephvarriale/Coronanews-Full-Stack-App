import $ from 'jquery';

var clSearch = function() {
        
    var searchWrap = $('.header__search'),
        searchField = searchWrap.find('.search-field'),
        closeSearch = searchWrap.find('.header__overlay-close'),
        searchTrigger = $('.header__search-trigger'),
        siteBody = $('body');


    searchTrigger.on('click', function(e) {
        
        e.preventDefault();
        e.stopPropagation();
    
        var $this = $(this);
    
        siteBody.addClass('search-is-visible');
        setTimeout(function(){
            searchWrap.find('.search-field').focus();
        }, 100);
    
    });

    closeSearch.on('click', function(e) {

        var $this = $(this);
    
        e.stopPropagation(); 
    
        if(siteBody.hasClass('search-is-visible')){
            siteBody.removeClass('search-is-visible');
            setTimeout(function(){
                searchWrap.find('.search-field').blur();
            }, 100);
        }
    });

    searchWrap.on('click',  function(e) {
        if( !$(e.target).is('.search-field') ) {
            closeSearch.trigger('click');
        }
    });
        
    searchField.on('click', function(e){
        e.stopPropagation();
    });
        
    searchField.attr({placeholder: 'Type Keywords', autocomplete: 'off'});

};


/* Mobile Menu
* ---------------------------------------------------- */ 
var clMobileMenu = function() {

    var navWrap = $('.header__nav-wrap'),
        closeNavWrap = navWrap.find('.header__overlay-close'),
        menuToggle = $('.header__toggle-menu'),
        siteBody = $('body');
    
    menuToggle.on('click', function(e) {
        var $this = $(this);

        e.preventDefault();
        e.stopPropagation();
        siteBody.addClass('nav-wrap-is-visible');
    });

    closeNavWrap.on('click', function(e) {
        
        var $this = $(this);
        
        e.preventDefault();
        e.stopPropagation();
    
        if(siteBody.hasClass('nav-wrap-is-visible')) {
            siteBody.removeClass('nav-wrap-is-visible');
        }
    });

    // open (or close) submenu items in mobile view menu. 
    // close all the other open submenu items.
    $('.header__nav .has-children').children('a').on('click', function (e) {
        e.preventDefault();

        if ($(".close-mobile-menu").is(":visible") == true) {

            $(this).toggleClass('sub-menu-is-open')
                .next('ul')
                .slideToggle(200)
                .end()
                .parent('.has-children')
                .siblings('.has-children')
                .children('a')
                .removeClass('sub-menu-is-open')
                .next('ul')
                .slideUp(200);

        }
    });
};

(function clInit() {

    clSearch();
    clMobileMenu();
  }) ();