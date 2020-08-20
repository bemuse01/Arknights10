new Vue({
    el: '#wrap',
    data(){
        return{
            arr: {
                opening: {
                    text: method.createOpeningText(param.opening),
                    index: util.createRandomIndex(param.opening),
                },
                main: {
                    line: method.createLine(false),
                    circle: {
                        logo: method.createCircleLogo(),
                        line: method.createCircleLine()
                    }
                }
            },
            style: {
                point: {opacity: '0'}
            },
            show: {
                opening: true,
                main: {
                }
            },
            time: {
                ms: 0,
                sec: 0,
                min: 0,
                hour: 0,
            },
            play: {
                opening: true
            },
            delay: {
                opening: 1500,
                main: {
                    line: 2000,
                    point: 3000
                }
            },
            util: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    },
    computed: {
        computedMs(){
            return this.time.ms < 10 ? '00' + this.time.ms : this.time.ms < 100 ? '0' + this.time.ms : this.time.ms
        },
        computedSec(){
            return this.time.sec < 10 ? '0' + this.time.sec : this.time.sec
        },
        computedMin(){
            return this.time.min < 10 ? '0' + this.time.min : this.time.min
        },
        computedHour(){
            return this.time.hour < 10 ? '0' + this.time.hour : this.time.hour
        },
        computedClock(){
            return `${this.computedHour}:${this.computedMin}:${this.computedSec}.${(this.computedMs + '')[0]}`
        },
        watchSecond(){
            return this.time.sec
        }
    },
    watch: {
        watchSecond(){
            this.rotateCircleLogo()
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.pickText()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },




        /* opening */
        changeText(){
            this.arr.opening.index.forEach((e, i) => {
                let index = Math.floor(Math.random() * param.opening.change.length),
                    chance = Math.random() > param.opening.chance,
                    el = this.arr.opening.text[e]
                
                if(el.param.play && chance) el.display = param.opening.change[index]
                if(i === this.arr.opening.index.length - 1 && el.param.play === false) this.executeAfterOpening()
            })
        },
        stopChangingText(){
            this.play.opening = false
        },
        pickText(){
            this.arr.opening.index.forEach((e, i) => {
                let el = this.arr.opening.text[e]
                setTimeout(() => {
                    el.param.play = false
                    el.display = el.param.text
                    el.style.opacity = '1'
                }, param.opening.delay.offset + param.opening.delay.step * i)
            })
        },
        closeText(){
            setTimeout(() => {this.show.opening = false}, this.delay.opening)
        },
        executeAfterOpening(){
            this.stopChangingText()
            this.closeText()
            this.createTweens()
            this.openPoint()
            this.openCircle()
        },




        /* tween */
        createTweens(){
            tween.createLineTween(this.arr.main.line, tweens, this.delay.main)
        },




        /* main line */
        resizeLine(){
            let resized = this.arr.main.line[this.arr.main.line.length - 1].param.played
            this.arr.main.line.length = 0
            this.arr.main.line = method.createLine(resized)
        },
        openPoint(){
            setTimeout(() => {this.style.point.opacity = '0.6'}, this.delay.main.point)
        },




        /* main circle */
        openCircle(){
            this.openCircleLogo()
            this.openCircleLine()
        },
        openCircleLogo(){
            this.arr.main.circle.logo.forEach((e, i) => {
                setTimeout(() => {e.show = true}, e.param.delay)
            })
        },
        rotateCircleLogo(){
            let e = this.arr.main.circle.logo[this.arr.main.circle.logo.length - 2]
            e.param.rot = (e.param.rot + 5) % 360
            e.style.transform = `rotate(${e.param.rot}deg)`
        },
        resizeCircleLine(){
            let dist = param.util.height * ((param.main.circle.line.dist + param.main.circle.line.height) / 1080)
            this.arr.main.circle.line.forEach((e, i) => {
                let deg = i * 9 - 90, x = Math.cos(deg * param.util.radian) * dist, y = Math.sin(deg * param.util.radian) * dist
                e.style.transform = `translate(${x}px, ${y}px) rotate(${90 + deg}deg)`
            })
        },
        openCircleLine(){
            this.arr.main.circle.line.forEach((e, i) => {
                e.style.opacity = '1'
            })
        },




        onWindowResize(){
            this.util.width = window.innerWidth
            this.util.height = window.innerHeight
            param.util.width = window.innerWidth
            param.util.height = window.innerHeight

            this.resizeLine()
            this.resizeCircleLine()
        },
        currentTime(){
            let date = new Date()
            this.time.ms = date.getMilliseconds()
            this.time.sec = date.getSeconds()
            this.time.min = date.getMinutes()
            this.time.hour = date.getHours()
        },




        render(){
            this.currentTime()
            if(this.play.opening) this.changeText()
            TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})