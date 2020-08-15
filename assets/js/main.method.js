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
    createWriter(){
        let height = param.util.height * param.main.leftWriter.height
        let len = Math.floor(height / param.main.leftWriter.text.height)
        let arr = []
        for(let i = 0; i < len; i++){
            let temp = util.createRandomCommand(), opacity = Math.random() * param.main.leftWriter.opacity + param.main.leftWriter.opacity
            arr[i] = {
                id: i,
                text: '$ ',
                sen: temp,
                style: {
                    opacity: opacity
                }
            }
        }
        return arr
    }
}