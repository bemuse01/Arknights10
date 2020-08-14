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
    createRandomIndex(param){
        let arr = []
        for(let i = 0; i < param.arr.length; i++) arr[i] = i
        return util.shuffle(arr)
    },
    createClockPointsArray(){
        let temp = []
        let arr = ['clock-points points-second', 'clock-points points-minute', 'clock-points points-hour']

        arr.forEach((e, i) => {
            temp.push({
                id: i,
                class: e,
                arr: i === 0 ? this.createClockPoints(60, 'sec') : i === 1 ? this.createClockPoints(60, 'min') : this.createClockPoints(24, 'hour')
            })
        })
        return temp
    },
    createClockPoints(length, time){
        let arr = [], clock

        if(time === "sec") clock = param.main.clock.sec
        else if(time === "min") clock = param.main.clock.min
        else clock = param.main.clock.hour

        let deg = 360 / length, offset = 90, dist = param.main.clock.height * clock

        for(let i = 0; i < length; i++) {
            let x = Math.cos((deg * i - offset) * param.util.radian) * dist, y = Math.sin((deg * i - offset) * param.util.radian) * dist
            arr[i] = {
                id: i,
                text: i,
                show: true,
                offset: {
                    translate: {x: x, y: y}
                },
                tran: {
                    translate: {x: x, y: y}
                }
            }
        }
        return arr
    }
}