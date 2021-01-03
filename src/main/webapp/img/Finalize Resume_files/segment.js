var deviceType;

!function () {
    var writeKey = window.segment.Writekey;
    var analytics = window.analytics = window.analytics || []; if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice."); else {
        analytics.invoked = !0; analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "page", "once", "off", "on"]; analytics.factory = function (t) { return function () { var e = Array.prototype.slice.call(arguments); e.unshift(t); analytics.push(e); return analytics } }; for (var t = 0; t < analytics.methods.length; t++) { var e = analytics.methods[t]; analytics[e] = analytics.factory(e) } analytics.load = function (t, opt) { var e = document.createElement("script"); e.type = "text/javascript"; e.defer = !0; e.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js"; var n = document.getElementsByTagName("script")[0]; n.parentNode.insertBefore(e, n); analytics._loadOptions = opt; }; analytics.SNIPPET_VERSION = "4.1.0";
        if (window.segment.Integrations) {
            var integrations = window.segment.Integrations;
            var loadOptions = {
                integrations: integrations
            };
            analytics.load(writeKey, loadOptions);
        }
        else {
            analytics.load(writeKey);
        }
        //analytics.load(writeKey);// WRITE_KEY for production mode
        //if (switchAccount != "1") {
        //    analytics.page();
        //}
    }
}();

var jsUtility = {
    set_Cookie: function (c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value + ";domain=" + window.location.host.substring(window.location.host.indexOf('.')) + ";path=/";
    },
    get_Cookie: function (c_name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    },
    htmlEscape: function (str) {
        if (!str) { return; }

        return str
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },
    htmlUnescape: function (str) {
        if (!str) { return; }

        return str
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, 'and');
    },
    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    getCookieKeyValPair: function (c_name, key) {
        var keyVal = "";
        var c_value = jsUtility.get_Cookie(c_name);
        if (c_value != null && c_value.length > 0) {
            var arrkeyval = c_value.split("#");
            if (arrkeyval.length > 0 && arrkeyval[0].indexOf(":") != -1) {
                for (var i in arrkeyval) {
                    if (arrkeyval[i].split(':')[0].trim().indexOf(key) != -1) {
                        keyVal = arrkeyval[i].split(':')[1].trim();
                        break;
                    }
                }
            }
        }
        return keyVal;
    },
    setCookieKeyValPair: function (c_name, key, value, exdays) {
        var c_Val = getCookie(c_name);
        if (c_Val == null || c_Val.trim().length == 0) {
            jsUtility.set_Cookie(c_name, key + " : " + value, exdays);
        }
        else {
            var keyVal = jsUtility.getCookieKeyValPair(c_name, key);
            if (keyVal.length == 0) {
                jsUtility.set_Cookie(c_name, c_Val + " # " + key + " : " + value, exdays);
            }
            else {
                if (keyVal != value) {
                    jsUtility.set_Cookie(c_name, c_Val.replace(key + " : " + keyVal, key + " : " + value), exdays);
                }
            }
        }
    }
}

function SetMixpanelPropsCookie() {
    var mixpanelProperties = '';
    try {
        var interval = setInterval(function () {
            if (typeof mixpanel != 'undefined' && typeof mixpanel.get_distinct_id != 'undefined') {
                clearInterval(interval);
                var infoProperties = mixpanel._.info.properties();
                if (infoProperties.hasOwnProperty('$browser_version'))
                    infoProperties.$browser_version = Math.floor(infoProperties.$browser_version);
                if (infoProperties.hasOwnProperty('time'))
                    infoProperties.time = Math.floor(infoProperties.time);
                var persistProperties = mixpanel.persistence.properties();

                mixpanelProperties = JSON.stringify(Object.assign(infoProperties, persistProperties));
                mixpanelProperties = excludeExperimentFromMixpanelCookie(mixpanelProperties);
                jsUtility.set_Cookie("mixpanelprops", mixpanelProperties);
            }
        }, 50);
    }
    catch (e) {
        console.log('error in mixpanel properties fetching');
    }
}

function TrackEvents(eventname, eventpropval, userid, email, islogin) {
    var propertiesToBeSent = JSON.parse(JSON.stringify(window.segment.CommonProps));
    var eventproperties = {};

    if (eventpropval) {
        for (var item in eventpropval) {
            if (eventpropval[item]) {
                propertiesToBeSent[item] = eventpropval[item];
                eventproperties[item] = eventpropval[item];
            }
        }
    }

    switch (eventname) {
        case "identify":
            {
                FireSegmentIOIdentify(userid, eventproperties, true);
                break;
            }
        default:
            {
                FireSegmentIOTrack(eventname, propertiesToBeSent, true);
            }
    }
}

function IdentifyCall(userid, traits) {
    if (typeof analytics != "undefined") {
        if (userid) {
            if (traits != null) {
                analytics.identify(userid, traits);
            }
            else {
                analytics.identify(userid);
            }
        }
        else {
            analytics.identify(traits);
        }
    }
}

function PageCall(pagename, properties) {
    if (typeof analytics != "undefined") {
        if (properties != null) {
            //if (true) { //NOW-3987
            //    mixpanel.track("Page Load", properties)
            //}
            analytics.page(pagename, properties);
        }
        else {
            //if (true) { //NOW-3987
            //    mixpanel.track("Page Load")
            //}
            analytics.page(pagename);
        }
    }
}

function TrackCall(eventname, properties) {
    if (typeof analytics != "undefined") {
        if (properties != null) {
            analytics.track(eventname, properties);
        }
        else {
            analytics.track(eventname);
        }
    }
}

//The track API call is how you record any actions your users perform, along with any properties that describe the action.
function FireSegmentIOTrack(eventname, properties, sendEvent) {

    properties = properties || null;

    if (IsSend(sendEvent)) {
        TrackCall(eventname, properties);
    }
}

//The page call lets you record whenever a user sees a page of the website, along with the properties about the page. 
function FireSegmentIOPage(pagename, properties, sendEvent) {

    properties = properties || null;
    if (properties) {
        properties["visitId"] = jsUtility.get_Cookie('vsuid');
    }

    if (IsSend(sendEvent)) {
        PageCall(pagename, properties);
    }
}

//The identify call ties a customer and their actions to a recognizable ID and traits like their email, name, etc.
function FireSegmentIOIdentify(userid, traits, sendEvent) {
    traits = traits || null;

    if (IsSend(sendEvent)) {
        IdentifyCall(userid, traits);
    }

    //clear traits
    if (typeof analytics != "undefined") {
        analytics.ready(function () {
            analytics.user().traits({});
        });
    }
}

//PageEvent-if visitinfo is not decrypted, fetch DeviceType using UserAgent
function TrackPageEvents(eventpropval, islogin) {
    var v_info = jsUtility.get_Cookie('visitinfo');

    //if DeviceType is available in decrypted visitinfo cookie
    if (v_info && v_info.indexOf('DeviceType') !== -1) {
        var index = v_info.indexOf("DeviceType");
        deviceType = v_info.substring(index).split(']&[')[0].split(',')[1].trim();
    }

    //if DeviceType not detected from visitinfo cookie, fetch using UserAgent
    if (!deviceType) {
        GetDeviceTypeUsingUserAgent();
    }
    var interval = setInterval(function () {
        if (typeof mixpanel != "undefined" && jsUtility.get_Cookie('vsuid')) {
            if (typeof deviceType != "undefined") {
                mixpanel.register({
                    'device type': deviceType.toLowerCase()
                });
            }
            clearInterval(interval);
            TrackPageEventsFinal(eventpropval, islogin);
            SetMixpanelPropsCookie();
        }
    }, 50);
}

function TrackPageEventsFinal(eventpropval, islogin) {
    jsUtility.set_Cookie("screenWidth", window.innerWidth);
    var propertiesToBeSent = JSON.parse(JSON.stringify(window.segment.CommonProps));

    //LCB-2129 : Visitor Type
    var strVal = 'New';
    if (jsUtility.get_Cookie('vstrType')) {
        strVal = 'Returning';
    }
    else {
        jsUtility.set_Cookie('vstrType', 1, 365 * 5);
    }

    propertiesToBeSent['Visitor Type'] = strVal;

    if (eventpropval) {
        if (eventpropval.hasOwnProperty('path')) {
            delete eventpropval['path'];
        }
        eventpropval.path = window.location.pathname;

        if (eventpropval.hasOwnProperty('url')) {
            delete eventpropval['url'];
        }
        eventpropval.url = window.location.href;
    }
    else {
        eventpropval = { 'path': window.location.pathname, 'url': window.location.href };
    }
    for (var item in eventpropval) {
        if ((item == 'Feature Set' || item == 'Page Type') && !eventpropval.hasOwnProperty('LP ID'))
        {
            continue;
        }
        if (eventpropval[item]) {
            propertiesToBeSent[item] = eventpropval[item];
        }
    }

    // START - add visitor id to the properties if available
    var visitId = jsUtility.get_Cookie('vsuid');
    if (visitId) {
        propertiesToBeSent["visitId"] = visitId;
    }
    // END

    FireSegmentIOPage("", propertiesToBeSent, true);
}

//ajax-used to fetch "DeviceType" from visitinfo, following "lookup service" as fallback
function GetDeviceTypeUsingUserAgent() {
    if (navigator.userAgent.match(/iPad|Tablet|PlayBook/i)) {
        deviceType = 'tablet';
    }
    else if (navigator.userAgent.match(/Mobile|Android|webOS|iPhone|iPod|Blackberry/i)) {
        deviceType = 'mobile';
    }
    else {
        deviceType = 'desktop';
    }
}

function TrackUTMEvents(userid) {
    var fedex_LPG = jsUtility.getParameterByName("fedx");
    var utm_source = jsUtility.getParameterByName("utm_source");
    var utm_medium = jsUtility.getParameterByName("utm_medium");
    var utm_term = jsUtility.getParameterByName("utm_term");
    var utm_content = jsUtility.getParameterByName("utm_content");
    var utm_campaign = jsUtility.getParameterByName("utm_campaign");

    var propertiesToBeSent = {
        'Fedex LPG': fedex_LPG,
        'UTM Source first touch': utm_source,
        'UTM Medium first touch': utm_medium,
        'UTM Term first touch': utm_term,
        'UTM Content first touch': utm_content,
        'UTM Campaign first touch': utm_campaign,
    };
    var eventproperties = {};
    if (propertiesToBeSent) {
        for (var item in propertiesToBeSent) {
            if (propertiesToBeSent[item]) {
                eventproperties[item] = propertiesToBeSent[item];
            }
        }
    }

    if (!eventproperties) {
        FireSegmentIOIdentify(userid, eventproperties, true);
    }
}

function excludeExperimentFromMixpanelCookie(mixpanelProperties) {//NOW-3402
    var properties = {};
    var data = JSON.parse(mixpanelProperties);
    Object.keys(data).forEach(function (key, index) {
        if (key.indexOf('Experiment:') == -1) {
            properties[key] = data[key];
        }
    });
    return JSON.stringify(properties);
}

//To check whether Event need to send as per switch
function IsSend(sendEvent) {
    var send = false;
    if (sendEvent != undefined || sendEvent != null || sendEvent) {
        send = true;
    }
    else {
        send = false;
    }
    return send;
}