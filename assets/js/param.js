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
    }
}

const three = {
    cube: {
        size: 1,
        row: 4,
        gap: 4,
        rotation: 0.005,
        geo: {
            sphere: new THREE.SphereGeometry(12, 8, 8),
            circle: new THREE.CircleGeometry(12, 63),
            cone: new THREE.ConeGeometry(8, 15, 15, 4),
            icosahedron: new THREE.IcosahedronGeometry(12, 1),
            box: new THREE.BoxGeometry(15, 15, 15, 3, 3, 3),
            cylinder: new THREE.CylinderGeometry(8, 8, 16, 10, 5)
        }
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
            box: 0.125,
            helper: 0.6,
            time: 600,
            delay: 15,
            min: 1,
            max: 4
        }
    }
}