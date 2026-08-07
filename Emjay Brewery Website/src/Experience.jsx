import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Environment, ContactShadows, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Import all generated assets
import lakeViewImg from './assets/lake_view_ambiance.png'
import burgerImg from './assets/pumpkin_burger.png'
import kombuchaImg from './assets/house_kombucha.png'
import pastaImg from './assets/hand_rolled_pasta.png'
import smoothieImg from './assets/berry_smoothie_bowl.png'
import breadImg from './assets/sourdough_bread.png'

// Procedural 3D Vinyl Record (Rotates endlessly in the Vinyl lounge)
const VinylRecord = ({ innerRef, ...props }) => {
  return (
    <group ref={innerRef} {...props}>
      {/* Main Vinyl Plate */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.03, 64]} />
        <meshStandardMaterial 
          color="#111111" 
          roughness={0.2} 
          metalness={0.9} 
        />
      </mesh>
      {/* Grooves (Subtle Ring) */}
      <mesh position={[0, 0.016, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.45, 1.2, 64]} />
        <meshStandardMaterial 
          color="#181818" 
          roughness={0.4} 
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Center Label (Gold) */}
      <mesh position={[0, 0.017, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.005, 32]} />
        <meshStandardMaterial 
          color="#d4a373" 
          roughness={0.3} 
          metalness={0.5}
        />
      </mesh>
      {/* Center Hole */}
      <mesh position={[0, 0.018, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.006, 16]} />
        <meshStandardMaterial 
          color="#080808" 
        />
      </mesh>
    </group>
  )
}

// Floating Coffee Bean Element
const FloatingCoffeeBean = ({ position, scale, rotSpeed }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * rotSpeed[0]
      ref.current.rotation.y += delta * rotSpeed[1]
      ref.current.rotation.z += delta * rotSpeed[2]
      ref.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.0015
    }
  })
  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshStandardMaterial color="#3a2212" roughness={0.65} metalness={0.05} />
    </mesh>
  )
}

// Floating Green Leaf Element
const FloatingLeaf = ({ position, scale, rotSpeed }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * rotSpeed[0]
      ref.current.rotation.y += delta * rotSpeed[1]
      ref.current.rotation.z += delta * rotSpeed[2]
      ref.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.8 + position[0]) * 0.002
    }
  })
  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <coneGeometry args={[0.15, 0.45, 4]} />
      <meshStandardMaterial color="#6b8e23" roughness={0.7} metalness={0.0} flatShading />
    </mesh>
  )
}

// Spline path helper function to continuously interpolate points with 100% fluid ease
const lerpPoints = (points, progress) => {
  const segmentCount = points.length - 1
  const scaledProgress = progress * segmentCount
  const index = Math.min(Math.floor(scaledProgress), segmentCount - 1)
  const segmentProgress = scaledProgress - index
  return THREE.MathUtils.lerp(points[index], points[index + 1], segmentProgress)
}

const Experience = ({ pages = 6.2 }) => {
  const scroll = useScroll()
  const { width, height } = useThree((state) => state.viewport)
  
  // Load premium textures
  const lakeTexture = useTexture(lakeViewImg)
  const burgerTexture = useTexture(burgerImg)
  const kombuchaTexture = useTexture(kombuchaImg)
  const pastaTexture = useTexture(pastaImg)
  const smoothieTexture = useTexture(smoothieImg)
  const breadTexture = useTexture(breadImg)

  // References for main 3D models
  const vinylRef = useRef()
  
  // References for dynamic image planes
  const imgAmbianceRef = useRef()
  const imgBurgerRef = useRef()
  const imgPastaRef = useRef()
  const imgKombuchaRef = useRef()
  const imgSmoothieRef = useRef()
  const imgBreadRef = useRef()

  // Generate random data for floating coffee beans and leaves
  const floatingItems = useMemo(() => {
    const beans = []
    const leaves = []
    
    for (let i = 0; i < 25; i++) {
      beans.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 55 - 15,
          (Math.random() - 0.5) * 5 - 2
        ],
        scale: [
          0.6 + Math.random() * 0.6,
          0.9 + Math.random() * 0.8,
          0.5 + Math.random() * 0.4
        ],
        rotSpeed: [
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.5
        ]
      })
      
      leaves.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 55 - 15,
          (Math.random() - 0.5) * 5 - 2
        ],
        scale: [
          0.8 + Math.random() * 0.8,
          0.8 + Math.random() * 0.8,
          0.1 + Math.random() * 0.1
        ],
        rotSpeed: [
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.6
        ]
      })
    }
    return { beans, leaves }
  }, [])

  // Symmetrical Keyframe Mapping (Strictly showing only 1 Burger Card in Hero)
  // All cards maintain their premium scales under all conditions, preventing pops!
  const paths = useMemo(() => {
    return {
      vinyl: {
        x: [width * 0.5, width * 0.36, -width * 0.38, -width * 0.38, -width * 0.38, -width * 0.38],
        y: [-6.0, 0.0, 2.0, 2.0, 2.0, 2.0],
        z: [-3.0, -0.2, -2.5, -2.5, -2.5, -2.5],
        scale: [0.75, 0.75, 0.3, 0.3, 0.3, 0.3],
        rotX: [0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
        rotY: [-0.3, -0.3, -0.3, -0.3, -0.3, -0.3]
      },
      ambiance: {
        x: [-width * 0.75, -width * 0.22, -width * 0.75, -width * 0.75, -width * 0.75, -width * 0.75],
        y: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        z: [-3.0, 0.1, -3.0, -3.0, -3.0, -3.0],
        scale: [1.3, 1.3, 1.3, 1.3, 1.3, 1.3],
        rotX: [0.6, 0.0, 0.6, 0.6, 0.6, 0.6],
        rotY: [-0.4, 0.18, -0.4, -0.4, -0.4, -0.4],
        rotZ: [0.0, -0.04, 0.0, 0.0, 0.0, 0.0]
      },
      burger: {
        x: [width * 0.24, width * 0.75, width * 0.24, width * 0.75, width * 0.75, width * 0.75],
        y: [0.0, 0.2, 0.4, -0.5, -1.0, -1.5],
        z: [0.4, -2.0, 0.4, -3.0, -3.0, -3.0],
        scale: [1.25, 1.25, 1.25, 1.25, 1.25, 1.25],
        rotX: [0.15, 0.8, 0.0, 0.0, 0.0, 0.0],
        rotY: [-0.22, -0.6, 0.12, 0.12, 0.12, 0.12],
        rotZ: [0.05, 0.2, -0.02, -0.02, -0.02, -0.02]
      },
      pasta: {
        x: [width * 0.75, width * 0.75, width * 0.20, width * 0.75, width * 0.75, width * 0.75],
        y: [-0.7, -1.0, -0.5, -1.5, -2.0, -2.0],
        z: [-3.0, -2.0, 0.35, -3.0, -3.0, -3.0],
        scale: [1.25, 1.25, 1.25, 1.25, 1.25, 1.25],
        rotX: [0.1, -0.8, 0.0, 0.0, 0.0, 0.0],
        rotY: [-0.28, 0.6, -0.12, -0.12, -0.12, -0.12],
        rotZ: [-0.06, -0.2, 0.02, 0.02, 0.02, 0.02]
      },
      kombucha: {
        x: [-width * 0.75, -width * 0.75, width * 0.75, width * 0.24, width * 0.75, -width * 0.75],
        y: [0.9, 0.4, -0.5, -0.6, -1.5, -2.0],
        z: [-3.0, -2.0, -2.0, 0.35, -3.0, -3.0],
        scale: [1.15, 1.15, 1.15, 1.15, 1.15, 1.15],
        rotX: [0.1, 0.6, 0.0, 0.0, 0.0, 0.0],
        rotY: [-0.08, -0.6, 0.0, 0.12, 0.12, 0.12],
        rotZ: [0.08, 0.1, 0.0, -0.02, -0.02, -0.02]
      },
      smoothie: {
        x: [-width * 0.75, -width * 0.75, width * 0.75, width * 0.20, width * 0.75, -width * 0.75],
        y: [-0.1, -0.6, -0.5, 0.6, -1.5, -2.0],
        z: [-3.0, -2.0, -2.0, 0.4, -3.0, -3.0],
        scale: [1.25, 1.25, 1.25, 1.25, 1.25, 1.25],
        rotX: [0.1, -0.6, 0.0, 0.0, 0.0, 0.0],
        rotY: [-0.22, 0.6, 0.0, -0.12, -0.12, -0.12],
        rotZ: [-0.02, -0.1, 0.0, 0.02, 0.02, 0.02]
      },
      bread: {
        x: [width * 0.75, width * 0.75, width * 0.75, width * 0.75, width * 0.24, width * 0.75],
        y: [-1.0, -1.0, -1.0, -1.0, 0.0, -1.0],
        z: [-3.0, -3.0, -3.0, -3.0, 0.25, -3.0],
        scale: [1.3, 1.3, 1.3, 1.3, 1.3, 1.3],
        rotX: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        rotY: [-0.15, -0.15, -0.15, -0.15, -0.15, -0.15],
        rotZ: [0.0, 0.0, 0.0, 0.0, 0.03, 0.0]
      }
    }
  }, [width])

  useFrame((state, delta) => {
    const offset = scroll.offset // Continuous eased progress (0.0 to 1.0)
    const { x, y } = state.mouse

    // Normalize progress over exactly 5 page segments to align keyframes with exact page scrolls (Home=0, Vibe=0.2, Food=0.4...)
    const normalizedProgress = Math.min((offset * (pages - 1)) / 5, 1)

    // 1. Pixel-Perfect Dynamic Scroll Position (LOCKED across all monitor resolutions)
    const scrollY = -offset * height * (pages - 1)

    // 2. Smooth Camera Translation based on Scroll
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5 + offset * 1.5, 0.1)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, scrollY, 0.1)
    state.camera.lookAt(0, scrollY, 0)

    // 3. Consistent Luxury Warm Espresso Cocoa Background Fades
    const targetColor = new THREE.Color()
    if (normalizedProgress < 0.1) {
      targetColor.set('#130f0c') // Section 1: Deep Warm Espresso
    } else if (normalizedProgress < 0.3) {
      targetColor.set('#1a130f') // Section 2: Warm Golden Cocoa
    } else if (normalizedProgress < 0.5) {
      targetColor.set('#1c1510') // Section 3: Rich Roasted Chestnut Bronze
    } else if (normalizedProgress < 0.7) {
      targetColor.set('#1e1611') // Section 4: Organic Golden Cocoa
    } else if (normalizedProgress < 0.9) {
      targetColor.set('#1b140f') // Section 5: Soft Terracotta Sourdough
    } else {
      targetColor.set('#120e0a') // Section 6: Cozy Sunset Espresso
    }
    state.scene.background.lerp(targetColor, 0.05)

    // Helper to apply path translation, tilt, and soft opacity fades
    const applyPath = (ref, pathData, targetOpacity, isKombucha = false) => {
      if (!ref.current) return
      
      // Interpolate structural position based on normalized progress
      const pX = lerpPoints(pathData.x, normalizedProgress)
      const pY = lerpPoints(pathData.y, normalizedProgress) + scrollY
      const pZ = lerpPoints(pathData.z, normalizedProgress)
      
      const s = lerpPoints(pathData.scale, normalizedProgress)
      
      const rX = lerpPoints(pathData.rotX, normalizedProgress)
      const rY = lerpPoints(pathData.rotY, normalizedProgress)
      const rZ = lerpPoints(pathData.rotZ, normalizedProgress)

      // Apply dynamic interactive mouse lag (Parallax overlay)
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pX + x * 0.15, 0.1)
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, pY + y * 0.15, 0.1)
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, pZ, 0.1)

      ref.current.scale.set(
        THREE.MathUtils.lerp(ref.current.scale.x, s, 0.1),
        THREE.MathUtils.lerp(ref.current.scale.y, isKombucha ? s * 1.4 : s, 0.1),
        1
      )

      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, rX + y * 0.1, 0.1)
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, rY + x * 0.1, 0.1)
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, rZ, 0.1)

      // Apply gorgeous dynamic soft dissolve (opacity interpolation)
      ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, targetOpacity, 0.1)
    }

    // 4. Update Vinyl Record Continuously on Eased Spline Path
    if (vinylRef.current) {
      const vX = lerpPoints(paths.vinyl.x, normalizedProgress)
      const vY = lerpPoints(paths.vinyl.y, normalizedProgress) + scrollY
      const vZ = lerpPoints(paths.vinyl.z, normalizedProgress)
      const vS = lerpPoints(paths.vinyl.scale, normalizedProgress)
      const vRotX = lerpPoints(paths.vinyl.rotX, normalizedProgress)
      const vRotY = lerpPoints(paths.vinyl.rotY, normalizedProgress)

      vinylRef.current.position.x = THREE.MathUtils.lerp(vinylRef.current.position.x, vX + x * 0.2, 0.1)
      vinylRef.current.position.y = THREE.MathUtils.lerp(vinylRef.current.position.y, vY + y * 0.2, 0.1)
      vinylRef.current.position.z = THREE.MathUtils.lerp(vinylRef.current.position.z, vZ, 0.1)

      vinylRef.current.scale.set(
        THREE.MathUtils.lerp(vinylRef.current.scale.x, vS, 0.1),
        THREE.MathUtils.lerp(vinylRef.current.scale.y, vS, 0.1),
        THREE.MathUtils.lerp(vinylRef.current.scale.z, vS, 0.1)
      )

      vinylRef.current.rotation.y += delta * 1.6 // Seamless continuous spinning
      vinylRef.current.rotation.x = THREE.MathUtils.lerp(vinylRef.current.rotation.x, vRotX + y * 0.2, 0.1)
      vinylRef.current.rotation.z = THREE.MathUtils.lerp(vinylRef.current.rotation.z, vRotY + x * 0.2, 0.1)
    }

    // 5. Calculate precise dynamic opacities for seamless dissolves
    const ambianceOpacity = (normalizedProgress >= 0.10 && normalizedProgress <= 0.30) ? 1.0 : 0.0
    const burgerOpacity = (normalizedProgress <= 0.10 || (normalizedProgress >= 0.30 && normalizedProgress <= 0.50)) ? 1.0 : 0.0
    const pastaOpacity = (normalizedProgress >= 0.30 && normalizedProgress <= 0.50) ? 1.0 : 0.0
    const kombuchaOpacity = (normalizedProgress >= 0.50 && normalizedProgress <= 0.70) ? 1.0 : 0.0
    const smoothieOpacity = (normalizedProgress >= 0.50 && normalizedProgress <= 0.70) ? 1.0 : 0.0
    const breadOpacity = (normalizedProgress >= 0.70 && normalizedProgress <= 0.90) ? 1.0 : 0.0

    // 6. Update all high-fidelity image cards continuously
    applyPath(imgAmbianceRef, paths.ambiance, ambianceOpacity)
    applyPath(imgBurgerRef, paths.burger, burgerOpacity)
    applyPath(imgPastaRef, paths.pasta, pastaOpacity)
    applyPath(imgKombuchaRef, paths.kombucha, kombuchaOpacity, true)
    applyPath(imgSmoothieRef, paths.smoothie, smoothieOpacity)
    applyPath(imgBreadRef, paths.bread, breadOpacity)
  })

  return (
    <>
      <color attach="background" args={['#100d0b']} />
      <Environment preset="sunset" />
      
      {/* Dynamic Specular Lighting Rig */}
      <ambientLight intensity={0.4} />
      <spotLight 
        position={[25, 25, 25]} 
        angle={0.25} 
        penumbra={1} 
        intensity={8} 
        color="#ebd9b4" 
        castShadow 
      />
      <pointLight position={[-15, -15, -15]} intensity={2.5} color="#faedcd" />

      {/* 3D Spinning Vinyl Record */}
      <VinylRecord vinylRef={vinylRef} vinyl={vinylRef} innerRef={vinylRef} />

      {/* Floating Coffee Beans (3D Geometries) */}
      <group>
        {floatingItems.beans.map((bean, i) => (
          <FloatingCoffeeBean 
            key={`bean-${i}`}
            position={bean.position}
            scale={bean.scale}
            rotSpeed={bean.rotSpeed}
          />
        ))}
      </group>

      {/* Floating Organic Green Leaves (3D Geometries) */}
      <group>
        {floatingItems.leaves.map((leaf, i) => (
          <FloatingLeaf 
            key={`leaf-${i}`}
            position={leaf.position}
            scale={leaf.scale}
            rotSpeed={leaf.rotSpeed}
          />
        ))}
      </group>

      {/* Dynamic 3D Specular Parallax Photo Cards */}
      {/* Ambiance Sunset View Card */}
      <mesh ref={imgAmbianceRef} castShadow receiveShadow>
        <planeGeometry args={[1.6, 1]} />
        <meshStandardMaterial 
          map={lakeTexture} 
          transparent 
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gourmet Burger Card */}
      <mesh ref={imgBurgerRef} castShadow receiveShadow>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          map={burgerTexture} 
          transparent 
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hand-rolled Pasta Card */}
      <mesh ref={imgPastaRef} castShadow receiveShadow>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          map={pastaTexture} 
          transparent 
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Organic Kombucha Card */}
      <mesh ref={imgKombuchaRef} castShadow receiveShadow>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial 
          map={kombuchaTexture} 
          transparent 
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Berry Smoothie Bowl Card */}
      <mesh ref={imgSmoothieRef} castShadow receiveShadow>
        <planeGeometry args={[1.4, 1]} />
        <meshStandardMaterial 
          map={smoothieTexture} 
          transparent 
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sourdough Bread Card */}
      <mesh ref={imgBreadRef} castShadow receiveShadow>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          map={breadTexture} 
          transparent 
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Realistic Shadow Catcher */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={25} blur={2.2} far={5} />
    </>
  )
}

export default Experience;
