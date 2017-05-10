FastClick.attach(document.body);

var $window = $(window);

(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100* (clientWidth / 375)+ 'px';
    };

  // Abort if browser does not support addEventListener
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// 导航栏固定到顶端
function fixedTop() {
    var JNode = $('.topbar'),
        SNode = $('.section');
      if(SNode.length){
        var navwidthTemp = JNode.width(),
            JNodeHeight = JNode.height();
        // 固定导航栏
        $(".content").on('scroll',function(){
          var SNodetop = SNode.offset().top;
          if(SNodetop <= JNodeHeight)
          {
              JNode.addClass("fixed");
          }
          else{
              JNode.removeClass("fixed");
          }

          SNode.each(function(){
              var  SNodeTop = $(this).offset().top;
              if(SNodeTop <= JNodeHeight+6){
                  var SNodeHref = $(this).attr('id');
                      $('a[name="'+SNodeHref+'"]').parent().addClass('active').siblings().removeClass('active');
              }
        });
    })

      anchorClick();
  }

  }


// 导航栏点击事件
function anchorClick() {
    var links = $('.topbar li a'),
        JNode = $('.topbar'),
        SNode = $('.section'),
        JNodeHeight = JNode.height();
        links.on('click',function(){
            $that = $(this);
            var sUserAgent = navigator.userAgent.toLowerCase();
            var isAndroid = sUserAgent.match(/android/i) == "android";
            if(isAndroid){
                JNode.addClass("fixed");
            }
            var scrollTopValue = $('#'+$that.attr("name")).offset().top,
            nowScroll = $('.ptable').offset().top;
            nowScroll = scrollTopValue - nowScroll - JNodeHeight + 6;
            $(".content").animate({
              scrollTop: nowScroll + "px"
            }, {
              duration: 200,
              easing: "swing"
            });
            return false;
        })
}

//  当滑动到相应的section位置时导航栏对应相应的链接标签
function linksActive() {
    var JNode = $('.topbar'),
        SNode = $('.section'),
        JNodeHeight = JNode.height();
        // 固定导航栏
        $(".content").on('scroll',function(){
          SNode.each(function(){
              var  SNodeTop = $(this).offset().top;
              if(SNodeTop <= JNodeHeight+6){
                  var SNodeHref = $(this).attr('id');
                      $('a[name="'+SNodeHref+'"]').parent().addClass('active').siblings().removeClass('active');
              }
          })
    });
}
