new Vue({
    el: '#wrap',
    data(){
        return{
            arr: {
                opening: {
                    text: method.createOpeningText(param.opening),
                    index: method.createRandomIndex(param.opening),
                },
                main: {
                    leftWriter: method.createWriter(),
                    rightClock: method.createClock()
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
                /* sday: null,
                nday: 0,
                month: 0,
                year: 0 */
            },
            play: {
                opening: true,
                main: {
                    leftWriter: false
                }
            },
            delay: {
                opening: 1500,
                main: {
                    leftWriter: 2000,
                    canvas: {
                        line: 2000,
                        cube: 500
                    }
                }
            },
            three: {
                renderer: null,
                scene: null,
                camera: null,
                group: {
                    cube: null,
                    line: null
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
            },
            util: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    },
    computed: {
        leftWriterStyle(){
            let width = this.util.width * param.main.leftWriter.width
                height = this.util.height * param.main.leftWriter.height
            return {width: `${width}px`, height: `${height}px`}
        },
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
        },

    },
    watch: {
        watchSecond(){
            this.changeOrder(this.arr.main.leftWriter)
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.initThree()
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
            this.playWriter()
            this.createTweens()
        },




        /* main canvas */
        initThree(){
            let canvas = document.getElementById('main-canvas')
            object.init(canvas, this.three)

            this.createObjects()
            this.transformGroup()
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
        transformGroup(){
            let x = 18, y = 14, z = 0
            this.three.group.line.rotation.set(x * param.util.radian, y * param.util.radian, z * param.util.radian)
        },
        createObjects(){
            object.createHorizonLines(this.three)
            object.createVerticalLines(this.three)
            util.setObjectPositionByParam(this.three, three.cube)
            object.createCube(this.three, three.cube)
        },
        playMoves(){
            move.moveCube(this.three.group.cube, three.cube)
        },
        createTweens(){
            tween.createLineTween(this.three, tweens, this.delay.main.canvas)
            // tween.createCubeTween(this.three, tweens.cube, this.delay.main.canvas.cube)
        },




        /* main left writer */
        resizeWriter(arr){
            let currentLen = arr.length,
                height = param.util.height * param.main.leftWriter.height,
                len = Math.floor(height / param.main.leftWriter.text.height)
            
            if(currentLen === len) return
            else if(currentLen > len) for(let i = 0; i < currentLen - len; i++) arr.pop()
            else{
                for(let i = 0; i < len - currentLen; i++){
                    let opacity = Math.random() * param.main.leftWriter.opacity + param.main.leftWriter.opacity
                    arr.push({
                        id: arr.length,
                        text: '',
                        sen: util.createRandomCommand(),
                        style: {
                            opacity: opacity
                        }
                    })
                }
            }
        },
        typeWriter(arr){
            arr.forEach(e => {
                let chance = Math.random()
                if(chance > 0.9875 && e.sen.length === 0) this.createSentence(e)
                this.typeCharacter(e)
            })
        },
        typeCharacter(e){
            let temp = e.sen.pop()
            if(temp === undefined) return
            e.text += temp
        },
        createSentence(e){
            e.text = ''
            e.style.opacity = Math.random() * param.main.leftWriter.opacity + param.main.leftWriter.opacity
            e.sen = util.createRandomCommand()
        },
        changeOrder(arr){
            let index = Math.floor(Math.random() * arr.length),
                item = arr[index]

            arr.splice(index, 1)

            arr.unshift(item)
        },
        playWriter(){
            setTimeout(() => {this.play.main.leftWriter = true}, this.delay.main.leftWriter)
        },
        



        onWindowResize(){
            param.util.width = window.innerWidth
            param.util.height = window.innerHeight
            this.util.width = window.innerWidth
            this.util.height = window.innerHeight
            param.main.leftWriter.text.len = Math.round((param.util.width * param.main.leftWriter.width) * (1 / 100))

            this.resizeThree()
            this.resizeWriter(this.arr.main.leftWriter)
        },
        currentTime(){
            let date = new Date()
            this.time.ms = date.getMilliseconds()
            this.time.sec = date.getSeconds()
            this.time.min = date.getMinutes()
            this.time.hour = date.getHours()
           /*  this.time.sday = date.getDay()
            this.time.nday = date.getDate()
            this.time.month = date.getMonth()
            this.time.year = date.getFullYear()

            setTimeout(this.currentTime, 1000) */
        },




        render(){
            this.currentTime()
            if(this.play.opening) this.changeText()
            this.renderThree()
            TWEEN.update()
            if(this.play.main.leftWriter) this.typeWriter(this.arr.main.leftWriter)
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})