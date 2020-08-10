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
    }
}