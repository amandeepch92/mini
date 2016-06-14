var json_parser = {
    stringify: function (value) {
        var a, i, k, l, v, r = /["\\\x00-\x1f\x7f-\x9f]/g;
        switch (typeof value) {
        case "string":
            return r.test(value) ? '"' + value.replace(r, function (a) {
                var c = value[a];
                if (c) {
                    return c;
                }
                c = a.charCodeAt();
                return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"' : '"' + value + '"';
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null";
            }
            a = [];
            if (typeof value.length === "number" && !value.propertyIsEnumerable("length")) {
                l = value.length;
                for (i = 0; i < l; i += 1) {
                    a.push(this.stringify(value[i]) || "null");
                }
                return "[" + a.join(",") + "]";
            }
            for (k in value) {
                if (value.hasOwnProperty(k)) {
                    if (typeof k === "string") {
                        v = this.stringify(value[k]);
                        if (v) {
                            a.push(this.stringify(k) + ":" + v);
                        }
                    }
                }
            }
            return "{" + a.join(",") + "}";
        }
    },
    parse: function (text) {
        try {
            if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                return eval("(" + text + ")");
            }
        } catch (e) {
            return {'error': ''};
        }
        return false;
    }
};

function firefly() {
    var self = this;
    self.appParms = {};
    self.cookieVal = {};
    self.debug = function (t) {
        try {
            if (sc.on_live != undefined && sc.on_live === 0) {
                console.log(t);
            }
        } catch (e) {}
    };
    self.getCookie = function (name) {
          var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
    self.setCookie = function (c_name,value,exdays,path) {
        var exdate=new Date();
        var path2 = path || "/";
        exdate.setDate(exdate.getDate() + exdays);

        var date = new Date();
        var minutes = 30;
        date.setTime(date.getTime() + (minutes * 60 * 1000));

        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+date.toUTCString());
        document.cookie=c_name + "=" + c_value + ";path="+path2;
    };
    self.getParameter = function(paramName) {
          var searchString = window.location.search.substring(1),
              i, val, params = searchString.split("&");
          for (i=0;i<params.length;i++) {
            val = params[i].split("=");
            if (val[0] == paramName) {
              return unescape(val[1]);
            }
          }
          return null;
    };
    self.overLay = function (p, jObj) {
        jObj = jObj || '#opaque';
        p = p || false;
        if (p === true) {
            $(jObj).css('display', 'block');
        } else {
            $(jObj).css('display', 'none');
        }
    };
    self.io = {};
    self.io.json_parser = json_parser;
    self.io.makeRequest = function (obj, callback) {
        obj = obj || {};
        callback = callback || function () {};
        obj.METHOD = obj.METHOD || 'POST';
        obj.DATA = obj.DATA || '';
        obj.SRC = obj.SRC || '';	
        obj.DATATYPE = obj.DATATYPE || 'json';
		obj.SCRIPTCHARSET = obj.SCRIPTCHARSET || "utf-8";
        obj.CACHE = obj.CACHE || false;
	if (obj.ASYNC==void 0) {
	    obj.ASYNC = true;	
	}	
        obj.BEFORESEND = obj.BEFORESEND || function () {};
        obj.CALLBACK403 = obj.CALLBACK403 || function () {
			try{
				obj.loc = top.window.location;
			}catch(e){
				obj.loc = window.parent.top.location;
			}
            setnext(obj.loc.href);
            if (sc.portal == 'candidate'){
                obj.loc = 'http://recruiter.shine.com/myshine/login/';
            }else if (sc.portal == 'recruiter'){
            	obj.loc = 'http://recruiter.shine.com';
            }else {
                obj.loc = obj.loc.href;
            }
        };
	obj.CALLBACK500 = obj.CALLBACK500 || function(r){
		/*alert('Sorry! Something went wrong. \n Please try after some time...');
		try{
			self.overLay(false);
			$('#rotator').css('display','none');
		}catch(e){}*/
	};
        $app.debug(obj.SRC);
        obj.getAllResponse = $.ajax({
            type: obj.METHOD,
            url: obj.SRC,
            data: obj.DATA,
            dataType: obj.DATATYPE,
	    scriptCharset: obj.SCRIPTCHARSET,
            cache: obj.CACHE,
	    async: obj.ASYNC,
            beforeSend: obj.BEFORESEND,
            success: function (r, t, xhr) {
                callback(r);
            },
            complete: function (r, t) {
				//self.debug('######'+t);
				//self.debug(r);
				switch(r.status){
					case 200:
						break;
					case 403:
						obj.CALLBACK403();
						break;
					case 500:
						obj.CALLBACK500(r);
						break;
				}
            },
            error: obj.errorCallBack || function (r, textStatus, errorThrown) {}
        });
		
		try{
			_gaq.push(['a._trackPageview', obj.SRC]);
		}catch(e){}
		
    };



}
var $app = new firefly();

$app.debug($app);

// Django Ajax CSRF Token Support 
$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
	try{
	    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
	}catch(e){$app.debug(e);}
	}
});

