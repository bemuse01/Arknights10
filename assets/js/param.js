const param = {
    util: {
        width: window.innerWidth,
        height: window.innerHeight,
        radian: Math.PI / 180
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
        },
        circle: {
            logo: {
                delay: {
                    offset: 3500,
                    step: 300
                }
            },
            line: {
                dist: 73,
                height: 43,
                delay: {
                    offset: 3.8,
                    step: 0.01
                }
            }
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