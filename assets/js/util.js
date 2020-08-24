const util = {
    timeout(callback, startTime, delay){
        let currentTime = window.performance.now()
        if(currentTime - startTime >= delay) callback()
    },
    shuffle(arr){
        let temp = [...arr]
        for (let i = temp.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1))
            let t = temp[i]
            temp[i] = temp[j]
            temp[j] = t
        }
        return temp
    },
    createRandomIndex(param){
        let arr = []
        for(let i = 0; i < param.arr.length; i++) arr[i] = i
        return util.shuffle(arr)
    },
    createRandomHexText(r){
        let str = '', hex = param.main.circle.number.hex
        for(let i = 0; i < r; i++) str += hex[Math.floor(Math.random() * hex.length)]
        return str
    },
    createRandomCommand(){
        let sen = word.start[Math.floor(Math.random() * word.start.length)], 
            temp = sen, 
            len = Math.floor(Math.random() * param.main.command.num.max + param.main.command.num.min)
        for(let i = 0; i < len; i++) temp += word[sen][Math.floor(Math.random() * word[sen].length)]
        return `. ${temp}`.split('').reverse()
    }
}