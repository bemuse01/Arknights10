new Vue({
    el: '#wrap',
    data(){
        return{
            arr: {
                opening: {
                    text: method.createOpeningText(param.opening),
                    index: method.createRandomIndex(param.opening)
                } 
            },
            show: {
                opening: true
            },
            play: {
                opening: true
            },
            delay: {
                opening: 1500
            }
        }
    },
    computed: {
    },
    watch: {
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.animate()
            this.pickText()

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




        onWindowResize(){
            param.util.width = window.innerWidth
            param.util.height = window.innerHeight
        },




        render(){
            if(this.play.opening) this.changeText()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})