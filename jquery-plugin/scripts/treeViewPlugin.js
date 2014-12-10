(function ($) {

    // includes css file
    $('head')
        .append('<link rel="stylesheet" href="css/_01_TreeViewStyle.css" type="text/css" />');
    
    // adds a buttons in front of list items
    $(function () {
        var $button = $('<button>').addClass('hideItem-button');
        $('li').prepend($button);
    });

    $.fn.treeView = function () {
        $(document).on('click', '.hideItem-button', function () {
            var $this = $(this);
            
            var $grandFater = $this.parent().parent();
            var parentIndex = $this.parent().index() + 1;
            var $forHide = $grandFater.children().eq(parentIndex);
            if ($forHide.is('ul')) {
                $forHide.hide(1000);
                $this.attr('class', 'showItem-button');
            }
        });

        $(document).on('click', '.showItem-button', function () {
            var $this = $(this);
            var $grandFater = $this.parent().parent();
            var parentIndex = $this.parent().index() + 1;
            var $forShow = $grandFater.children().eq(parentIndex);
            if ($forShow) {
                $forShow.show(1000);
                $this.attr('class', 'hideItem-button');
            }
        });
    }
})(jQuery);

$('.hideItem-button').treeView();