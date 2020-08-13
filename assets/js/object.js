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
    createCube(element, param){
        for(let i = 0; i < param.row ** 3; i++){
            let local = new THREE.Group()
            local.param = {
                box: 0.125,
                helper: 0.6
            }

            let geometry = new THREE.BoxGeometry(param.size, param.size, param.size)
            let material = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0xffffff : 0xffffff,
                transparent: true,
                opacity: 0,
                depthTest: false
            })
            let mesh = new THREE.Mesh(geometry, material)
            
            let helper = new THREE.BoxHelper(mesh, i % 2 === 0 ? 0xffffff : 0xffffff)
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
        element.scene.add(element.group.cube)
    }
}