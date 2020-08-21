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
            size: 1.1,
            square: 0.1
        },
        circle: {
            logo: {
                delay: {
                    offset: 3500,
                    step: 200
                }
            },
            line: {
                dist: 73,
                height: 43,
                delay: {
                    offset: 3.8,
                    step: 0.015
                }
            },
            number: {
                hex: '0123456789ABCDEF',
                degree: 20,
                step: 0.3,
                one: {
                    len: 10,
                    dist: 165
                },
                two: {
                    len: 8,
                    dist: 177
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