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
                    back: {
                        line: method.createLine(false),
                        ellipse: method.createEllipse()
                    },
                    circle: {
                        logo: method.createCircleLogo(),
                        line: method.createCircleShape(param.main.circle.line),
                        number: method.createCircleNumber(),
                        shape: method.createCircleShape(param.main.circle.shape)
                    },
                    arrow: method.createArrow(),
                    bar: {
                        top: method.createBar(param.main.bar),
                        bottom: method.createBar(param.main.bar)
                    },
                    clock: method.createClock()
                }
            },
            style: {
                point: {opacity: '0'},
                bar: {opacity: '0'},
                clock: {opacity: '0'}
            },
            show: {
                opening: true
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
                    point: 3000,
                    ellipse: 3.5,
                    clock: 500
                }
            },
            util: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            three: {
                renderer: null,
                scene: null,
                camera: null,
                group: null
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
        watchHour(){
            return this.time.hour
        },
        watchMin(){
            return this.time.min
        },
        watchSecond(){
            return this.time.sec
        }
    },
    watch: {
        watchHour(){
            this.slideTime(this.arr.main.clock[0].arr, this.time.hour)
        },
        watchMin(){
            this.slideTime(this.arr.main.clock[1].arr, this.time.min)
        },
        watchSecond(){
            this.rotateCircleLogo()
            this.slideTime(this.arr.main.clock[2].arr, this.time.sec)
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.pickText()
            this.threeInit()
            this.initTime()
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
            this.openBack()
            this.openCircle()
            this.openArrow()
            this.openBar()
            this.openClock()
        },




        /* tween */
        createTweens(){
            let delay = this.arr.main.circle.logo.length * param.main.circle.logo.delay.step + param.main.circle.logo.delay.offset

            tween.createLineTween(this.arr.main.back.line, tweens, this.delay.main)
            tween.createThreeLineTween(this.three.group.line.right.children, tweens, delay)
            tween.createBarTween(this.arr.main.bar.top, tweens)
            tween.createBarTween(this.arr.main.bar.bottom, tweens)
        },




        /* main back */
        openBack(){
            this.openPoint()
            this.openEllipse()
        },
        resizeLine(){
            let resized = this.arr.main.back.line[this.arr.main.back.line.length - 1].param.played
            this.arr.main.back.line.length = 0
            this.arr.main.back.line = method.createLine(resized)
        },
        openPoint(){
            setTimeout(() => {this.style.point.opacity = '0.6'}, this.delay.main.point)
        },
        openEllipse(){
            let step = param.main.back.ellipse.step
            this.arr.main.back.ellipse.forEach((e, i) => {
                e.style.child.transition = `opacity 0.3s ${this.delay.main.ellipse + step * i}s, transform 0.3s ${this.delay.main.ellipse + step * i}s`
                e.style.child.opacity = '1'
                e.style.child.transform = `scale(${e.param.scale})`
            })
        },




        /* main circle */
        openCircle(){
            this.openCircleLogo()
            this.openCircleShape(this.arr.main.circle.line)
            this.openCircleNumber()
            this.openCircleShape(this.arr.main.circle.shape)
        },
        resizeCircle(){
            this.resizeCircleShape(this.arr.main.circle.line, param.main.circle.line)
            this.resizeCircleNumber()
            this.resizeCircleShape(this.arr.main.circle.shape, param.main.circle.shape)
        },
        /* main circle logo */
        openCircleLogo(){
            this.arr.main.circle.logo.forEach((e, i) => {
                setTimeout(() => {e.show = true}, e.param.delay)
            })
        },
        rotateCircleLogo(){
            let e = this.arr.main.circle.logo[2]
            e.param.rot = (e.param.rot + 5) % 360
            e.style.transform = `rotate(${e.param.rot}deg)`
        },
        /* main circle number */
        resizeCircleNumber(){
            let num = param.main.circle.number

            this.arr.main.circle.number.forEach((n, j) => {
                n.arr.forEach((e, i) => {
                    let dist = param.util.height * ((j === 0 ? num.one.dist : num.two.dist) / 1080), 
                        deg = num.degree * i + (j === 0 ? 180 : 225),
                        x = Math.cos(deg * param.util.radian) * dist, y = Math.sin(deg * param.util.radian) * dist

                    e.style.transform = `translate(${x}px, ${y}px) rotate(${90 + deg}deg)`
                })
            })
        },
        openCircleNumber(){
            let offset = this.arr.main.circle.logo[this.arr.main.circle.logo.length - 1].param.delay / 1000
            this.arr.main.circle.number.forEach((e, i) => {
                e.style.transition = `opacity 0.3s ${offset + param.main.circle.number.step}s`
                e.style.opacity = '1'
            })
        },
        /* main circle line & main circle shape */
        resizeCircleShape(arr, p){
            let dist = param.util.height * ((p.dist + p.height) / 1080)
            arr.forEach((e, i) => {
                let deg = i * 9 - 90, x = Math.cos(deg * param.util.radian) * dist, y = Math.sin(deg * param.util.radian) * dist
                e.style.transform = `translate(${x}px, ${y}px) rotate(${90 + deg}deg)`
            })
        },
        openCircleShape(arr){
            arr.forEach((e, i) => {
                e.style.opacity = '1'
            })
        },




        /* main arrow */
        openArrow(){
            this.arr.main.arrow.forEach((e, i) => {
                setTimeout(() => {e.show = true}, param.main.arrow.offset + param.main.arrow.step * i)
            })
        },




        /* main canvas */
        threeInit(){
            let canvas = document.getElementById('canvas')
            
            object.init(canvas, this.three)
            this.createObjects()
            this.transformObject()
        },
        threeRender(){
            this.moveObjects()

            this.three.camera.lookAt(this.three.scene.position)
            this.three.renderer.render(this.three.scene, this.three.camera)
        },
        threeResize(){
            this.three.camera.aspect = this.util.width / this.util.height
            this.three.camera.updateProjectionMatrix()

            this.three.renderer.setSize(this.util.width, this.util.height)
        },
        createObjects(){
            object.createLine(this.three, this.three.group.line.right, three.line.right)
        },
        moveObjects(){
            let time = window.performance.now()
            move.moveLine(this.three.group.line.right.children, three.line.right, time)
        },
        transformObject(){
        },



        /* main bar */
        openBar(){
            let delay = this.arr.main.circle.logo.length * param.main.circle.logo.delay.step + param.main.circle.logo.delay.offset
            
            setTimeout(() => {this.style.bar.opacity = '1'}, delay)
        },




        /* main clock */
        openClock(){
            let delay = this.arr.main.circle.logo.length * param.main.circle.logo.delay.step + param.main.circle.logo.delay.offset + this.delay.main.clock

            setTimeout(() => {this.style.clock.opacity = '1'}, delay)
        },
        slideTime(arr, time){
            let item = arr.shift()
            item.show = false
            arr.push(item)
            arr[0].text = time
            arr[0].show = true
        },
        initTime(){
            this.arr.main.clock.forEach((e, i) => {
                e.arr[0].text = i === 0 ? this.time.hour : i === 1 ? this.time.min : this.time.sec
            })
        },



        onWindowResize(){
            this.util.width = window.innerWidth
            this.util.height = window.innerHeight
            param.util.width = window.innerWidth
            param.util.height = window.innerHeight

            this.resizeLine()
            this.resizeCircle()
            this.threeResize()
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
            this.threeRender()
            TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})