const object = {
    init(canvas, element){
        element.scene = new THREE.Scene()
        
		element.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
		element.renderer.setSize(param.util.width, param.util.height)
		element.renderer.setClearColor(0x000000)
        element.renderer.setClearAlpha(0.0)

        element.camera = new THREE.PerspectiveCamera(45, param.util.width / param.util.height, 1, 1000)
        element.camera.position.z = 50
        element.scene.add(element.camera)
        
        for(let i in element.group) element.group[i] = new THREE.Group()
    },
    createHorizonLines(element){
        let size = this.getVisibleWidth(0, element) * three.line.size,
            sample = new THREE.PlaneGeometry(size, size, three.line.seg, three.line.seg).vertices,
            local = new THREE.Group(), 
            len = three.line.seg + 1

        for(let i = 0; i < len; i++){
            let s = sample[i * (three.line.seg + 1)],
                e = sample[i * (three.line.seg + 1) + three.line.seg],
                start = new THREE.Vector3(s.x, s.y, s.z),
                end = new THREE.Vector3(e.x, e.y, e.z)

            let geometry = new THREE.Geometry()
            geometry.vertices.push(start)
            geometry.vertices.push(end)

            let material = new THREE.LineBasicMaterial({
                color: 0x00fcfc,
                transparent: true,
                opacity: 0
            })

            let mesh = new THREE.Line(geometry, material)
            local.add(mesh)
        }
        element.group.line.add(local)
        element.scene.add(element.group.line)
    },
    createVerticalLines(element){
        let size = this.getVisibleWidth(0, element) * three.line.size,
            sample = new THREE.PlaneGeometry(size, size, three.line.seg, three.line.seg).vertices,
            local = new THREE.Group(),
            len = Math.floor(sample.length / (three.line.seg + 1))

        for(let i = 0; i < len; i++){
            let s = sample[i],
                e = sample[(sample.length - 1) - (len - 1) + i],
                start = new THREE.Vector3(s.x, s.y, s.z),
                end = new THREE.Vector3(e.x, e.y, e.z)

            let geometry = new THREE.Geometry()
            geometry.vertices.push(start)
            geometry.vertices.push(end)

            let material = new THREE.LineBasicMaterial({
                color: 0x00fcfc,
                transparent: true,
                opacity: 0
            })

            let mesh = new THREE.Line(geometry, material)
            local.add(mesh)
        }
        element.group.line.add(local)
        element.scene.add(element.group.line)
    },
    createCube(element, param){
        for(let i = 0; i < param.row ** 3; i++){
            let local = new THREE.Group()

            let geometry = new THREE.BoxGeometry(param.size, param.size, param.size)
            let material = new THREE.MeshBasicMaterial({
                color: 0x00fcfc,
                transparent: true,
                opacity: 0,
                depthTest: false
            })
            let mesh = new THREE.Mesh(geometry, material)
            
            let helper = new THREE.BoxHelper(mesh, 0x00fcfc)
            helper.material.transparent = true
            helper.material.opacity = 0

            local.add(mesh)
            local.add(helper)
            local.position.set(
                element.pos.cube[i].x,
                element.pos.cube[i].y,
                element.pos.cube[i].z
            )

            element.group.cube.add(local)
        }
        element.group.cube.scale.set(param.scale, param.scale, param.scale)
        element.scene.add(element.group.cube)
    },
    getVisibleHeight(depth, element){
        let cameraOffset = element.camera.position.z
        if(depth < cameraOffset) depth -= cameraOffset
        else depth += cameraOffset
        let vFov = element.camera.fov * param.util.radian
        return 2 * Math.tan(vFov / 2) * Math.abs(depth)
    },
    getVisibleWidth(depth, element){
        let h = this.getVisibleHeight(depth, element)
        return h * element.camera.aspect
    },
}