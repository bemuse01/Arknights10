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
        leftWriter: {
            width: 0.34,
            height: 0.75,
            opacity: 0.5,
            text: {
                width: 8.4,
                height: 26,
                len: Math.round((window.innerWidth * 0.3) * (1 / 100))
            },
        },
        right: {
        }
    }
}

const three = {
    cube: {
        size: 1,
        row: 4,
        gap: 4,
        rotation: 0.005,
        scale: 1,
        geo: {
            sphere: new THREE.SphereGeometry(12, 8, 8),
            circle: new THREE.CircleGeometry(12, 63),
            cone: new THREE.ConeGeometry(9, 16, 15, 4),
            icosahedron: new THREE.IcosahedronGeometry(12, 1),
            box: new THREE.BoxGeometry(16, 16, 16, 3, 3, 3),
            cylinder: new THREE.CylinderGeometry(8, 8, 18, 10, 5)
        }
    },
    line: {
        size: 2,
        seg: 36
    }
}

const tweens = {
    cube: {
        tsl: {
            start: [],
            end: [],
            time: 1500,
            delay: 1000,
            chanceArray: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6].map(x => {
                if(x === 0) return 'cube'
                else if(x === 1) return 'sphere'
                else if(x === 2) return 'circle'
                else if(x === 3) return 'cone'
                else if(x === 4) return 'icosahedron'
                else if(x === 5) return 'box'
                else return 'cylinder'
            })
        },
        opa: {
            box: 0.15,
            helper: 0.75,
            time: 600,
            delay: 15,
            min: 1,
            max: 3
        }
    },
    line: {
        time: 1200,
        delay: 50,
        opacity: [0, 0.3, 0.6, 0.3, 0.15]
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

