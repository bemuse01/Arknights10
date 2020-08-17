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
    createLine(util){
        let width =  param.util.width * param.main.line.size, height = param.util.height * param.main.line.size,
            size = param.util.width * param.main.line.square
            wLen = Math.ceil(width / size), hLen = Math.ceil(height / size)
            arr = [], len = wLen * hLen
            
        for(let i = 0; i < len; i++){
            arr[i] = {
                id: i,
                style: {
                    background: 'rgba(0, 252, 252, 0)'
                }
            }
        }
        return arr
    }
}