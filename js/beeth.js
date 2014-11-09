window.onload=function(){
email=prompt("Enter your name:");
while(!email){
email=prompt("Enter your name:");
}
file=prompt("Enter presentation name:");
while(!file){
file=prompt("Enter presentation name:");

}




jstring="(function ( document, window ) {\n    'use strict';\n    \n    var pfx = (function () {\n        \n        var style = document.createElement('dummy').style,\n            prefixes = 'Webkit Moz O ms Khtml'.split(' '),\n            memory = {};\n        \n        return function ( prop ) {\n            if ( typeof memory[ prop ] === 'undefined' ) {\n                \n                var ucProp  = prop.charAt(0).toUpperCase() + prop.substr(1),\n                    props   = (prop + ' ' + prefixes.join(ucProp + ' ') + ucProp).split(' ');\n                \n                memory[ prop ] = null;\n                for ( var i in props ) {\n                    if ( style[ props[i] ] !== undefined ) {\n                        memory[ prop ] = props[i];\n                        break;\n                    }\n                }\n            \n            }\n            \n            return memory[ prop ];\n        };\n    \n    })();\n    \n   \n    var arrayify = function ( a ) {\n        return [].slice.call( a );\n    };\n    \n   \n    var css = function ( el, props ) {\n        var key, pkey;\n        for ( key in props ) {\n            if ( props.hasOwnProperty(key) ) {\n                pkey = pfx(key);\n                if ( pkey !== null ) {\n                    el.style[pkey] = props[key];\n                }\n            }\n        }\n        return el;\n    };\n    \n   \n    var toNumber = function (numeric, fallback) {\n        return isNaN(numeric) ? (fallback || 0) : Number(numeric);\n    };\n    \n    \n    var byId = function ( id ) {\n        return document.getElementById(id);\n    };\n    \n  \n    var $ = function ( selector, context ) {\n        context = context || document;\n        return context.querySelector(selector);\n    };\n  \n    var $$ = function ( selector, context ) {\n        context = context || document;\n        return arrayify( context.querySelectorAll(selector) );\n    };\n  \n    var triggerEvent = function (el, eventName, detail) {\n        var event = document.createEvent('CustomEvent');\n        event.initCustomEvent(eventName, true, true, detail);\n        el.dispatchEvent(event);\n    };\n    \n    \n    var translate = function ( t ) {\n        return ' translate3d(' + t.x + 'px,' + t.y + 'px,' + t.z + 'px) ';\n    };\n    \n\n    var rotate = function ( r, revert ) {\n        var rX = ' rotateX(' + r.x + 'deg) ',\n            rY = ' rotateY(' + r.y + 'deg) ',\n            rZ = ' rotateZ(' + r.z + 'deg) ';\n        \n        return revert ? rZ+rY+rX : rX+rY+rZ;\n    };\n    \n  \n    var scale = function ( s ) {\n        return ' scale(' + s + ') ';\n    };\n    \n    \n    var perspective = function ( p ) {\n        return ' perspective(' + p + 'px) ';\n    };\n    \n   \n    var getElementFromHash = function () {\n       \nvar gd='';        return byId( window.location.hash.replace(/^#\\\/?/,gd) );\n    };\n    \n   \n    var computeWindowScale = function ( config ) {\n        var hScale = window.innerHeight / config.height,\n            wScale = window.innerWidth / config.width,\n            scale = hScale > wScale ? wScale : hScale;\n        \n        if (config.maxScale && scale > config.maxScale) {\n            scale = config.maxScale;\n        }\n        \n        if (config.minScale && scale < config.minScale) {\n            scale = config.minScale;\n        }\n        \n        return scale;\n    };\n    \n   \n    var body = document.body;\n    \n    var ua = navigator.userAgent.toLowerCase();\n    var impressSupported = \n                         \n                           ( pfx('perspective') !== null ) &&\n                           \n                          \n                           ( body.classList ) &&\n                           ( body.dataset ) &&\n                         \n                           ( ua.search(/(iphone)|(ipod)/) === -1 );\n    \n    if (!impressSupported) {\n        \n        body.className += ' impress-not-supported ';\n    } else {\n        body.classList.remove('impress-not-supported');\n        body.classList.add('impress-supported');\n    }\n    \n   \n    var roots = {};\n    \n  \n    var defaults = {\n        width: 1024,\n        height: 768,\n        maxScale: 1,\n        minScale: 0,\n        \n        perspective: 1000,\n        \n        transitionDuration: 1000\n    };\n    \n    \n    var empty = function () { return false; };\n    \n   \n    var impress = window.impress = function ( rootId ) {\n        \n        \n        if (!impressSupported) {\n            return {\n                init: empty,\n                goto: empty,\n                prev: empty,\n                next: empty\n            };\n        }\n        \n        rootId = rootId || 'impress';\n        \n        \n        if (roots['impress-root-' + rootId]) {\n            return roots['impress-root-' + rootId];\n        }\n        \n        var stepsData = {};\n        \n        var activeStep = null;\n        \n        var currentState = null;\n        \n        var steps = null;\n        \n        var config = null;\n        \n        var windowScale = null;        \n        \n        var root = byId( rootId );\n        var canvas = document.createElement('div');\n        \n        var initialized = false;\n        \n        var lastEntered = null;\n        \n        var onStepEnter = function (step) {\n            if (lastEntered !== step) {\n                triggerEvent(step, 'impress:stepenter');\n                lastEntered = step;\n            }\n        };\n        \n        var onStepLeave = function (step) {\n            if (lastEntered === step) {\n                triggerEvent(step, 'impress:stepleave');\n                lastEntered = null;\n            }\n        };\n        \n        var initStep = function ( el, idx ) {\n            var data = el.dataset,\n                step = {\n                    translate: {\n                        x: toNumber(data.x),\n                        y: toNumber(data.y),\n                        z: toNumber(data.z)\n                    },\n                    rotate: {\n                        x: toNumber(data.rotateX),\n                        y: toNumber(data.rotateY),\n                        z: toNumber(data.rotateZ || data.rotate)\n                    },\n                    scale: toNumber(data.scale, 1),\n                    el: el\n                };\n            \n            if ( !el.id ) {\n                el.id = 'step-' + (idx + 1);\n            }\n            \n            stepsData['impress-' + el.id] = step;\n            \n            css(el, {\n                position: 'absolute',\n                transform: 'translate(-50%,-50%)' +\n                           translate(step.translate) +\n                           rotate(step.rotate) +\n                           scale(step.scale),\n                transformStyle: 'preserve-3d'\n            });\n        };\n        var init = function () {\n            if (initialized) { return; }\n            var rohit = 'meta[name='+'viewport'+']';\n            var meta = $(rohit) || document.createElement('meta');\n            meta.content = 'width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no';\n            if (meta.parentNode !== document.head) {\n                meta.name = 'viewport';\n               // document.head.appendChild(meta);\n            }\n            var rootData = root.dataset;\n            config = {\n                width: toNumber( rootData.width, defaults.width ),\n                height: toNumber( rootData.height, defaults.height ),\n                maxScale: toNumber( rootData.maxScale, defaults.maxScale ),\n                minScale: toNumber( rootData.minScale, defaults.minScale ),                \n                perspective: toNumber( rootData.perspective, defaults.perspective ),\n                transitionDuration: toNumber( rootData.transitionDuration, defaults.transitionDuration )\n            };\n            \n            windowScale = computeWindowScale( config );\n            arrayify( root.childNodes ).forEach(function ( el ) {\n                canvas.appendChild( el );\n            });\n            root.appendChild(canvas);\n            document.documentElement.style.height = '100%';\n            \n            css(body, {\n                height: '100%',\n                overflow: 'hidden'\n            });\n            \n            var rootStyles = {\n                position: 'absolute',\n                transformOrigin: 'top left',\n                transition: 'all 0s ease-in-out',\n                transformStyle: 'preserve-3d'\n            };\n            \n            css(root, rootStyles);\n            css(root, {\n                top: '50%',\n                left: '50%',\n                transform: perspective( config.perspective/windowScale ) + scale( windowScale )\n            });\n            css(canvas, rootStyles);\n            \n            body.classList.remove('impress-disabled');\n            body.classList.add('impress-enabled');\n            \n            steps = $$('.step', root);\n            steps.forEach( initStep );\n            \n            currentState = {\n                translate: { x: 0, y: 0, z: 0 },\n                rotate:    { x: 0, y: 0, z: 0 },\n                scale:     1\n            };\n            \n            initialized = true;\n            \n            triggerEvent(root, 'impress:init', { api: roots[ 'impress-root-' + rootId ] });\n        };\n        var getStep = function ( step ) {\n            if (typeof step === 'number') {\n                step = step < 0 ? steps[ steps.length + step] : steps[ step ];\n            } else if (typeof step === 'string') {\n                step = byId(step);\n            }\n            return (step && step.id && stepsData['impress-' + step.id]) ? step : null;\n        };\n        var stepEnterTimeout = null;\n        var goto = function ( el, duration ) {\n            \n            if ( !initialized || !(el = getStep(el)) ) {\n                return false;\n            }\n            window.scrollTo(0, 0);\n            \n            var step = stepsData['impress-' + el.id];\n            \n            if ( activeStep ) {\n                activeStep.classList.remove('active');\n                body.classList.remove('impress-on-' + activeStep.id);\n            }\n            el.classList.add('active');\n            \n            body.classList.add('impress-on-' + el.id);\n            var target = {\n                rotate: {\n                    x: -step.rotate.x,\n                    y: -step.rotate.y,\n                    z: -step.rotate.z\n                },\n                translate: {\n                    x: -step.translate.x,\n                    y: -step.translate.y,\n                    z: -step.translate.z\n                },\n                scale: 1 / step.scale\n            };\n            \n            var zoomin = target.scale >= currentState.scale;\n            \n            duration = toNumber(duration, config.transitionDuration);\n            var delay = (duration / 2);\n            \n            if (el === activeStep) {\n                windowScale = computeWindowScale(config);\n            }\n            \n            var targetScale = target.scale * windowScale;\n            \n            if (activeStep && activeStep !== el) {\n                onStepLeave(activeStep);\n            }\n            \n            css(root, {\n                transform: perspective( config.perspective / targetScale ) + scale( targetScale ),\n                transitionDuration: duration + 'ms',\n                transitionDelay: (zoomin ? delay : 0) + 'ms'\n            });\n            \n            css(canvas, {\n                transform: rotate(target.rotate, true) + translate(target.translate),\n                transitionDuration: duration + 'ms',\n                transitionDelay: (zoomin ? 0 : delay) + 'ms'\n            });\n            \n            if ( currentState.scale === target.scale ||\n                (currentState.rotate.x === target.rotate.x && currentState.rotate.y === target.rotate.y &&\n                 currentState.rotate.z === target.rotate.z && currentState.translate.x === target.translate.x &&\n                 currentState.translate.y === target.translate.y && currentState.translate.z === target.translate.z) ) {\n                delay = 0;\n            }\n            \n            currentState = target;\n            activeStep = el;\n            \n            window.clearTimeout(stepEnterTimeout);\n            stepEnterTimeout = window.setTimeout(function() {\n                onStepEnter(activeStep);\n            }, duration + delay);\n            \n            return el;\n        };\n        \n        var prev = function () {\n            var prev = steps.indexOf( activeStep ) - 1;\n            prev = prev >= 0 ? steps[ prev ] : steps[ steps.length-1 ];\n            \n            return goto(prev);\n        };\n        \n        var next = function () {\n            var next = steps.indexOf( activeStep ) + 1;\n            next = next < steps.length ? steps[ next ] : steps[ 0 ];\n            \n            return goto(next);\n        };\n        \n        root.addEventListener('impress:init', function(){\n            steps.forEach(function (step) {\n                step.classList.add('future');\n            });\n            \n            root.addEventListener('impress:stepenter', function (event) {\n                event.target.classList.remove('past');\n                event.target.classList.remove('future');\n                event.target.classList.add('present');\n            }, false);\n            \n            root.addEventListener('impress:stepleave', function (event) {\n                event.target.classList.remove('present');\n                event.target.classList.add('past');\n            }, false);\n            \n        }, false);\n        root.addEventListener('impress:init', function(){\n            var lastHash = '';\n            root.addEventListener('impress:stepenter', function (event) {\n                window.location.hash = lastHash = '#/' + event.target.id;\n            }, false);\n            \n            window.addEventListener('hashchange', function () {\n                if (window.location.hash !== lastHash) {\n                    goto( getElementFromHash() );\n                }\n            }, false);\n            \n            goto(getElementFromHash() || steps[0], 0);\n        }, false);\n        \n        body.classList.add('impress-disabled');\n        \n        return (roots[ 'impress-root-' + rootId ] = {\n            init: init,\n            goto: goto,\n            next: next,\n            prev: prev\n        });\n\n    };\n    \n    impress.supported = impressSupported;\n    \n})(document, window);\n\n(function ( document, window ) {\n    'use strict';\n    var throttle = function (fn, delay) {\n        var timer = null;\n        return function () {\n            var context = this, args = arguments;\n            clearTimeout(timer);\n            timer = setTimeout(function () {\n                fn.apply(context, args);\n            }, delay);\n        };\n    };\n    \n    document.addEventListener('impress:init', function (event) {\n        var api = event.detail.api;\n        document.addEventListener('keydown', function ( event ) {\n            if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {\n                event.preventDefault();\n            }\n        }, false);\n        \n        document.addEventListener('keyup', function ( event ) {\n            if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {\n                switch( event.keyCode ) {\n                    case 33: \n                    case 37: \n                    case 38: \n                             api.prev();\n                             break;\n                    case 9: \n                    case 32:\n                    case 34: \n                    case 39: \n                    case 40: \n                             api.next();\n                             break;\n                }\n                \n                event.preventDefault();\n            }\n        }, false);\n        \n        document.addEventListener('click', function ( event ) {\n            var target = event.target;\n            while ( (target.tagName !== 'A') &&\n                    (target !== document.documentElement) ) {\n                target = target.parentNode;\n            }\n            \n            if ( target.tagName === 'A' ) {\n                var href = target.getAttribute('href');\n                \n                if ( href && href[0] === '#' ) {\n                    target = document.getElementById( href.slice(1) );\n                }\n            }\n            \n            if ( api.goto(target) ) {\n                event.stopImmediatePropagation();\n                event.preventDefault();\n            }\n        }, false);\n        \n        document.addEventListener('click', function ( event ) {\n            var target = event.target;\n            while ( !(target.classList.contains('step') && !target.classList.contains('active')) &&\n                    (target !== document.documentElement) ) {\n                target = target.parentNode;\n            }\n            \n            if ( api.goto(target) ) {\n                event.preventDefault();\n            }\n        }, false);\n        \n        document.addEventListener('touchstart', function ( event ) {\n            if (event.touches.length === 1) {\n                var x = event.touches[0].clientX,\n                    width = window.innerWidth * 0.3,\n                    result = null;\n                    \n                if ( x < width ) {\n                    result = api.prev();\n                } else if ( x > window.innerWidth - width ) {\n                    result = api.next();\n                }\n                \n                if (result) {\n                    event.preventDefault();\n                }\n            }\n        }, false);\n        \n        window.addEventListener('resize', throttle(function () {\n          \n            api.goto( document.querySelector('.step.active'), 500 );\n        }, 250), false);\n        \n    }, false);\n        \n})(document, window);\n\n";











cssstring="\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n}\n\n\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n    display: block;\n}\nbody {\n    line-height: 1;\n}\nol, ul {\n    list-style: none;\n}\nblockquote, q {\n    quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n    content: '';\n    content: none;\n}\n\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n\nbody {\n    font-family: 'PT Sans', sans-serif;\n    min-height: 740px;\n\n    background: rgb(215, 215, 215);\n    background: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 500, from(rgb(240, 240, 240)), to(rgb(190, 190, 190)));\n    background: -webkit-radial-gradient(rgb(240, 240, 240), rgb(190, 190, 190));\n    background:    -moz-radial-gradient(rgb(240, 240, 240), rgb(190, 190, 190));\n    background:     -ms-radial-gradient(rgb(240, 240, 240), rgb(190, 190, 190));\n    background:      -o-radial-gradient(rgb(240, 240, 240), rgb(190, 190, 190));\n    background:         radial-gradient(rgb(240, 240, 240), rgb(190, 190, 190));\n}\n\nb, strong { font-weight: bold }\ni, em { font-style: italic }\n\na {\n    color: inherit;\n    text-decoration: none;\n    padding: 0 0.1em;\n    background: rgba(255,255,255,0.5);\n    text-shadow: -1px -1px 2px rgba(100,100,100,0.9);\n    border-radius: 0.2em;\n\n    -webkit-transition: 0.5s;\n    -moz-transition:    0.5s;\n    -ms-transition:     0.5s;\n    -o-transition:      0.5s;\n    transition:         0.5s;\n}\n\na:hover,\na:focus {\n    background: rgba(255,255,255,1);\n    text-shadow: -1px -1px 2px rgba(100,100,100,0.5);\n}\n\n\n.fallback-message {\n    font-family: sans-serif;\n    line-height: 1.3;\n\n    width: 780px;\n    padding: 10px 10px 0;\n    margin: 20px auto;\n\n    border: 1px solid #E4C652;\n    border-radius: 10px;\n    background: #EEDC94;\n}\n\n.fallback-message p {\n    margin-bottom: 10px;\n}\n\n.impress-supported .fallback-message {\n    display: none;\n}\n\n\n.step {\n    position: relative;\n    width: 900px;\n    padding: 40px;\n    margin: 20px auto;\n\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing:    border-box;\n    -ms-box-sizing:     border-box;\n    -o-box-sizing:      border-box;\n    box-sizing:         border-box;\n\n    font-family: 'PT Serif', georgia, serif;\n    font-size: 48px;\n    line-height: 1.5;\n}\n\n.impress-enabled .step {\n    margin: 0;\n    opacity: 0.3;\n\n    -webkit-transition: opacity 1s;\n    -moz-transition:    opacity 1s;\n    -ms-transition:     opacity 1s;\n    -o-transition:      opacity 1s;\n    transition:         opacity 1s;\n}\n\n.impress-enabled .step.active { opacity: 1 }\n\n.slide {\n    display: block;\n\n    width: 900px;\n    height: 700px;\n    padding: 40px 60px;\n\n    background-color: white;\n    border: 1px solid rgba(0, 0, 0, .3);\n    border-radius: 10px;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, .1);\n\n    color: rgb(102, 102, 102);\n    text-shadow: 0 2px 2px rgba(0, 0, 0, .1);\n\n    font-family: 'Open Sans', Arial, sans-serif;\n    font-size: 30px;\n    line-height: 36px;\n    letter-spacing: -1px;\n}\n\n.slide q {\n    display: block;\n    font-size: 50px;\n    line-height: 72px;\n\n    margin-top: 100px;\n}\n\n.slide q strong {\n    white-space: nowrap;\n}\n\n\n\n#title {\n    padding: 0;\n}\n\n#title .try {\n    font-size: 64px;\n    position: absolute;\n    top: -0.5em;\n    left: 1.5em;\n\n    -webkit-transform: translateZ(20px);\n    -moz-transform:    translateZ(20px);\n    -ms-transform:     translateZ(20px);\n    -o-transform:      translateZ(20px);\n    transform:         translateZ(20px);\n}\n\n#title h1 {\n    font-size: 190px;\n\n    -webkit-transform: translateZ(50px);\n    -moz-transform:    translateZ(50px);\n    -ms-transform:     translateZ(50px);\n    -o-transform:      translateZ(50px);\n    transform:         translateZ(50px);\n}\n\n#title .footnote {\n    font-size: 32px;\n}\n\n\n#big {\n    width: 600px;\n    text-align: center;\n    font-size: 60px;\n    line-height: 1;\n}\n\n#big b {\n    display: block;\n    font-size: 250px;\n    line-height: 250px;\n}\n\n#big .thoughts {\n    font-size: 90px;\n    line-height: 150px;\n}\n\n\n#tiny {\n    width: 500px;\n    text-align: center;\n}\n\n#ing { width: 500px }\n\n#ing b {\n    display: inline-block;\n    -webkit-transition: 0.5s;\n    -moz-transition:    0.5s;\n    -ms-transition:     0.5s;\n    -o-transition:      0.5s;\n    transition:         0.5s;\n}\n\n#ing.present .positioning {\n    -webkit-transform: translateY(-10px);\n    -moz-transform:    translateY(-10px);\n    -ms-transform:     translateY(-10px);\n    -o-transform:      translateY(-10px);\n    transform:         translateY(-10px);\n}\n\n#ing.present .rotating {\n    -webkit-transform: rotate(-10deg);\n    -moz-transform:    rotate(-10deg);\n    -ms-transform:     rotate(-10deg);\n    -o-transform:      rotate(-10deg);\n    transform:         rotate(-10deg);\n\n    -webkit-transition-delay: 0.25s;\n    -moz-transition-delay:    0.25s;\n    -ms-transition-delay:     0.25s;\n    -o-transition-delay:      0.25s;\n    transition-delay:         0.25s;\n}\n\n#ing.present .scaling {\n    -webkit-transform: scale(0.7);\n    -moz-transform:    scale(0.7);\n    -ms-transform:     scale(0.7);\n    -o-transform:      scale(0.7);\n    transform:         scale(0.7);\n\n    -webkit-transition-delay: 0.5s;\n    -moz-transition-delay:    0.5s;\n    -ms-transition-delay:     0.5s;\n    -o-transition-delay:      0.5s;\n    transition-delay:         0.5s;\n}\n\n\n#imagination {\n    width: 600px;\n}\n\n#imagination .imagination {\n    font-size: 78px;\n}\n\n#source {\n    width: 700px;\n    padding-bottom: 300px;\n\n    \n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYCAMAAACwUBm+AAAAAXNSR0IArs4c6QAAAKtQTFRFsAAAvbWSLUUrLEQqY1s8UYJMqJ1vNTEgOiIdIzYhjIFVLhsXZ6lgSEIsP2U8JhcCVzMsSXZEgXdOO145XJdWOl03LzAYMk4vSXNExr+hwcuxRTs1Qmk+RW9Am49eFRANQz4pUoNMQWc+OSMDTz0wLBsCNVMxa2NBOyUDUoNNSnlEWo9VRGxAVzYFl6tXCggHbLNmMUIcHhwTXkk5f3VNRT8wUT8xAAAACQocRBWFFwAAAAF0Uk5TAEDm2GYAAAPCSURBVHja7d3JctNAFIZRMwRCCGEmzPM8z/D+T8bu/ptbXXJFdij5fMt2Wuo+2UgqxVmtttq5WVotLzBgwIABAwYMGDCn0qVqbo69psPqVpWx+1XG5iaavF8wYMCAAQMGDBgwi4DJ6Y6qkxB1HNlcN3a92gbR5P2CAQMGDBgwYMCAWSxMlrU+UY5yu2l9okfV4bAxUVbf7TJnAwMGDBgwYMCAAbMLMHeqbGR82Zy+VR1Ht81nVca6R+UdTLaU24Ruzd3qM/e4yjnAgAEDBgwYMGDA7AJMd1l/3NRdVGcj3eX/2WEhCmDGxnM7yqygu8XIPjJj8iN/MGDAgAEDBgwYMAuDGb8q0RGlLCHLv1t9qDKWn3vdNHVuEI6HPaxO9Jo3GDBgwIABAwYMmIXBdC9ShGgMk+XnkXUeuGcsP/e1+lhNnZsL/G5Vs3OAAQMGDBgwYMCAWSxMR3SzOmraG5atdy9wZKzb+vg16qyqe2FltbnAgAEDBgwYMGDALAxmTJSuN3WA76rnVca6GTnemGN1WoEBAwYMGDBgwIBZGMxUomy4+xO899V4LAg5Xnc2MGDAgAEDBgwYMGA218Wq+2K1LDqvY9xZu8zN8fICdM6btYABAwYMGDBgwIABMzfH0+pGU5afze2tXebmeAfVz+p8BQYMGDBgwIABAwbMPBzZ+oWmfJrln1273FhkbHzee9WWbw7AgAEDBgwYMGDALAKm43hcdctKgblcPamOhuXnXlY5Xs6bsW4FGyQCAwYMGDBgwIABswiYMceZKgvMo+h8mrHLTdn676rj+FEFoTtHd8MwOxEYMGDAgAEDBgyYRcBM5UhXqiymW3R3c9ARhWO/OmjqfjVZy+xEYMCAAQMGDBgwYBYG073OnCV0RFNhMhaOa9WfKmOB6XjHMN1tQmaAAQMGDBgwYMCA2VWY7vXjz1U4croAzgPztwIDBgwYMGDAgAEDZhswh035NBw59Dww3RgYMGDAgAEDBgwYMJuD6f4tXT7NUqfCdBvZLkxXdgQGDBgwYMCAAQNmt2DGj8WzwAfV/w7T/aq7mxwwYMCAAQMGDBgwuwqTOo7uTwTngflSzQ3TdaJvAwEDBgwYMGDAgAED5gSvgbyo5oHZ4Pc+gwEDBgwYMGDAgAEzhOm+5G0qTGaAAQMGDBgwYMCAAXNaMOcnls3tNwWm+zRzp54NDBgwYMCAAQMGDJh5YNL36k1TLuGvVq+qnKMbS5n7tulT9asCAwYMGDBgwIABA2ZumKuztLnjgQEDBgwYMGDAgNl5mH/4/ltKA6vBNAAAAABJRU5ErkJggg==);\n    background-position: bottom right;\n    background-repeat: no-repeat;\n}\n\n#source q {\n    font-size: 60px;\n}\n\n#its-in-3d p {\n    -webkit-transform-style: preserve-3d;\n    -moz-transform-style:    preserve-3d; \n    -ms-transform-style:     preserve-3d;\n    -o-transform-style:      preserve-3d;\n    transform-style:         preserve-3d;\n}\n\n#its-in-3d span,\n#its-in-3d b {\n    display: inline-block;\n    -webkit-transform: translateZ(40px);\n    -moz-transform:    translateZ(40px);\n    -ms-transform:     translateZ(40px);\n    -o-transform:      translateZ(40px);\n     transform:        translateZ(40px);\n\n    -webkit-transition: 0.5s;\n    -moz-transition:    0.5s;\n    -ms-transition:     0.5s;\n    -o-transition:      0.5s;\n    transition:         0.5s;\n}\n\n#its-in-3d .have {\n    -webkit-transform: translateZ(-40px);\n    -moz-transform:    translateZ(-40px);\n    -ms-transform:     translateZ(-40px);\n    -o-transform:      translateZ(-40px);\n    transform:         translateZ(-40px);\n}\n\n#its-in-3d .you {\n    -webkit-transform: translateZ(20px);\n    -moz-transform:    translateZ(20px);\n    -ms-transform:     translateZ(20px);\n    -o-transform:      translateZ(20px);\n    transform:         translateZ(20px);\n}\n\n#its-in-3d .noticed {\n    -webkit-transform: translateZ(-40px);\n    -moz-transform:    translateZ(-40px);\n    -ms-transform:     translateZ(-40px);\n    -o-transform:      translateZ(-40px);\n    transform:         translateZ(-40px);\n}\n\n#its-in-3d .its {\n    -webkit-transform: translateZ(60px);\n    -moz-transform:    translateZ(60px);\n    -ms-transform:     translateZ(60px);\n    -o-transform:      translateZ(60px);\n    transform:         translateZ(60px);\n}\n\n#its-in-3d .in {\n    -webkit-transform: translateZ(-10px);\n    -moz-transform:    translateZ(-10px);\n    -ms-transform:     translateZ(-10px);\n    -o-transform:      translateZ(-10px);\n    transform:         translateZ(-10px);\n}\n\n#its-in-3d .footnote {\n    font-size: 32px;\n\n    -webkit-transform: translateZ(-10px);\n    -moz-transform:    translateZ(-10px);\n    -ms-transform:     translateZ(-10px);\n    -o-transform:      translateZ(-10px);\n    transform:         translateZ(-10px);\n}\n\n#its-in-3d.present span,\n#its-in-3d.present b {\n    -webkit-transform: translateZ(0px);\n    -moz-transform:    translateZ(0px);\n    -ms-transform:     translateZ(0px);\n    -o-transform:      translateZ(0px);\n    transform:         translateZ(0px);\n}\n\n#overview { display: none }\n\n.impress-on-overview .step {\n    opacity: 1;\n    cursor: pointer;\n}\n\n\n\n.hint {\n    display: none;\n\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 200px;\n\n    background: rgba(0,0,0,0.5);\n    color: #EEE;\n    text-align: center;\n\n    font-size: 50px;\n    padding: 20px;\n\n    z-index: 100;\n\n    opacity: 0;\n\n    -webkit-transform: translateY(400px);\n    -moz-transform:    translateY(400px);\n    -ms-transform:     translateY(400px);\n    -o-transform:      translateY(400px);\n    transform:         translateY(400px);\n\n    -webkit-transition: opacity 1s, -webkit-transform 0.5s 1s;\n    -moz-transition:    opacity 1s,    -moz-transform 0.5s 1s;\n    -ms-transition:     opacity 1s,     -ms-transform 0.5s 1s;\n    -o-transition:      opacity 1s,      -o-transform 0.5s 1s;\n    transition:         opacity 1s,         transform 0.5s 1s;\n}\n\n.impress-enabled .hint { display: block }\n\n.impress-on-bored .hint {\n    opacity: 1;\n\n    -webkit-transform: translateY(0px);\n    -moz-transform:    translateY(0px);\n    -ms-transform:     translateY(0px);\n    -o-transform:      translateY(0px);\n    transform:         translateY(0px);\n\n    -webkit-transition: opacity 1s 5s, -webkit-transform 0.5s 4.5s;\n    -moz-transition:    opacity 1s 5s,    -moz-transform 0.5s 4.5s;\n    -ms-transition:     opacity 1s 5s,     -ms-transform 0.5s 4.5s;\n    -o-transition:      opacity 1s 5s,      -o-transform 0.5s 4.5s;\n    transition:         opacity 1s 5s,         transform 0.5s 4.5s;\n}\n\n.impress-enabled          { pointer-events: none }\n.impress-enabled #impress { pointer-events: auto }\n\n";







string="<!doctype html><html>    <head>        <title>"+file+"</title><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'><link href='impress-demo.css' rel='stylesheet' /></head><body><div id='impress' count='0'> ";
string=string+"</div><script>if ('ontouchstart' in document.documentElement) { document.querySelector('hint').innerHTML = '<p>Tap on the left or right to navigate</p>';}</script><script src='impress.js'></script><script>impress().init();</script></body></html>";
handleFileSelect(string,email,file);
}

//handleFileSelect is what activates when you press load 

function handleFileSelect(hstring,hname,hfile)
{

if(window.File && window.FileReader && window.FileList && window.Blob){}
else
{ alert ("sorry not supported"); return;}

if(!hstring && !hname && !hfile)
{



}
else 
{

var pos=document.getElementById("pos");

pos.value="1";
(document.getElementById("slidex")).value=0;
(document.getElementById("slidey")).value=0;
(document.getElementById("slidez")).value=0;
(document.getElementById("rotx")).value=0;
(document.getElementById("roty")).value=0;
(document.getElementById("rotz")).value=0;
(document.getElementById("datascale")).value=0.5;
(document.getElementById("content")).value="";


receivedText(hfile);
var c="Welcome "+hname;
alert(c);
}
}
function receivedText(hfile)
{
//alert(string);
var x=string;

i=x.length-1;

flag=0;
//alert(x);
sessionStorage.setItem("filecont",x);
sessionStorage.setItem("FILENAME",hfile);
while(flag==0 && i>0)
{
//alert("scc");
if((x[i]=="'") && (x[i-1]=='=') && (x[i-2]=="t") && (x[i-3]=="n") && (x[i-4]=="u") && (x[i-5]=="o") && (x[i-6]=="c")) 
{
var j=2;

var vecarr=x[i+1];

while(x[i+j]!="'")
{
(vecarr)=(vecarr)+(x[i+j]);

j=j+1;
}

sessionStorage.setItem("count",vecarr);

flag=1;
}
else
{

}
i=i-1;
}  

return;
}

//for viewing previous
function prev(){

var pos=document.getElementById("pos");

if(pos.value>1){

pos.value=(parseInt(pos.value)-1);
go();
}
else
{
alert("No pages behind");
}

}

function next(){
var pos=document.getElementById("pos");
if((parseInt(pos.value)>=1)&& (parseInt(pos.value) < parseInt(sessionStorage.getItem("count")))){
pos.value=(parseInt(pos.value)+1);
go();
}
else
{
alert("no pages forward");
}


}
function save()
{;

var pos=document.getElementById("pos");
var x=document.getElementById("anoo1");
if(1)
{
if((parseInt(pos.value))<= parseInt(sessionStorage.getItem("count")))
{



var editcon=sessionStorage.getItem("filecont");

var found=editcon.search("count='"+pos.value);

var subedit='';
for(i=found-1;editcon[i]!='<';i--)
{
subedit=subedit+editcon[i];
}
subedit=subedit+"<";


subedit=subedit.split("").reverse().join("");

var subpostedit='';
for(i=found;editcon[i]!='<'&&editcon[i+1]!='/';i++)
{
subpostedit=subpostedit+editcon[i];
}
subpostedit=subpostedit+"</div>"
var finale=subedit+subpostedit;


 
var slidex=document.getElementById("slidex");
var slidey=document.getElementById("slidey");
var slidez=document.getElementById("slidez");
var rotx=document.getElementById("rotx");
var roty=document.getElementById("roty");
var rotz=document.getElementById("rotz");
var datascale=document.getElementById("datascale");
if(document.getElementById("slide").checked)
choice="step slide";
else choice="step";
var pos=document.getElementById("pos");
var content=document.getElementById("content")

var count=pos.value;
count=parseInt(count);

string="<div class='"+choice+"' data-x='"+slidex.value+"' data-y='"+slidey.value+"' data-z='"+slidez.value+"' data-rotate-x='"+rotx.value+"' data-rotate-y='"+roty.value+"' data-rotate-z='"+rotz.value+"' data-scale='"+datascale.value+"' count='"+count+"'>"+content.value+"</div>";

var filecontent=sessionStorage.getItem("filecont");
sessionStorage.setItem("filecont",filecontent.replace(finale,string));
alert("saved the edited presentationsa");
//alert(filecontent.replace(finale,string))
document.getElementById("anoo1").srcdoc=filecontent.replace(finale,string);



}
else
{
{
var slidex=document.getElementById("slidex");
var slidey=document.getElementById("slidey");
var slidez=document.getElementById("slidez");
var rotx=document.getElementById("rotx");
var roty=document.getElementById("roty");
var rotz=document.getElementById("rotz");
var datascale=document.getElementById("datascale");
if(document.getElementById("slide").checked)
choice="step slide";
else choice="step";
var content=document.getElementById("content")
var count=sessionStorage.getItem("count");
count=parseInt(count)
count=count+1;
string="<div class='"+choice+"' data-x='"+slidex.value+"' data-y='"+slidey.value+"' data-z='"+slidez.value+"' data-rotate-x='"+rotx.value+"' data-rotate-y='"+roty.value+"' data-rotate-z='"+rotz.value+"' data-scale='"+datascale.value+"' count='"+count+"'>"+content.value+"</div>";
sessionStorage.setItem("count",count);
var cont=sessionStorage.getItem("filecont");
var parta="";
var partt="";
for (i=0;i<cont.length;i++)
{
if(i<cont.length-245)
{parta=parta+cont[i];
}
else
partt=partt+cont[i];}
var final="";
final=parta+string+partt;
	sessionStorage.setItem("filecont",final);
        //alert(final)
        document.getElementById("anoo1").srcdoc=final;	
        alert("Saved new slide");
        pos.value=(parseInt(pos.value)+1);
        alert("New slide "+pos.value);






}
}

}

}
function submiti()
{
//alert("dtgd");
var final=sessionStorage.getItem("filecont");
cssstring="<style>"+cssstring+"</style>";
jstring="<script>"+jstring+"</script>";
final=final.replace("<link href='impress-demo.css' rel='stylesheet' />",cssstring);
final=final.replace("<script src='impress.js'></script>",jstring);
var blob = new Blob([final], {type: "text/plain;charset=utf-8"});
	var name=sessionStorage.getItem("FILENAME");
        var qname=name+".html";
        newwindow=window.open("https://docs.google.com/forms/d/1xkk_2WVpbDDaQ8D2qbJVF6cEgW1GOegu4P12HQyFYBE/viewform",'name');
	if (window.focus) {newwindow.focus()}  
	saveAs(blob,qname);






























}

function go()
{//alert(sessionStorage.getItem("count"));
var xd=document.getElementById("pos");
if(parseInt(xd.value) > parseInt(sessionStorage.getItem("count")))
{
alert("not exist");
}
else
{
flag=0;
var con=sessionStorage.getItem("filecont");
i=con.length;
while(flag==0 && i>0)
{

if((con[i]=="'") && (con[i-1]=='=') && (con[i-2]=="t") && (con[i-3]=="n") && (con[i-4]=="u") && (con[i-5]=="o") && (con[i-6]=="c")) 
{
var j=2;
var vecarr=con[i+1];
while(con[i+j]!="'")
{
(vecarr)=(vecarr)+(con[i+j]);
j=j+1;
}




if(vecarr==((document.getElementById("pos")).value))
{
var j;
for(j=i;con[j]!="<";j--)
{}
var k;
for(k=i;con[k]!="<";k++)
{}

var sub=con.slice(j,k);

var cool=sub.split("'");
     
(document.getElementById("slidex")).value=cool[3];
(document.getElementById("slidey")).value=cool[5];
(document.getElementById("slidez")).value=cool[7];
(document.getElementById("rotx")).value=cool[9];
(document.getElementById("roty")).value=cool[11];
(document.getElementById("rotz")).value=cool[13];
(document.getElementById("datascale")).value=cool[15];
(document.getElementById("pos")).value=cool[17];
var ne=cool[18];
var nee=ne.slice(1);
{
len=19;
while(cool.length!=len)
{

nee=nee+"'"+cool[len];

len++;

}
}

(document.getElementById("content")).value=nee;
flag=1;

}
else
{}
}
else
{}
i=i-1;
}  
}
}





