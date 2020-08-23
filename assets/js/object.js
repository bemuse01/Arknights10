const object = {
    init(canvas, three){
        three.scene = new THREE.Scene()
    
        three.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
        three.renderer.setSize(param.util.width, param.util.height)
        three.renderer.setClearColor(0x000000)
        three.renderer.setClearAlpha(0.0)

        three.camera = new THREE.PerspectiveCamera(45, param.util.width / param.util.height, 1, 1000)
        three.camera.position.z = 50
        three.scene.add(three.camera)

        three.group = {
            line: {
                right: new THREE.Group()
            }
        }
    },
    createLine(three, group, param){
        let vertices = new THREE.PlaneGeometry(param.size, 1, param.seg, 1).vertices
        
        for(let i = 0; i < param.len; i++){
            let geometry = new THREE.Geometry()
            let material = new THREE.LineBasicMaterial({
                color: 0x00fcfc,
                transparent: true,
                opacity: 0// 0.4 + i * param.step.opacity
            })

            for(let i = 0; i < vertices.length / 2; i++) geometry.vertices.push(new THREE.Vector3(vertices[i].x, 0, 0))
            
            let mesh = new THREE.Line(geometry, material)
            group.add(mesh)
        }
        three.scene.add(group)
        console.log(three)
    }
}