const tween = {
    createLineTween(arr, tweens, delay){
        this.addLineOutlineTween(arr, tweens, delay)
    },
    addLineOutlineTween(arr, tweens, delay){
        arr.forEach((e, i) => {
            let chance = Math.random() < tweens.line.chance
            let start = {outline: 0, background: 0}, 
                end = {
                    outline: chance ? tweens.line.outline.dark : tweens.line.outline.light, 
                    background: chance ? 0 : tweens.line.background
                }

            let tw = new TWEEN.Tween(start)
                .to(end, tweens.line.time)
                .onUpdate(() => {move.onUpdateLineOutlineTween(e, start)})
                .onComplete(() => {if(i === arr.length - 1) move.onCompleteLineOutlineTween()})
                .delay(delay.line + tweens.line.delay * Math.floor(i / e.param.len))
                .start()
        })
    }
}