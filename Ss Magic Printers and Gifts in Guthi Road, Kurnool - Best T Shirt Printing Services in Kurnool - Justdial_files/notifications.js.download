(function(d, w) {
    try {
    var firebaseObj;
    var title = "Just Dial";

    const loadScript = function({ callback = () => { }, src, scriptid }) {
        try {
        const existingScript = d.getElementById(scriptid);
        var jduids = localStorage.getItem('GCDID');
        if(jduids==null || typeof jduids =='undefined' || jduids==''){
            var date = new Date();
            var tm = date.getTime();
            localStorage.setItem('GCDID', tm);
        }
        if (!existingScript) {
            const script = d.createElement('script');
            script.src = src;
            script.id = scriptid;
            d.head.appendChild(script);
            script.onload = () => {
                if (callback) callback();
            };
        }

        if (existingScript && callback) callback();
        } catch (e) {
            framewithm(e)
            //console.log(e, 'notifications/loadScript')
        }
    }

    w.jdNotifications = {
        loadScript,
        init: function() {
            //console.log("---Init Notify---");
            loadScript({
              src: "https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js",
              callback: function() { onScriptLoaded() },
              scriptid: "firebase-app-jd"
            })
        },
        onLogin: notifyme
    }
    function notifyme() {
        try{
        //console.log("--- Notify Me Fun ---");
        if (firebase.messaging.isSupported()) {
            //console.log("--- Supported FB ---");
            var firebaseConfig = {
              apiKey: "AIzaSyBaffILqhuwsN0EP_iEJIIWmDgxk04jM7U",
              projectId: "mobilesite-c02df",
              messagingSenderId: "843554340940",
              appId: "1:843554340940:web:b988a44096ffe2775434e9"              
            };
            if(!firebaseObj){
            firebase.initializeApp(firebaseConfig);
            firebaseObj = firebase.messaging();
            //console.log("%c GCM-Initialized", "color :#ff6b00;  font-size:16px;");
            firebaseObj.usePublicVapidKey("BCR6q85UEJ5s-gci8CWev1ggOoST56iz2TVsIagkYu5S4751KyMyop-0jP0kXseetRY2W-Erhfn5FCf8z7Scs_k");
            }
            Notification.requestPermission().then((permission) => {
                //console.log("%c Requesting Permission", "color :#ff6b00;  font-size:16px;");
                if (permission === 'granted') {
                    //console.log("%c Permission Granted", "color :#ff6b00;  font-size:16px;");
                    firebaseObj.getToken().then((currentToken) => {
                        if (currentToken) {
                            //console.log("%c GCM Token Generated", "color :#ff6b00;  font-size:16px;");
                            addSubscription(currentToken);
                            registerworker();
                        } else {
                            //console.log('No Instance ID token available. Request permission to generate one.');
                            localStorage.removeItem('gcmTkn');
                        }
                    }).catch((err) => {
                        //console.log('An error occurred while retrieving token. ', err);
                        localStorage.removeItem('gcmTkn');
                    });
                } else {
                    //console.log("%c Permission Denied", "color :#ff6b00;  font-size:16px;");
                }
            });
            firebaseObj.onTokenRefresh(() => {
                firebaseObj.getToken().then((refreshedToken) => {
                    //console.log('Token refreshed.');
                    addSubscription(refreshedToken);
                }).catch((err) => {
                    //console.log('Unable to retrieve refreshed token ', err);
                    //showToken('Unable to retrieve refreshed token ', err);
                    framewithm(err)
                });
            });
        } else {
            //console.log("--- Not Supported FB ---");
        }
        }catch(e){
            //showToken('Unable to retrieve refreshed token ', e);
            framewithm(e)
        }
    }
    const onScriptLoaded = function () {
        try {
            loadScript({
                src: "https://www.gstatic.com/firebasejs/7.15.1/firebase-messaging.js",
                callback: function() {
                    notifyme();
                },
                scriptid: "firebase-messaging-jd"
            })
        } catch (e) { console.log(e); }
    }
    function notifyBrowser(title, desc) {
        if (!Notification) {
            //console.log('Desktop notifications not available in your browser.');
            return;
        }
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        } else {
            var notification = new Notification(title, {
                icon: 'https://akam.cdn.jdmagicbox.com/images/wap/logo/jd_120.png',
                body: desc,
            });
            notification.onclose = function () {
                // console.log('Notification closed');
            };
        }
    }
    function framewithm(e){
        console.log(e)
    }
    function registerworker() {
        //console.log('register worker')
        try {
            navigator.serviceWorker.register("/firebase-messaging-sw.js?v=1.3").then(function (reg) {
                //console.log("%c ServiceWorker registration successful with scope :", "color :#ff6b00;  font-size:16px;", reg);
            }).catch(function (error) {
                framewithm(error)
                //console.error("ServiceWorker registration failed: ", error);
            });
        } catch (e) {
            framewithm(e)
           // console.log("Register Error" + e);
        }
    }
    function getCookieByName(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      } 
    async function addSubscription(currentToken) {
        try {
            let subscribe = 0;
            let gc = localStorage.getItem('gcmTkn');
            let ud = localStorage.getItem('gcmudid');
            if(gc==null){subscribe=1;}
            var act  = 'add';
            var jdsidck = getCookieByName('sid');
            var date = new Date();
            var tm = date.getTime(); var updatedAt =  date.getTime();
            tm = localStorage.getItem('GCDID');
            if(ud!=null && typeof ud !='undefined' && ud!='undefined' && ud!='' && jdsidck!=null && typeof jdsidck !='undefined' && jdsidck!=''){
                subscribe = 1;
                tm = localStorage.getItem('GCDID');
                act  = 'update';
                localStorage.removeItem('gcmudid');
            }
            if (subscribe) {
                //console.log("addSubscription")
                var bodyFormData = new FormData();
                bodyFormData.append("b_id", currentToken)
                bodyFormData.append("action",act)
                bodyFormData.append("udid", tm)
                bodyFormData.append("updAt", updatedAt)
                
                let data = await fetch('/functions/ajxUserSubscription.php', {
                    method: "POST",
                    body: bodyFormData,
                    credentials: "include",
                }).then(res => res.json());
                if ((data === null || data === void 0 ? void 0 : data.errorCode) == '0') {
                    //console.log("%c Subscribed for Notification", "color :#ff6b00;  font-size:16px;");
                    let desc = 'You have successfully subscribed for notifications.';
                    if(gc==null){
                    notifyBrowser(title, desc);
                    }
                    localStorage.setItem('gcmTkn', currentToken);
                    if(jdsidck==null || typeof jdsidck =='undefined' || jdsidck==''){
                        localStorage.setItem('gcmudid', tm);
                    }
                }
            }
        } catch (e) {
            framewithm(e)
            //console.log(e);
        }
    }
} catch (e) {
    framewithm(e)
    //console.log(e, 'notifications.js')
}
})(document, window)
