/**
 * Created by lmm on 2017-07-31.
 */
var Dialog = (function (dialog) {
    var n = 0;
    return function (dialog) {
        n = n + 1;
        console.log(n);
        adddialog(dialog, n);
        function adddialog(dialog, i) {
            addstyle(i);
            dialog.contentype = dialog.contentype||'ok';
            dialog.autoclose = dialog.autoclose||false;

            if (dialog.isajax) {
                var html = ' <div id="dialog' + i + '" data-dnum=' + i + ' class="dialog"><div id="modeldialog' + i + '"><div class="modal-dialog mcfixedwidth"><div class= "modal-content mcfixedwidth" ></div></div></div></div>';
                $("body").append(html);
                $.get(dialog.url, function (data) {
                    $("#dialog"+i).append('<div class="bidbg"></div>');
                    $("#modeldialog" + i + " .modal-content").append(data);
                    $("#modeldialog" + i).show();
                    dialog.complete && dialog.complete();
                });
            } else {
                var html = '<div id="dialog' + i + '" data-dnum=' + i + ' class="dialog"><div class="bidbg"></div><div id="modeldialog' + i + '"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><a type="button" class="close" data-dismiss="modal" aria-label="Close">×</a><h4 class="modal-title">提示</h4></div>';
                html += '<div class="modal-body mmdialog">';
                if(dialog.contentype == 'ok'){
                    html += '<i class="iconfont icon-wancheng text-success"></i>';
                }else if(dialog.contentype == 'warn'){
                    html += '<i class="iconfont icon-warn text-warning"></i>';
                }else if(dialog.contentype == 'error'){
                    html += '<i class="iconfont icon-error text-danger"></i>';
                }
                html +='<span>' + dialog.content + '</span></div>';

                html += '<div class="modal-footer"><div class="modal_buttons"><button type="button" class="btn btn-default btn-sm close2">确定</button></div></div>';

                html += '</div></div></div></div>';
                $("body").append(html);
                $("#modeldialog" + i).show();
                dialog.complete && dialog.complete();
            }
            console.log(dialog.autoclose);
            if(dialog.autoclose){
                setTimeout(function () {
                    $("#modeldialog" + i).addClass("finishdialog");
                    $("#dialog" + i + " .bidbg").addClass("finish");
                    if (dialog.destroy) {
                        dialog.destroy();
                    }
                }, 2000);
            }

            var isTrigger = false;
            $("body").on("click", "#dialog" + i + " .bidbg , #modeldialog" + i + " .close ,  #modeldialog" + i + " .close2", function (event) {
                i = $(event.target).parents(".dialog").data("dnum");
                $("#modeldialog" + i).addClass("finishdialog");
                $("#dialog" + i + " .bidbg").addClass("finish");
                $("#modeldialog" + i).one($.fx.animationEnd, function () {
                    console.log("end");
                    isTrigger = true;
                    $("#dialog" + i + ", #Dialogcss" + i).remove();
                    if (dialog.destroy) {
                        dialog.destroy();
                    }
                });

                setTimeout(function () {
                    if (isTrigger) return;
                    $("#dialog" + i + ", #Dialogcss" + i).remove();
                    if (dialog.destroy) {
                        dialog.destroy();
                    }
                }, 500);//if animationEnd函数失效，运行settimeout函数
            });
            $("body").on("click", "#edit-submit", function (event) {
                i=$(event.target).parents(".dialog").data("dnum");
                $("#modeldialog" + i).addClass("finishdialog");
                $("#dialog" + i + " .bidbg").addClass("finish");
                $("#modeldialog" + i).one($.fx.animationEnd, function () {
                    isTrigger = true;
                    $("#dialog" + i + " , #Dialogcss" + i).remove();
                    if (dialog.destroy) {
                        dialog.destroy();
                    }
                });
                setTimeout(function () {
                    if (isTrigger) return;
                    $("#dialog" + i + " , #Dialogcss" + i).remove();
                    if (dialog.destroy) {
                        dialog.destroy();
                    }
                }, 500);
            });
            function addstyle(i) {
                var fixZindex = 10  + parseInt(i * 2);
                var zindex1 = 1041 + parseInt(i * 2);
                var zindex2 = 1040 + parseInt(i * 2);
                var topPosition = 2 + parseInt(i);
                var style = '<style id="Dialogcss' + i + '">#dialog' + i + '{position:fixed;top:0;right:0;bottom:0;left:0;outline:0;z-index:'+fixZindex+';}#modeldialog' + i + '{position:absolute;top:'+topPosition+'%;left:50%;transform:translate(-50%, 0%);-webkit-transform:translate(-50%, 0%);z-index:' + zindex1 + ';display:none;animation:slidedown .3s ease-out;-moz-animation:slidedown .3s ease-out;-webkit-animation:slidedown .3s ease-out;-o-animation:slidedown .3s ease-out}#dialog' + i + ' .bidbg{background:#000;height:100%;z-index:' + zindex2 + ';opacity:.5;filter:alpha(opacity=50);animation:fadein .15s linear;-moz-animation:fadein .15s linear;-webkit-animation:fadein .15s linear;-o-animation:fadein .15s linear}@keyframes fadein{0%{opacity:0;filter:alpha(opacity=0)}100%{opacity:.5;filter:alpha(opacity=50)}}@keyframes slidedown{0%{top:-1%;}50%{top:1%;}100%{top:2%}}#dialog' + i + ' .bidbg.finish{animation:fadeout .5s ease-out;opacity: 0;filter: alpha(opacity = 0);}@keyframes fadeout{0%{opacity:.5;filter:alpha(opacity=50)}100%{opacity:0;filter:alpha(opacity=0)}}#modeldialog' + i + '.finishdialog{animation:slideup .3s linear;transform:translate(-50%, 0%);-webkit-transform:translate(-50%, 0%);opacity:0;top:-1%;}@keyframes slideup{0%{top:2%;opacity:1}50%{top:0%;opacity:0.8}100%{top:-1%;opacity:0}}</style>';
                $("body").append(style)
            }
        }
    }
})();
var dialog3 = {
    "isajax": 0,
    "content": "<button>按钮3</button>"
};

$(document).ready(function () {

    var dialog1 = {
        "isajax":1,
        "url": "editor.html"
       /* "complete": function () {
        },
        "destroy": function () {
            Dialog(dialog2);
        }*/
    };
    var dialog2 = {
        "isajax": 0,
        "autoclose":false, //可去掉,"true"
        "contentype":'ok',// "ok", "warn"
        "content": "成功提交",
        "complete": function () {
        }, //可去掉
        "destroy": function () {
        }//可去掉
    };

    $("#showDialog").click(function () {
        Dialog(dialog1);
    });


});


