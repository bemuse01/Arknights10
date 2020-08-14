new Vue({
    el: '#wrap',
    data(){
        return{
            arr: {
                opening: {
                    text: method.createOpeningText(param.opening),
                    index: method.createRandomIndex(param.opening)
                },
                main: {
                    clock: method.createClockPointsArray()
                }
            },
            show: {
                opening: true,
                main: {
                    topClock: false,
                    leftClock: false
                }
            },
            time: {
                sec: 0,
                min: 0,
                hour: 0,
                sday: null,
                nday: 0,
                month: 0,
                year: 0
            },
            play: {
                opening: true
            },
            delay: {
                opening: 1500,
                main: {
                    topClock: 2500,
                    leftClock: 3000,
                    canvas: 3500
                }
            },
            three: {
                renderer: null,
                scene: null,
                camera: null,
                group: {
                    cube: null
                },
                pos: {
                    cube: util.setCubePositionByParam(three.cube),
                    sphere: null,
                    circle: null,
                    cone: null,
                    icosahedron: null,
                    box: null,
                    cylinder: null
                }
            }
        }
    },
    computed: {
        topClockDecimal(){
            let sec = util.expandDecTime(this.time.sec, 10, 1),
                min = util.expandDecTime(this.time.min, 10, 1),
                hour = util.expandDecTime(this.time.hour, 10, 1)
            return `${hour}:${min}:${sec}` 
        },
        topClockBinary(){
            let sec = util.expandBinTime(this.time.sec.toString(2), this.time.sec.toString(2).length),
                min = util.expandBinTime(this.time.min.toString(2), this.time.min.toString(2).length),
                hour = util.expandBinTime(this.time.hour.toString(2), this.time.hour.toString(2).length)
            return `${hour}:${min}:${sec}`
        },
        topCalendar(){
            let arr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                mon = util.expandDecTime(this.time.month + 1, 10, 1),
                nday = util.expandDecTime(this.time.nday, 10, 1)
            return `${arr[this.time.sday]}, ${this.time.year}.${mon}.${nday}`
        },
        moveSecondHand(){
            let deg = 360 / 60, rotate = deg * this.time.sec
            return {transform: `rotate(${rotate}deg)`}
        },
        moveMinuteHand(){
            let deg = 360 / 60, rotate = deg * this.time.min
            return {transform: `rotate(${rotate}deg)`}
        },
        moveHourHand(){
            let deg = 360 / 24, rotate = deg * this.time.hour
            return {transform: `rotate(${rotate}deg)`}
        },
        watchSecond(){
            return this.time.sec
        }
    },
    watch: {
        watchSecond(){
            this.arr.main.clock.forEach((e, i) => {
                util.watchTime(e.arr, i === 0 ? this.time.sec : i === 1 ? this.time.min : this.time.hour)
            })
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.initThree()
            this.pickText()
            this.currentTime()
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
            this.openTopClock()
            this.openLeftClock()
            this.createTweens()
        },




        /* main canvas */
        initThree(){
            let canvas = document.getElementById('main-canvas')
            object.init(canvas, this.three)

            this.createObjects()
        },
        renderThree(){
            this.playMoves()

            this.three.camera.lookAt(this.three.scene.position)
            this.three.renderer.render(this.three.scene, this.three.camera)
        },
        resizeThree(){
            this.three.camera.aspect = param.util.width / param.util.height
            this.three.camera.updateProjectionMatrix()

            this.three.renderer.setSize(param.util.width, param.util.height)
        },
        createObjects(){
            util.setObjectPositionByParam(this.three, three.cube)
            object.createCube(this.three, three.cube)
        },
        playMoves(){
            move.moveCube(this.three.group.cube, three.cube)
        },
        createTweens(){
            tween.createCubeTween(this.three, tweens.cube, this.delay.main.canvas)
        },




        /* main top clock */
        openTopClock(){
            setTimeout(() => {this.show.main.topClock = true}, this.delay.main.topClock)
        },
        /* main left clock */
        openLeftClock(){
            setTimeout(() => {this.show.main.leftClock = true}, this.delay.main.leftClock)
        },

        


        onWindowResize(){
            param.util.width = window.innerWidth
            param.util.height = window.innerHeight

            this.resizeThree()
        },
        currentTime(){
            let date = new Date()
            this.time.sec = date.getSeconds()
            this.time.min = date.getMinutes()
            this.time.hour = date.getHours()
            this.time.sday = date.getDay()
            this.time.nday = date.getDate()
            this.time.month = date.getMonth()
            this.time.year = date.getFullYear()

            setTimeout(this.currentTime, 1000)
        },




        render(){
            if(this.play.opening) this.changeText()
            this.renderThree()
            TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})