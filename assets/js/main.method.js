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
    }
}