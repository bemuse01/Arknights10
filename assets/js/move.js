const move = {
    onUpdateLineOutlineTween(e, start){
        e.style.outline = `1px solid rgba(0, 252, 252, ${start.outline})`
        e.param.played = true
    },
    onCompleteLineOutlineTween(){
        TWEEN.removeAll()
    }
}