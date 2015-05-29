//Approfondisci...
	
(function () {
    "use strict";
    var instance;

    document.addEventListener('DOMContentLoaded', function () {
        if (!instance) {
            new cookieNoticeJS();
        }
    });

    window.cookieNoticeJS = function () {

        if (instance !== undefined) {
            return;
        }

        instance = this;

        if (!testCookie() || getNoticeCookie()) {
            return;
        }

        var params = extendDefaults(defaultscn, arguments[0] || {});

        var notice = createNotice(params.msg, params.noticeBgColor, params.noticeTextColor);
        var dbl = createbtn(params.linkmsg,'cookieEU-linkmsg' ,params.cookie_url );
	dbl.target = '_blank';
		
	
        document.body.appendChild(notice).appendChild(dbl);


        var db = createbtn(params.btnmsg,'cookieEU-btnmsg' ,'#');

        db.addEventListener('click', function (e) {
            e.preventDefault();
            setDismissNoticeCookie(parseInt(params.expiresIn + "", 10) * 60 * 1000 * 60 * 24);
            fadeElementOut(notice);
        });

        document.body.appendChild(notice).appendChild(db);
        

    };


    function testCookie() {
        document.cookie = defaultscn.CookieName+'=1';
        return document.cookie.indexOf(defaultscn.CookieName) != -1;
    }

    function getNoticeCookie() {
        return document.cookie.indexOf(defaultscn.cookie_notice) != -1;
    }

    function createNotice(message, bgColor, textColor) {
        var notice = document.createElement('div')
	notice.className = 'cookieEU-msg';

        notice.innerHTML = message;
        notice.setAttribute('id', 'cookieNotice');

        return notice;
    }

    function createbtn(message, nclass ,buttonUrl) {
        var db = document.createElement('a')
	db.className =nclass;

        db.href = buttonUrl;
        db.innerHTML = message;
        return db;

    }


    function setDismissNoticeCookie(expireIn) {
        var now = new Date(),
            cookieExpire = new Date();

        cookieExpire.setTime(now.getTime() + expireIn);
        document.cookie = defaultscn.cookie_notice+"=true; expires=" + cookieExpire.toUTCString() + "; path=/;";
    }

    function fadeElementOut(element) {
        element.style.opacity = 1;
        (function fade() {
            (element.style.opacity -= .1) < 0.01 ? document.body.removeChild(element) : setTimeout(fade, 40)
        })();
    }

    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (typeof source[property] === 'object') {
                    source[property] = extendDefaults(source[property], properties[property]);
                } else {
                    source[property] = properties[property];
                }
            }
        }
        return source;
    }
	
    cookieNoticeJS.extendDefaults = extendDefaults;
    cookieNoticeJS.clearInstance = function () {
        instance = undefined;
    };
}());
