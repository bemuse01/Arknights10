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
        let width =  param.util.width * param.main.line.size, height = param.util.height * param.main.line.size,
            size = param.util.height * param.main.line.square
            wLen = Math.round(width / size), hLen = Math.round(height / size)
            arr = [], len = wLen * hLen

        for(let i = 0; i < len; i++){
            arr[i] = {
                id: i,
                param: {
                    len: wLen,
                    played: resized
                },
                style: {
                    background: 'rgba(0, 252, 252, 0)',
                    outline: `1px solid rgba(0, 252, 252, ${resized === true ? 0.1 : 0})`
                }
            }
        }
        return arr
    },
    createCircleLogo(){
        let src = [
            {
                width: 'calc(100vh * 40 / 1080)',
                height: 'calc(100vh * 40 / 1080)',
                background: `url('assets/image/source/logo.png') no-repeat center center / cover`
            },
            {
                width: 'calc(100vh * 114 / 1080)',
                height: 'calc(100vh * 114 / 1080)',
                background: `url('assets/image/source/logo-around-circle-1.png') no-repeat center center / cover`
            },
            {
                width: 'calc(100vh * 98 / 1080)',
                height: 'calc(100vh * 98 / 1080)',
                background: `url('assets/image/source/logo-around-circle-2.png') no-repeat center center / cover`,
                transform: 'rotate(0deg)'
            },
            {
                width: 'calc(100vh * 136 / 1080)',
                height: 'calc(100vh * 136 / 1080)',
                background: `url('assets/image/source/logo-around-circle-3.png') no-repeat center center / cover`,
                animation: 'rotation 30s linear infinite'
            }
        ], arr = []

        src.forEach(e => {
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
    createCircleLine(){
        let arr = [], len = 360 / 9, dist = param.util.height * ((param.main.circle.line.dist + param.main.circle.line.height) / 1080)

        for(let i = 0; i < len; i++){
            let deg = i * 9 - 90, x = Math.cos(deg * param.util.radian) * dist, y = Math.sin(deg * param.util.radian) * dist,
                delay = param.main.circle.line.delay.offset + param.main.circle.line.delay.step * i
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
                arr: i === 0 ? this.createCircleNumberArray(number.one) : this.createCircleNumberArray(number.two, 180),
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
            let length = Math.floor(Math.random() * 3 + 3), color = Math.random() * 0.4 + 0.1,
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
    }
}