const method = {
    createOpeningText(param){
        let arr = []
        param.arr.forEach(e => {
            arr.push({
                id: arr.length,
                param: {
                    text: e,
                    play: true
                },
                style: {
                    opacity: '0.35'
                },
                display: e
            })
        })
        return arr
    },
    createLine(resized){
        let width =  param.util.width * param.main.back.line.size, height = param.util.height * param.main.back.line.size,
            size = param.util.height * param.main.back.line.square
            wLen = Math.round(width / size), hLen = Math.round(height / size)
            arr = [], len = wLen * hLen

        for(let i = 0; i < len; i++){
            let outline = 0, background = 0
            if(resized && Math.random() > tweens.line.chance) {
                outline = tweens.line.outline.light[tweens.line.outline.light.length - 1]
                background = tweens.line.background
            }else if(resized) {
                outline = 0.1
                background = 0
            }else {
                outline = 0
                background = 0
            }
            arr[i] = {
                id: i,
                param: {
                    len: wLen,
                    played: resized
                },
                style: {
                    background: `rgba(0, 252, 252, ${background})`,
                    outline: `1px solid rgba(0, 252, 252, ${outline})`
                }
            }
        }
        return arr
    },
    createCircleLogo(){
        let arr = []

        source.forEach(e => {
            arr.push({
                id: arr.length,
                param: {
                    rot: 0,
                    delay: param.main.circle.logo.delay.offset + arr.length * param.main.circle.logo.delay.step
                },
                show: false,
                style: e
            })
        })
        return arr
    },
    createCircleNumber(){
        let src = [
            {id: 'circle-number-one', class:'circle-number-element-one'}, 
            {id: 'circle-number-two', class:'circle-number-element-two'}
        ], arr = [], number = param.main.circle.number
        src.forEach((e, i) => {
            arr.push({
                key: arr.length,
                ids: e.id,
                classes: `circle-number-element ${e.class}`,
                arr: i === 0 ? this.createCircleNumberArray(number.one, 180) : this.createCircleNumberArray(number.two, 225),
                style: {
                    opacity: '0',
                    transition: 'none'
                }
            })
        })
        return arr
    },
    createCircleNumberArray(e, offset = 0){
        let arr = [], len = e.len
        
        for(let i = 0; i < len; i++){
            let length = Math.floor(Math.random() * 3 + 3), color = Math.random() * 0.2 + 0.4,
                dist = param.util.height * (e.dist / 1080), deg = param.main.circle.number.degree * i + offset,
                x = Math.cos(deg * param.util.radian) * dist, y = Math.sin(deg * param.util.radian) * dist

            arr[i] = {
                id: i,
                text: util.createRandomHexText(length),
                style: {
                    transform: `translate(${x}px, ${y}px) rotate(${90 + deg}deg)`,
                    color: `rgba(0, 252, 252, ${color})`
                }
            }
        }
        return arr
    },
    createCircleShape(p){
        let arr = [], len = 360 / 9, dist = param.util.height * ((p.dist + p.height) / 1080)

        for(let i = 0; i < len; i++){
            let deg = i * 9 - 90, x = Math.cos(deg * param.util.radian) * dist, y = Math.sin(deg * param.util.radian) * dist,
                delay = p.delay.offset + p.delay.step * i
            arr[i] = {
                id: i,
                style: {
                    opacity: '0',
                    transform: `translate(${x}px, ${y}px) rotate(${90 + deg}deg)`,
                    transition: `opacity 0.3s ${delay}s`
                }
            }
        }
        return arr
    },
    createEllipse(){
        let arr = []

        for(let i = 0; i < param.main.back.ellipse.len; i++){
            let top = Math.random() * (100 - param.main.back.ellipse.dist * 2) + param.main.back.ellipse.dist, 
                left = Math.random() * (100 - param.main.back.ellipse.dist * 2) + param.main.back.ellipse.dist,
                scale = Math.random() * (1 - param.main.back.ellipse.scale) + param.main.back.ellipse.scale
                
            arr[i] = {
                id: i,
                param: {
                    scale: scale
                },
                style: {
                    parent: {
                        top: `${top}%`,
                        left: `${left}%`
                    },
                    child: {
                        opacity: '0',
                        transition: 'none',
                        transform: `scale(${scale - 0.1})`,
                    }
                }
            }
        }
        return arr
    },
    createArrow(){
        let src = [
            {
                background: `url('assets/image/source/arrow_small.png') no-repeat center center / cover`,
                width: 'calc(100vh * 214 / 1080)',
                height: 'calc(100vh * 29 / 1080)'
            }, 
            {
                background: `url('assets/image/source/arrow_big.png') no-repeat center center / cover`,
                width: 'calc(100vh * 1322 / 1080)',
                height: 'calc(100vh * 50 / 1080)'
            }
        ], arr = []

        src.forEach(e => {
            arr.push({
                id: arr.length,
                show: false,
                style: e
            })
        })
        return arr
    },
    createBar(param){
        let arr = []

        for(let i = 0; i < param.len; i++){
            let width = Math.random() * param.width.max + param.width.min, height = Math.random() * param.height.max + param.height.min,
                top = Math.random() * 100, color = param.color[Math.floor(Math.random() * param.color.length)]
            arr[i] = {
                id: i,
                param: {
                    x: 600 + width / 2,
                },
                style: {
                    parent: {
                        top: `${top}%`,
                        width: `calc(100vh * ${width} / 1080)`,
                        height: `calc(100vh * ${height} / 1080)`
                    },
                    child: {
                        width: `calc(100vh * ${width} / 1080)`,
                        height: `calc(100vh * ${height} / 1080)`,
                        background: `rgb(${color})`,
                        opacity: `0`,
                        transform: `translate(calc(100vh * (600 + ${width / 2}) / -1080), 0px)`
                    }
                }
            }
        }
        return arr
    },
    createClock(){
        let arr = [], src = ['clock-element clock-hour', 'clock-element clock-min', 'clock-element clock-sec']
        
        src.forEach(e => {
            arr.push({
                id: arr.length,
                classes: e,
                arr: [
                    {id: 0, show: true, text: '59'},
                    {id: 1, show: false, text: ''}
                ]
            })
        })
        return arr
    }
}