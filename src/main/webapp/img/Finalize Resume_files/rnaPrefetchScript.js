var hostParts = window.location.host.split('.');
var env = "local";
var contentPath = "/payment/contents/";
var baseUrl = "https://@@env." + hostParts[1] + ".com/payment";
var vendorBundleSrc = 'https://@@env.' + hostParts[1] + '.com/payment/build/vendor.bundle.js?v=1.0.0.204';
var developerBundleSrc = 'https://@@env.' + hostParts[1] + '.com/payment/build/app.bundle.js?v=1.0.0.204';
var plansBundleSrc = 'https://@@env.' + hostParts[1] + '.com/payment/build/plans-1.0.0.204.bundle.js';
var appJsSrc = 'https://@@env.' + hostParts[1] + '.com/payment/scripts/app.js?v=1.0.0.204';
var ecomWidget = 'https://@@env.' + hostParts[1] + '.com/payment/build/widget.bundle.js?v=1.0.0.204';
var bootstrapSrc = 'styles/bootstrap/bootstrap.min.css';
var fontAwesomeSrc = 'styles/font-awesome/css/font-awesome.min.css';
var fontAwesome5WoffSrc = 'styles/font-awesome-5/css/fontawesome5.min.css';
var fontAwesomeWoffSrc = 'styles/font-awesome/fonts/fontawesome-webfont.woff2';
var fontAwesomeSolidWoffSrc = 'styles/font-awesome-5/webfonts/fa-solid-900.woff2';
var fontAwesomeSolidBrandsWoffSrc = 'styles/font-awesome-5/webfonts/fa-brands-400.woff2';
var jQuerySrc = 'scripts/jquery-3.5.1.min.js';
var googleFontsSrc = 'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700|Source+Sans+Pro:200,300,400,600,700|Open+Sans:300,400,600,700,800|Roboto+Slab:100,300,400,700|Work+Sans:300,400,500,600,700|Merriweather:300,400,600,700';
var mainCssSrc = 'https://@@env.' + hostParts[1] + '.com/payment/stylesheets/rna/main.css?v=1.0.0.204';
var resFileName = "rna/dev.json?v=1.0.0.204";
var esShimSrc = 'scripts/es6/es6-shim.min.js';
var googleFontsSrcV2 = 'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700|Source+Sans+Pro:200,300,400,600,700|Open+Sans:300,400,600,700,800|Roboto+Slab:100,300,400,700|Work+Sans:300,400,500,600,700|Merriweather:300,400,600,700';
switch (hostParts[0]) {
    case "reg":
    case "reg-app":
        env = hostParts[0];
        resFileName = "rna/reg.json?v=1.0.0.204";
        break;
    case "stg":
    case "stg-app":
        env = "stg";
        resFileName = "rna/stg.json?v=1.0.0.204";
        break;
    case "qa":
    case "qa-app":
        env = hostParts[0];
        break;
    case "perf":
    case "perf-app":
        env = hostParts[0];
        break;
    case "www":
        env = hostParts[0];
        resFileName = "rna/prod.json?v=1.0.0.204";
        break;
}
var localizedTextJsonPath = baseUrl.replace('@@env', env) + '/files/rna/localizedText.json?v=1.0.0.204';
var ecomJsonPath = baseUrl.replace('@@env', env) + '/files/common/localizedText.json?v=1.0.0.204';

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function prefetchFiles(src, callback, attributes) {
    var s, r, t;
    r = false;
    s = document.createElement('link');
    s.rel = "prefetch";
    s.href = src;
    if (attributes && isEmpty(attributes)) {
        for (var key in attributes) {
            var attr = document.createAttribute(key);
            if (attributes[key]) {
                attr.value = attributes[key];
            }
            s.setAttributeNode(attr);
        }
    }
    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState == 'complete' || this.readyState == 'loaded')) {
            r = true;
            callback && callback();
        }
    };
    t = document.getElementsByTagName('link')[0];
    t.parentNode.insertBefore(s, t);
}

function loadImageFiles() {
    var imageList = [];
    imageList.push('/images/rna/fomo.png');
    imageList.push('/images/rna/comment-icon.png');
    imageList.push('/images/rna/NewAppStore.png');
    imageList.push('/images/rna/logo.png');
    imageList.push('/images/rna/contact-icon.png');
    imageList.push('/images/rna/office.png');
    imageList.push('/images/rna/NewGoogleStore.png');
    imageList.push('/images/wlb/loading.gif');
    imageList.push('/images/rna/icon-app-store.png');
    imageList.push('/images/rna/hubert_baker.png');
    imageList.push('/images/rna/Heather_spielmaker.png');
    imageList.push('/images/rna/asSeenInSellPage.png');
    imageList.push('/images/rna/footer_logo.png');
    imageList.push('/images/rna/footer-social-icons.png');
    imageList.push('/images/rna/jobsnow.png');
    imageList.push('/images/rna/secondary-logo.png');
    imageList.push('/images/rna/rn-rebranding/seen-in-logos.png');
    imageList.push('/images/rna/rn-rebranding/jobs-mob.png');
    imageList.push('/images/rna/rn-rebranding/rebrand-logo.png');
    imageList.push('/images/rna/rn-rebranding/app-store.png');
    imageList.push('/images/rna/rn-rebranding/google-play-badge.png');
    imageList.push('/images/rna/rn-rebranding/HRTech.png');
    imageList.push('/images/rna/rn-rebranding/IAEWS.png');
    imageList.push('/images/rna/rn-rebranding/fomo1.svg');
    imageList.push('/images/rna/rn-rebranding/fomo2.svg');
    imageList.push('/images/rna/rn-rebranding/fomo3.svg');
    imageList.push('/images/rna/rn-rebranding/fomo4.svg');
    imageList.push('/images/rna/rn-rebranding/fomo5.svg');
    imageList.push('/images/rna/rn-rebranding/cardLogo-sprite.png');
    imageList.push('/images/wlb/payment-icons.png');
    imageList.forEach(function (image) {
        prefetchFiles(baseUrl.replace('@@env', env) + image);
    });
}

prefetchFiles(vendorBundleSrc.replace('@@env', env));		//prefetch vendor bundle
prefetchFiles(developerBundleSrc.replace('@@env', env));	//prefetch developer bundle
prefetchFiles(plansBundleSrc.replace('@@env', env));	//prefetch plans bundle
prefetchFiles(appJsSrc.replace('@@env', env));	//prefetch app JS
prefetchFiles(ecomWidget.replace('@@env', env));
prefetchFiles(contentPath + bootstrapSrc);						//prefetch bootstrap CSS
prefetchFiles(contentPath + fontAwesomeSrc);						//prefetch fontawesome CSS
prefetchFiles(contentPath + fontAwesome5WoffSrc);						//prefetch fontawesome5 CSS
prefetchFiles(contentPath + fontAwesomeWoffSrc);						//prefetch fontawesome woff CSS
prefetchFiles(contentPath + fontAwesomeSolidWoffSrc);
prefetchFiles(contentPath + fontAwesomeSolidBrandsWoffSrc);
prefetchFiles(contentPath + jQuerySrc);						//prefetch jQuery
prefetchFiles(contentPath + esShimSrc);
prefetchFiles(googleFontsSrc);					//prefetch googleFonts CSS
prefetchFiles(googleFontsSrcV2);					//prefetch googleFonts CSS
prefetchFiles(mainCssSrc.replace('@@env', env));			//prefetch main CSS 
prefetchFiles(ecomJsonPath);            //prefetch ecom JSON
prefetchFiles(localizedTextJsonPath);
prefetchFiles(contentPath + resFileName);
prefetchFiles('https://www.google.com/recaptcha/api.js?render=explicit')
prefetchFiles("https://www.paypalobjects.com/api/checkout.js", null, { "data-version-4": null, "log-level": "warn" });
prefetchFiles("https://js.braintreegateway.com/web/3.53.0/js/client.min.js");
prefetchFiles("https://js.braintreegateway.com/web/3.53.0/js/paypal-checkout.min.js");
prefetchFiles("https://js.braintreegateway.com/web/3.53.0/js/data-collector.min.js");
loadImageFiles();										//prefect image files

