const tween = {
    createLineTween(arr, tweens, delay){
        this.addLineOutlineTween(arr, tweens, delay)
    },
    addLineOutlineTween(arr, tweens, delay){
        arr.forEach((e, i) => {
            let start = {outline: 0}, end = {outline: tweens.line.arr}

            let tw = new TWEEN.Tween(start)
                .to(end, tweens.line.time)
                .onUpdate(() => {move.onUpdateLineOutlineTween(e, start)})
                .onComplete(() => {if(i === arr.length - 1) move.onCompleteLineOutlineTween()})
                .delay(delay.line + tweens.line.delay * Math.floor(i / e.param.len))
                .start()
        })
    }
}