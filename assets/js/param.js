const param = {
    util: {
        width: window.innerWidth,
        height: window.innerHeight,
        radian: Math.PI / 180,
        simplex: new SimplexNoise()
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
                scale: 0.2
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
        },
        bar: {
            len: 12,
            width: {
                min: 50,
                max: 100
            },
            height: {
                min: 2,
                max: 1
            },
            color: ['0, 252, 252', '255, 255, 255', '255, 130, 130']
        },
        command: {
            len: 5,
            deg: 6,
            offset: 25,
            dist: 412,
            num: {
                min: 5,
                max: 3
            },
            chance: 0.95
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
    },
    flow: {
        time: 600
    },
    bar: {
        time: {
            min: 1800,
            max: 1800
        },
        opacity: [0, 1, 1, 0.5, 0.25, 0]
    }
}

const three = {
    line: {
        right: {
            len: 3,
            seg: 128,
            size: 45,
            fre: 0.0004,
            boost: 0.75,
            smooth: 5,
            step: {
                time: 0.0001,
                pos: 5,
                opacity: 0.3
            }
            /* dist: 0 */ // 21.5 / 2 + 1.2
        }
    }
}

const names = {
    alpha: 'abcdefghijklmnopqrstuvwxy'.split(''),
    logo: ['Rhodes', 'Babel', 'Penguin', 'Lungmen', 'Ursus', 'Black', 'Kjerag', 'Reunion', 'Victoria', 'Rhine', 'Raythean', 'Billiton', 'Laterano', 'Kazimierz'],
    paths: ['program files', 'home', 'users', 'documents', 'untitled', 'local', 'host', 'lib', 'temp', 'tasks', 'system', 'windows'],
    character: ['doctor', 'closure', 'kaltsit', 'chen', 'amiya', 'texas', 'skadi', 'blaze', 'hoshiguma', 'saria', 'exusiai', 'blue', 'w', 'mostima', 'eyjafjalla', 'ceobe', 'shining', 'ptilopsis', 'nightingale', 'magallan', 'sora', 'emperor'],
    ex: ['dll', 'txt', 'docx', 'log', 'bin', 'ini', 'xml', 'json']
}

const word = {
    start: ['ls', 'cp', 'mkdir', 'rmdir', 'find', 'who', 'pwd', 'history'],
    ls: [...names.alpha.map(x => ` -${x}`), ...names.logo.map(x => ` /${x}`), ...names.paths.map(x => ` /${x}`)],
    cp: [...names.alpha.map(x => ` -${x}`), ...names.character.map(x => ` ${x}.${names.ex[Math.floor(Math.random() * names.ex.length)]}`), ...names.paths.map(x => ` /${x}`)],
    mkdir: [...names.alpha.map(x => ` -${x}`), ...names.paths.map(x => ` /${x}`)],
    rmdir: [...names.alpha.map(x => ` -${x}`), ...names.paths.map(x => ` /${x}`)],
    find: [...names.alpha.map(x => ` -${x}`), ...names.character.map(x => ` ${x}.${names.ex[Math.floor(Math.random() * names.ex.length)]}`)],
    who: [...names.alpha.map(x => ` -${x}`), ...names.character.map(x => ` ${x}`)],
    pwd: [...names.alpha.map(x => ` -${x}`)],
    history: [...names.alpha.map(x => ` -${x}`)]
}
