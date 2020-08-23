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
        back: {
            line: {
                size: 1.1,
                square: 0.1
            },
            ellipse: {
                len: 20,
                size: 70,
                dist: 0,
                step: 0.03,
                scale: 0.25
            }
        },
        circle: {
            logo: {
                delay: {
                    offset: 3500,
                    step: 150
                }
            },
            line: {
                dist: 73,
                height: 86 / 2,
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
            },
            shape: {
                dist: 257,
                height: 49 / 2,
                delay: {
                    offset: 4.2,
                    step: 0.015
                }
            }
        },
        arrow: {
            offset: 4000,
            step: 300
        }
    }
}

const tweens = {
    line: {
        time: 1200,
        delay: 45,
        chance: 0.85,
        background: 0.025,
        outline: {
            dark: [0, 0.3, 0.6, 0.3, 0.1],
            light: [0, 0.3, 0.6, 0.3, 0.3]
        }
    }
}