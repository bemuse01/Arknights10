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
                    line: method.createLine(false)
                }
            },
            style: {
                circle: {opacity: '0'}
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
                opening: true,
                main: {
                }
            },
            delay: {
                opening: 1500,
                main: {
                    line: 2000,
                    circle: 3000
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
    },
    watch: {
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
        openCircle(){
            setTimeout(() => {this.style.circle.opacity = '0.5'}, this.delay.main.circle)
        },




        onWindowResize(){
            this.util.width = window.innerWidth
            this.util.height = window.innerHeight
            param.util.width = window.innerWidth
            param.util.height = window.innerHeight

            this.resizeLine()
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