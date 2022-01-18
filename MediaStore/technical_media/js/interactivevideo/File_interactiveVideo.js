window.interactiveVideo = (function () {
    function IV (els) {       
    }
      
    var interactiveVideo = {
        init: function (playerId, itemId) {
        if (typeof playerId !== "undefined") {
            let player = document.getElementById(playerId);
            let scrollItem = document.getElementById(itemId);
            let ts = new this.TimedScrolling(scrollItem, function(seconds){
                player.currentTime = seconds;
            });
            
            player.addEventListener('timeupdate', function(){
                ts.setTime(player.currentTime);
            });
        } else {
            console.error("Function problem: Please provide a const named playerId current type is: " + typeof playerId);
        }
        },
        linkToVmmPro: function (elementId, templateId) {
            let container = document.getElementById(elementId);
            let target = container.firstElementChild
            let observer = new MutationObserver(
            function(mutations) {
                mutations.forEach(function(mutation) {//todo Moritz Rebbert fragen
                    if (mutation.type === "childList"){
                    let videoDom = container.getElementsByTagName("video")[0];
                    interactiveVideo.init(videoDom.id, templateId);
                    observer.disconnect();
                    }
                });    
            });
                
            let config = { attributes: true, childList: true, characterData: true };
                
            observer.observe(target, config);
        },
        linkToYoutube: function (youtubePlayerId, itemContainerId) {
            let _this = this;
            window.addEventListener('load', function () {
                let player = new YT.Player(youtubePlayerId);	
                let scrollItemsContainer = document.getElementById(itemContainerId);        
                let ts = new _this.TimedScrolling(scrollItemsContainer, function(seconds){
                    player.seekTo(seconds, true);
                });
                
                player.addEventListener('onStateChange', function stateChange(){
                    ts.setTime(player.getCurrentTime());
    
                    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                        window.setTimeout(stateChange, 200);
                    }
                });    
            })
		}, 
        TimedScrolling: function ($container, seekVideo) {
            let _this = this, isActive = true;
            _this.active = null;
            _this.items = [];
            _this.scrollTo = function($el, to) {
            let start = $el.scrollTop,
                change = to - start,
                currentTime = 0,
                increment = 20,
                duration = 500;
            
            function easeInOutQuad(t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            }
                
            (function animateScroll(){
                currentTime += increment;
                let val = easeInOutQuad(currentTime, start, change, duration);
                $el.scrollTop = val;
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            })()
            };

            for (var i=0, n=$container.querySelectorAll('[data-time]'), ln=n.length; i<ln; i++) {
                let time = parseFloat(n[i].getAttribute('data-time'));
                _this.items.push({ time: time, $el: n[i] });
                n[i].addEventListener('click', (function(time){
                    return function() { seekVideo(time); };
                })(time));
            }
        
        $container.addEventListener('mouseenter', function(){
            isActive = false;
        });
        $container.addEventListener('mouseleave', function(){
            isActive = true;
        });
        
            _this.setTime = function (seconds) {
                let x  = -1
                for (let i=0, ln=_this.items.length; i<ln; i++) {
                    if (seconds >= _this.items[i].time) {
                        x = i;
                    } else break;
                }
                if (x !== -1 && _this.active !== x && isActive === true) {
                    let $el = _this.items[_this.active = x].$el;
                    _this.scrollTo($container, $el.offsetTop - $container.offsetHeight + $el.offsetHeight);
                }            
        };
        }
    };
       
      return interactiveVideo;
  }());
 