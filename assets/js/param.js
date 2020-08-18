const param = {
    util: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    opening: {
        arr: 'ARKNIGHTS'.split(''),
        change: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        chance: 0.5,
        delay: {
            offset: 1500,
            step: 200,
        }
    },
    main: {
        line: {
            size: 1.3,
            square: 0.1
        }
    }
}

const tweens = {
    line: {
        time: 1200,
        delay: 45,
        arr: [0, 0.3, 0.6, 0.3, 0.1]
    }
}