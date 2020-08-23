const move = {
    onUpdateLineOutlineTween(e, start){
        e.style.outline = `1px solid rgba(0, 252, 252, ${start.outline})`
        e.style.background = `rgba(0, 252, 252, ${start.background})`
        e.param.played = true
    },
    onCompleteLineOutlineTween(){
        TWEEN.removeAll()
    },
    moveLine(group, pr, time){
        group.forEach((c, i) => {
            c.geometry.vertices.forEach(e => {
                let noise = param.util.simplex.noise2D(e.x / (pr.smooth + i * 5), time * (pr.fre + i * 0.0001))
                e.y = noise * pr.boost
            })
            c.geometry.verticesNeedUpdate = true
        })
    },
    onUpdateThreeLineOpacityTween(e, start){
        e.material.opacity = start.opacity
    },
    onCompleteThreeLineOpacityTween(){
        TWEEN.removeAll()
    },
    onUpdateBarTween(e, start){
        e.style.child.transform = `translate(calc(100vh * ${start.translate} / 1080), 0px)`
        e.style.child.opacity = `${start.opacity}`
    }
}