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
                    leftWriter: method.createWriter()
                }
            },
            show: {
                opening: true,
                main: {
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
                    canvas: 2000
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
            },
            util: {
                height: window.innerHeight
            }
        }
    },
    computed: {
        leftWriterStyle(){
            let height = this.util.height * param.main.leftWriter.height
            return {height: `${height}px`}
        }
    },
    watch: {
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




        /* main left writer */
        resizeWriter(arr){
            let currentLen = arr.length,
                height = param.util.height * param.main.leftWriter.height,
                len = Math.floor(height / param.main.leftWriter.text.height)

            
            if(currentLen === len) return
            else if(currentLen > len) for(let i = 0; i < currentLen - len; i++) arr.pop()
            else{
                for(let i = 0; i < len - currentLen; i++){
                    let sen = word.start[Math.floor(Math.random() * word.start.length)], temp = sen, length = Math.floor(Math.random() * 5 + 5)
                    for(let i = 0; i < length; i++) temp += word[sen][Math.floor(Math.random() * word[sen].length)]
                    arr.push({
                        id: arr.length,
                        text: '$ ',
                        sen: temp.split('').reverse()
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
            e.text = '$ '
            let sen = word.start[Math.floor(Math.random() * word.start.length)], temp = sen, len = Math.floor(Math.random() * 5 + 5)
            for(let i = 0; i < len; i++) temp += word[sen][Math.floor(Math.random() * word[sen].length)]
            e.sen = temp.split('').reverse()
        },
        



        onWindowResize(){
            param.util.width = window.innerWidth
            param.util.height = window.innerHeight
            this.util.height = window.innerHeight

            this.resizeThree()
            this.resizeWriter(this.arr.main.leftWriter)
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
            this.typeWriter(this.arr.main.leftWriter)
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})