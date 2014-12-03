var mixpanelweb = {
    init: function(token, options) {
         var bindEvents = function() {
            Parse.initialize("ffOsVBR78Oqk5WL8bhvLFpv581bBEGsl0TV4LTiZ", "cNWpTIw4xkSvr6vfDFsKCEu7OkW06TJGhFwC32Th");
            var BoundEvents = Parse.Object.extend("BoundEvents");
            var query = new Parse.Query(BoundEvents);
            query.equalTo("customerId", token);
            query.find({
                success: function(results) {
                    if (results.length > 0) {
                        var eventsObj = results[0];
                        var bindings = eventsObj.get('events') ? JSON.parse(eventsObj.get('events')) : {};
                        for (var selector in bindings) {
                            for(var event in bindings[selector]) {
                                bindEvent(selector, event, bindings[selector][event])
                            }
                        }
                    }
                },
                error: function(error) {
                    console.log("Failed to load mixpanel visual tracking bindings from Parse: " + error.code + " " + error.message);
                }
            });
        }

        var bindEvent = function(selector, dom_event, event_to_track) {
            console.log("$('body').on('" + selector + "').on('" + dom_event + "', function() { m.track('" + event_to_track + '");}"');
            $('body').on(dom_event, selector, function() {
                console.log("sending event: " + event_to_track);
                window.mixpanel[token].track(event_to_track);
            });
        }

        // init mixpanel if needed
        if (window.mixpanel === undefined) {
            console.log('initializing mixpanel from mpweb');
            (function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
                for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=0;a.src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
        }
        window.mixpanel.init(token, options || {}, token);

        // init parse if needed
        if (!(window.Parse && window.Parse.initialize)) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://www.parsecdn.com/js/parse-1.3.2.min.js";
            script.onreadystatechange = bindEvents
            script.onload = bindEvents
            head.appendChild(script);
        } else {
            bindEvents();
        }
    }
};

