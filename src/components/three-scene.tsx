
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return

    const currentMount = mountRef.current

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    currentMount.appendChild(renderer.domElement)

    // Objects
    const objects: THREE.Mesh[] = []
    const geometry1 = new THREE.IcosahedronGeometry(0.8, 0)
    const material1 = new THREE.MeshStandardMaterial({ color: 0xBE72F2, roughness: 0.3, metalness: 0.9 })
    const sphere = new THREE.Mesh(geometry1, material1)
    sphere.position.set(2, 0.5, -2)
    scene.add(sphere)
    objects.push(sphere)

    const geometry2 = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16)
    const material2 = new THREE.MeshStandardMaterial({ color: 0x63F7FF, roughness: 0.1, metalness: 1.0 })
    const torusKnot = new THREE.Mesh(geometry2, material2)
    torusKnot.position.set(-2.5, -0.5, 0)
    scene.add(torusKnot)
    objects.push(torusKnot)

    // Lights
    const pointLight1 = new THREE.PointLight(0xBE72F2, 150, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x63F7FF, 150, 100)
    pointLight2.position.set(-5, -5, -5)
    scene.add(pointLight2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    // Animation loop
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    document.addEventListener('mousemove', handleMouseMove)

    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      objects.forEach((obj, index) => {
        obj.rotation.y += 0.001 * (index % 2 === 0 ? 1 : -1)
        obj.rotation.x += 0.002 * (index % 2 === 0 ? 1 : -1)
        obj.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.003
      })
      
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', handleMouseMove)
      if (currentMount) {
        currentMount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-50" />
}
