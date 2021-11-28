import $ from 'jquery'
$(function(event){
    var pagesContainer = $('.page-container'),
        navigation = $('.primary-nav'),
        triggerNav = $('.nav-trigger'),
        logo = $('.logo');
    
    triggerNav.on('click', () => {
        //close Page
        if (triggerNav.hasClass('page-open')) {
            pagesContainer.removeClass('page-open').find('.selected').removeClass('selected').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
                $(this).children('.page-info').scrollTop(0).removeClass('has-boxshadow');
            });
            //trigger navigation visibility
            triggerNav.add(logo).removeClass('page-open');
        } else
            //trigger navigation visibility
            triggerNav.add(pagesContainer).add(navigation).toggleClass('nav-open'); 
    });
    pagesContainer.on('click', '.single-page', function () { //Open Page
        var selectedpage = $(this);
        console.log(this);
        if (pagesContainer.hasClass('nav-open')) {
            //close navigation
            triggerNav.add(pagesContainer).add(navigation).removeClass('nav-open');
        } else {
            //open Page
            selectedpage.addClass('selected');
            pagesContainer.add(triggerNav).add(logo).addClass('page-open');
        }});

    pagesContainer.on('click', '.scroll-down', () => {
            var pageContent = pagesContainer.find('.selected').children('.page-info'),
                windowsHeight = $(window).height();

            pageContent.animate({
                'scrollTop': windowsHeight
            }, 1000);
        });
	//add/remove the .has-boxshadow to the Page content while scrolling
    var scrolling = false;
    pagesContainer.find('page-info').on('scroll', () => {
        if (!scrolling) {
            (!window.requestAnimationFrame) ? setTimeout(updatePageContent, 300) : window.requestAnimationFrame(updatePageContent);
            scrolling = true;
        }
    });

function updatePageContent() {
    var visiblePage = pagesContainer.find('.selected').children('.page-info'),
    scrollTop =visiblePage.scrollTop();
    (scrollTop > 0) ? visiblePage.addClass('has-boxshadow') : visiblePage.removeClass('has-boxshadow');
    scrolling = false;
}
});
