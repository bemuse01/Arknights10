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
                // .onComplete(() => {if(i === arr.length - 1) move.onCompleteLineOutlineTween()})
                .delay(delay.line + tweens.line.delay * Math.floor(i / e.param.len))
                .start()
        })
    },
    createThreeLineTween(group, tweens, delay){
        this.addThreeLineOpacityTween(group, tweens, delay)
    },
    addThreeLineOpacityTween(group, tweens, delay){
        group.forEach((e, i) => {
            let start = {opacity: 0}, end = {opacity: 0.4 + i * three.line.right.step.opacity}

            let tw = new TWEEN.Tween(start)
                .to(end, tweens.flow.time)
                .onUpdate(() => {move.onUpdateThreeLineOpacityTween(e, start)})
                // .onComplete(() => {if(i === group.length - 1) move.onCompleteThreeLineOpacityTween()})
                .delay(delay)
                .start()
        })
    },
    createBarTween(arr, tweens){
        this.addBarTranslateTween(arr, tweens)
    },
    addBarTranslateTween(arr, tweens){
        arr.forEach(e => {
            let start = {translate: -e.param.x, opacity: 0}, 
            end = {
                translate: e.param.x,
                opacity: [0, e.param.opacity, e.param.opacity / 2, e.param.opacity / 4, 0]
            }, 
            time = Math.floor(Math.random() * tweens.bar.time.max + tweens.bar.time.min)

            let tw = new TWEEN.Tween(start)
                .to(end, time)
                .onUpdate(() => {move.onUpdateBarTween(e, start)})
                .repeat(Infinity)
                .start()
        })
    }
}