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
                    line: method.createLine()
                }
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
        },




        /* main line */
        resizeLine(){
            this.arr.main.line.length = 0

            let width =  this.util.width * param.main.line.size, height = this.util.height * param.main.line.size,
                size = this.util.width * param.main.line.square,
                wLen = Math.ceil(width / size), hLen = Math.ceil(height / size),
                arr = [], len = wLen * hLen
       
            for(let i = 0; i < len; i++){
                arr[i] ={
                    id: this.arr.main.line.length,
                    style: {
                        background: 'rgba(0, 252, 252, 0)'
                    }
                }
            }
            this.arr.main.line = arr
        },




        onWindowResize(){
            this.util.width = window.innerWidth
            this.util.height = window.innerHeight

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
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})