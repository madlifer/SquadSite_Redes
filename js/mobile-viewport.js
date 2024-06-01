//mobile viewport hack
(function () {
    function apply_viewport() {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
                navigator.userAgent
            )
        ) {
            var ww = window.screen.width;
            var mw = 800; // min width of site
            var ratio = ww / mw; //calculate ratio
            var viewport_meta_tag = document.getElementById('viewport');
            if (ww < mw) {
                //smaller than minimum size
                viewport_meta_tag.setAttribute(
                    'content',
                    'initial-scale=' +
                        ratio +
                        ', maximum-scale=' +
                        ratio +
                        ', minimum-scale=' +
                        ratio +
                        ', user-scalable=no, width=' +
                        mw
                );
            } else {
                //regular size
                viewport_meta_tag.setAttribute(
                    'content',
                    'initial-scale=1.0, maximum-scale=1, minimum-scale=1.0, user-scalable=yes, width=' +
                        ww
                );
            }
        }
    }

    //ok, i need to update viewport scale if screen dimentions changed
    window.addEventListener('resize', function () {
        apply_viewport();
    });

    apply_viewport();
})();
