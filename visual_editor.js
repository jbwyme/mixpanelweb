var MixpanelVisualWeb = function(mixpanelToken) { 
     var eventPossibilities = {
        'div': ['click', 'mouseenter'],
        'a': ['click', 'mouseenter'],
        'span': ['click', 'mouseenter'],
        'th': ['click'],
        'input': ['change'],
        'form': ['submit']
    }
    
    var customerId = mixpanelToken;
    var EventsObj = null;
    var eventsObj = null;
    var initParse = function() { 
        Parse.initialize("ffOsVBR78Oqk5WL8bhvLFpv581bBEGsl0TV4LTiZ", "cNWpTIw4xkSvr6vfDFsKCEu7OkW06TJGhFwC32Th");
        EventsObj = Parse.Object.extend("BoundEvents");
        var query = new Parse.Query(EventsObj);
        query.equalTo("customerId", customerId);
        query.find({
          success: function(results) {
            if (results.length == 0) {
                eventsObj = new EventsObj();
            } else {
                eventsObj = results[0];
                boundEvents = eventsObj.get('events') ? JSON.parse(eventsObj.get('events')) : {};
            }
            initTracking();
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    };

    var initTracking = function() { 
       
        var boundEvents = {};
        var curSelector = undefined;
        var selectors = _.keys(eventPossibilities).join(':not(".__mpignore"), ');
        var $popup = $('<div>').addClass('__mpignore').css({height: 150, width: 300, background: '#efefef', border: '2px solid black', zIndex: 2147483647, position: 'absolute'}).appendTo($('body'));
        var $title = $('<div>').addClass('__mpignore').css({height: 30, width: '100%', background: '#121212', color: '#fff'}).text('track events').appendTo($popup);
        var $elementInfo = $('<div>').addClass('__mpignore').css({fontWeight: 'bold'}).appendTo($popup);
        var $eventRows = $('<div class="eventRows">').addClass('__mpignore').appendTo($popup);
        var $eventRow = $('<div class="eventRow">').addClass('__mpignore')
        var $eventName = $('<span class="eventName">').addClass('__mpignore').appendTo($eventRow);
        var $eventInput = $('<input type="text" class="eventInput">').addClass('__mpignore').css({display: 'inline'}).appendTo($eventRow);
        var $saveBtn = $('<button>').addClass('__mpignore').text("Save").appendTo($popup).click(function() {
            boundEvents[curSelector] = {};
            $('.eventInput.__mpignore').each(function() {
                if ($(this).val()) {
                    console.log("events['" + $(this).attr('name') + "'] = '" + $(this).val() + "'");
                    boundEvents[curSelector][$(this).attr('name')] = $(this).val();
                }
            });
            eventsObj.save({customerId: customerId, events: JSON.stringify(boundEvents)}, {
              success: function(eventsObj) {
                console.log('New object created with objectId: ' + eventsObj.id);
              },
              error: function(eventsObj, error) {
                console.log('Failed to create new object, with error code: ' + error.message);
              }
            });
        });
        var $hitarea = $('<div class="mpevents_hit_area">').css({position: 'absolute', border: '2px solid yellow', zIndex: 2147483646, pointerEvents: 'none'}).appendTo($('body'))

        var discoveryMode = function() {
            console.log('entering discovery mode');
            $hitarea.show();
            $('body')
                .off('.mpselect')
                .on('mouseenter.mpselect', selectors, function() { 
                    $hitarea.css({
                        top: $(this).offset().top, 
                        left: $(this).offset().left, 
                        height: $(this).outerHeight(), 
                        width: $(this).outerWidth() 
                    }) 
                })
                .on('focus.mpselect mousedown.mpselect', selectors, editMode);
            $popup.hide();
        };

        var editMode = function(e) {
            var $el = $(this);
            var tag = $(this).prop("tagName");
            $('body').off('.mpselect');
            $('body').on('click.mpselect', ':not(".__mpignore")', discoveryMode);
            $popup.show();
            var xPos = event.pageX;
            var yPos = event.pageY;
            $popup.css({top: yPos, left: xPos});
            $('.eventRow').remove();
            var eventOptions = eventPossibilities[tag.toLowerCase()] || [];
            for(var i = 0; i < eventOptions.length; i++) {
                var $_row = $eventRow.clone();
                $_row.find('.eventName').text(eventOptions[i]);
                $_row.find('.eventInput').attr("name", eventOptions[i]);
                $_row.appendTo($eventRows);
            }

            var _generateElementSelector = function($el) { 
                if ($el.attr("id")) {
                    return "#" + $el.attr("id");
                } else if ($el.attr('name')) {
                   return tag + "[name='" + $el.attr('name') + "']";
                } else if ($el[0].className) {
                    return tag + "." + $el[0].className.trim().replace(/ /g, ".") + ":contains('" + _getDirectText($el).replace(["'", "\""], ["\'", "\\\""]) + "')";
                } else {
                    return tag + ":contains('" + _getDirectText($el).replace(["'", "\""], ["\'", "\\\""]) + "')";
                }
            }

            var _getDirectText = function($el) {
                return $el
                    .clone()    //clone the element
                    .children() //select all the children
                    .remove()   //remove all the children
                    .end()  //again go back to selected element
                    .text();
            }
            curSelector = _generateElementSelector($el.parent()) + " " + _generateElementSelector($el);
            console.log(curSelector);
            e.stopImmediatePropagation();
            return false;
        };

        discoveryMode();

    };

    var loadScript =  function loadScript(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    };

    loadScript("https://www.parsecdn.com/js/parse-1.3.2.min.js", initParse);
};