import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Environment, ContactShadows, useTexture, Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'
import { InteractiveKombucha } from './InteractiveKombucha'

// Import all generated assets
import lakeViewImg from './assets/lake_view_ambiance.png'
import drinkPineappleImg from './assets/drink_pineapple.png'
import kombuchaImg from './assets/house_kombucha.png'
import drinkRoseImg from './assets/drink_rose.png'
import drinkPomegranateImg from './assets/drink_pomegranate.png'
import drinkAppleImg from './assets/drink_apple_cinnamon.png'

// Procedural 3D Clay Fermentation Jar (Matka / Amphora representing craft kombucha brewing)
const ClayJar = ({ innerRef, ...props }) => {
  return (
    <group ref={innerRef} {...props}>
      {/* 1. Main Round Clay Body */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial 
          color="#c87d65" /* Rich sun-baked clay body */
          roughness={0.92} 
          metalness={0.08} 
        />
      </mesh>

      {/* 2. Neck of the Jar */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.45, 0.4, 32]} />
        <meshStandardMaterial 
          color="#b26850" 
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* 3. Rim / Lip of the Jar */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <torusGeometry args={[0.3, 0.08, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial 
          color="#b26850" 
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* 4. Canvas cloth tied on top representing traditional fermentation sealing */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.08, 32]} />
        <meshStandardMaterial 
          color="#e8e2d5" /* Fine Linen cloth */
          roughness={1.0}
          metalness={0.0}
        />
      </mesh>

      {/* 5. Antique Gold cord tied around the neck */}
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[0.36, 0.03, 8, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial 
          color="#e6ad75" /* Antique Gold Cord */
          roughness={0.25} 
          metalness={0.85}
        />
      </mesh>
    </group>
  )
}

// Floating Ruby Red Pomegranate Seed / Kokum Berry
const BerryInstance = ({ position, scale, rotSpeed }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * rotSpeed[0]
      ref.current.rotation.y += delta * rotSpeed[1]
      ref.current.rotation.z += delta * rotSpeed[2]
      ref.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.0015
    }
  })
  return <Instance ref={ref} position={position} scale={scale} />
}

// Floating Botanical Green Sage / Mint Leaf
const MintLeafInstance = ({ position, scale, rotSpeed }) => {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * rotSpeed[0]
      ref.current.rotation.y += delta * rotSpeed[1]
      ref.current.rotation.z += delta * rotSpeed[2]
      ref.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.8 + position[0]) * 0.002
    }
  })
  return <Instance ref={ref} position={position} scale={scale} />
}

// Spline path helper function to continuously interpolate points with 100% fluid ease
const lerpPoints = (points, progress) => {
  const segmentCount = points.length - 1
  const scaledProgress = progress * segmentCount
  const index = Math.min(Math.floor(scaledProgress), segmentCount - 1)
  const segmentProgress = scaledProgress - index
  return THREE.MathUtils.lerp(points[index], points[index + 1], segmentProgress)
}

const Experience = ({ pages = 6.2, currentRoute = 'home' }) => {
  const scroll = useScroll()
  const { width, height } = useThree((state) => state.viewport)

  // Reset scroll to top when returning to the home page from a subpage
  useEffect(() => {
    if (currentRoute === 'home' && scroll.el) {
      scroll.el.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentRoute, scroll.el])
  
  // Load premium textures
  const lakeTexture = useTexture(lakeViewImg)
  const pineappleTexture = useTexture(drinkPineappleImg)
  const kombuchaTexture = useTexture(kombuchaImg)
  const roseTexture = useTexture(drinkRoseImg)
  const pomegranateTexture = useTexture(drinkPomegranateImg)
  const appleTexture = useTexture(drinkAppleImg)

  // References for main 3D models
  const jarRef = useRef()
  
  // References for dynamic image planes
  const imgAmbianceRef = useRef()
  const imgPineappleRef = useRef()
  const imgPastaRef = useRef()
  const imgKombuchaRef = useRef()
  const imgPomegranateRef = useRef()
  const imgAppleRef = useRef()
  const dashboardRef = useRef()

  // Generate random data for floating kokum berries and mint leaves
  const floatingItems = useMemo(() => {
    const berries = []
    const leaves = []
    
    for (let i = 0; i < 25; i++) {
      berries.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 55 - 15,
          (Math.random() - 0.5) * 5 - 2
        ],
        scale: [
          0.8 + Math.random() * 0.5,
          0.8 + Math.random() * 0.5,
          0.8 + Math.random() * 0.5
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
    return { berries, leaves }
  }, [])

  // Symmetrical Keyframe Mapping matching exactly the 5 segments
  const paths = useMemo(() => {
    return {
      jar: {
        x: [width * 0.25, width * 0.25, -width * 0.22, -width * 0.22, -width * 0.22, -width * 0.22],
        y: [-6.0, 0.0, 2.0, 2.0, 2.0, 2.0],
        z: [-3.0, -0.2, -2.5, -2.5, -2.5, -2.5],
        scale: [0.75, 0.75, 0.3, 0.3, 0.3, 0.3],
        rotX: [0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
        rotY: [-0.3, -0.3, -0.3, -0.3, -0.3, -0.3]
      },
      ambiance: {
        x: [width * 0.6, -width * 0.12, -width * 0.6, -width * 0.6, -width * 0.6, -width * 0.6],
        y: [0.0, 0.2, 0.0, 0.0, 0.0, 0.0],
        z: [-3.0, 0.3, -3.0, -3.0, -3.0, -3.0],
        scale: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
        rotX: [0.0, 0.05, 0.0, 0.0, 0.0, 0.0],
        rotY: [0.0, 0.15, 0.0, 0.0, 0.0, 0.0],
        rotZ: [0.0, -0.02, 0.0, 0.0, 0.0, 0.0]
      },
      pineapple: {
        x: [width * 0.10, width * 0.6, -width * 0.10, -width * 0.6, -width * 0.6, -width * 0.6],
        y: [0.0, 0.2, 0.4, -0.5, -1.0, -1.5],
        z: [0.4, -2.0, 0.3, -3.0, -3.0, -3.0],
        scale: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
        rotX: [0.15, 0.8, 0.05, 0.0, 0.0, 0.0],
        rotY: [-0.22, -0.6, 0.1, 0.12, 0.12, 0.12],
        rotZ: [0.05, 0.2, -0.05, -0.02, -0.02, -0.02]
      },
      pasta: {
        x: [width * 0.6, width * 0.6, -width * 0.16, -width * 0.6, -width * 0.6, -width * 0.6],
        y: [-0.7, -1.0, -0.8, -1.5, -2.0, -2.0],
        z: [-3.0, -2.0, 0.1, -3.0, -3.0, -3.0],
        scale: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
        rotX: [0.1, -0.8, -0.05, 0.0, 0.0, 0.0],
        rotY: [-0.28, 0.6, -0.08, -0.12, -0.12, -0.12],
        rotZ: [-0.06, -0.2, 0.05, 0.02, 0.02, 0.02]
      },
      kombucha: {
        x: [-width * 0.6, -width * 0.6, width * 0.6, width * 0.12, width * 0.6, -width * 0.6],
        y: [0.9, 0.4, -0.5, 0.5, -1.5, -2.0],
        z: [-3.0, -2.0, -2.0, 0.3, -3.0, -3.0],
        scale: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
        rotX: [0.1, 0.6, 0.0, 0.05, 0.0, 0.0],
        rotY: [-0.08, -0.6, 0.0, -0.1, 0.12, 0.12],
        rotZ: [0.08, 0.1, 0.0, -0.04, -0.02, -0.02]
      },
      smoothie: {
        x: [-width * 0.6, -width * 0.6, width * 0.6, width * 0.18, width * 0.6, -width * 0.6],
        y: [-0.1, -0.6, -0.5, -0.7, -1.5, -2.0],
        z: [-3.0, -2.0, -2.0, 0.1, -3.0, -3.0],
        scale: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
        rotX: [0.1, -0.6, 0.0, -0.05, 0.0, 0.0],
        rotY: [-0.22, 0.6, 0.0, 0.1, -0.12, -0.12],
        rotZ: [-0.02, -0.1, 0.0, 0.04, 0.02, 0.02]
      },
      bread: {
        x: [width * 0.6, width * 0.6, width * 0.6, width * 0.6, width * 0.10, width * 0.6],
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
    const isHome = currentRoute === 'home'
    const { x, y } = state.mouse

    // Calculate active scroll offset (lock target depending on sub-page route)
    let activeOffset = scroll.offset
    if (currentRoute === 'vibe') activeOffset = 0.2
    else if (currentRoute === 'food') activeOffset = 0.4
    else if (currentRoute === 'drinks') activeOffset = 0.6
    else if (currentRoute === 'story') activeOffset = 0.8
    else if (currentRoute === 'contact') activeOffset = 1.0

    // Normalize progress over exactly 5 page segments to align keyframes with exact page scrolls
    const normalizedProgress = Math.min((activeOffset * (pages - 1)) / 5, 1)

    // Pixel-Perfect Scroll Position locking
    const scrollY = -activeOffset * height * (pages - 1)

    // Smooth Camera Translation based on Scroll
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5 + activeOffset * 1.5, 0.1)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, scrollY, 0.1)
    state.camera.lookAt(0, scrollY, 0)

    // Botanical/Clay-Jar Ambient Background Fades
    const targetColor = new THREE.Color()
    if (normalizedProgress < 0.1) {
      targetColor.set('#faf9f6') // Section 1: Bright Ivory
    } else if (normalizedProgress < 0.3) {
      targetColor.set('#e8ece9') // Section 2: Light Sage
    } else if (normalizedProgress < 0.5) {
      targetColor.set('#f7f0e6') // Section 3: Warm Cream
    } else if (normalizedProgress < 0.7) {
      targetColor.set('#e6ebe6') // Section 4: Soft Green
    } else if (normalizedProgress < 0.9) {
      targetColor.set('#fdfbf7') // Section 5: White Ivory
    } else {
      targetColor.set('#faf9f6') // Section 6: Bright Ivory
    }
    state.scene.background.lerp(targetColor, 0.05)

    // Calculate a target layout offset (shift left by 25% of viewport width if a drawer is open on desktop)
    const isMobile = width < 4.5
    const layoutShift = THREE.MathUtils.lerp(
      0, 
      isMobile ? -width * 0.05 : -width * 0.28, 
      isHome ? 0 : 1
    )

    // Helper to apply path translation, tilt, and soft opacity fades
    const applyPath = (ref, pathData, targetOpacity, isKombucha = false) => {
      if (!ref.current) return
      
      const pX = lerpPoints(pathData.x, normalizedProgress)
      const pY = lerpPoints(pathData.y, normalizedProgress) + scrollY
      const pZ = lerpPoints(pathData.z, normalizedProgress)
      
      const s = lerpPoints(pathData.scale, normalizedProgress)
      
      const rX = lerpPoints(pathData.rotX, normalizedProgress)
      const rY = lerpPoints(pathData.rotY, normalizedProgress)
      const rZ = lerpPoints(pathData.rotZ, normalizedProgress)

      // Apply dynamic interactive mouse lag (Parallax) + dynamic layout shifting
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, pX + x * 0.15 + layoutShift, 0.1)
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, pY + y * 0.15, 0.1)
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, pZ, 0.1)

      ref.current.scale.set(
        THREE.MathUtils.lerp(ref.current.scale.x, s, 0.1),
        THREE.MathUtils.lerp(ref.current.scale.y, s, 0.1),
        1
      )

      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, rX + y * 0.1, 0.1)
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, rY + x * 0.1, 0.1)
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, rZ, 0.1)

      // Apply dynamic soft dissolve (opacity interpolation)
      if (ref.current.material) {
        ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, targetOpacity, 0.1)
        ref.current.visible = ref.current.material.opacity > 0.01
      }
      ref.current.userData.targetOpacity = targetOpacity
    }

    // 4. Update Clay Fermentation Jar Continuously on Eased Spline Path
    if (jarRef.current) {
      const jX = lerpPoints(paths.jar.x, normalizedProgress)
      const jY = lerpPoints(paths.jar.y, normalizedProgress) + scrollY
      const jZ = lerpPoints(paths.jar.z, normalizedProgress)
      const jS = lerpPoints(paths.jar.scale, normalizedProgress)
      const jRotX = lerpPoints(paths.jar.rotX, normalizedProgress)
      const jRotY = lerpPoints(paths.jar.rotY, normalizedProgress)

      jarRef.current.position.x = THREE.MathUtils.lerp(jarRef.current.position.x, jX + x * 0.2 + layoutShift, 0.1)
      jarRef.current.position.y = THREE.MathUtils.lerp(jarRef.current.position.y, jY + y * 0.2, 0.1)
      jarRef.current.position.z = THREE.MathUtils.lerp(jarRef.current.position.z, jZ, 0.1)

      // Scale jar slightly larger on single-page drawers for dramatic backdrop focus
      const jarScaleFactor = isHome ? jS : jS * 1.35

      jarRef.current.scale.set(
        THREE.MathUtils.lerp(jarRef.current.scale.x, jarScaleFactor, 0.1),
        THREE.MathUtils.lerp(jarRef.current.scale.y, jarScaleFactor, 0.1),
        THREE.MathUtils.lerp(jarRef.current.scale.z, jarScaleFactor, 0.1)
      )

      jarRef.current.rotation.y += delta * 0.8 // Slow mystical rotation
      jarRef.current.rotation.x = THREE.MathUtils.lerp(jarRef.current.rotation.x, jRotX + y * 0.2, 0.1)
      jarRef.current.rotation.z = THREE.MathUtils.lerp(jarRef.current.rotation.z, jRotY + x * 0.2, 0.1)
    }

    // Calculate precise dynamic opacities for seamless dissolves
    const dashboardKombuchaOpacity = (normalizedProgress <= 0.10) ? 1.0 : 0.0
    const ambianceOpacity = (normalizedProgress >= 0.10 && normalizedProgress <= 0.30) ? 1.0 : 0.0
    const pineappleOpacity = (normalizedProgress >= 0.30 && normalizedProgress <= 0.50) ? 1.0 : 0.0
    const roseOpacity = (normalizedProgress >= 0.30 && normalizedProgress <= 0.50) ? 1.0 : 0.0
    const kombuchaOpacity = (normalizedProgress >= 0.50 && normalizedProgress <= 0.70) ? 1.0 : 0.0
    const pomegranateOpacity = (normalizedProgress >= 0.50 && normalizedProgress <= 0.70) ? 1.0 : 0.0
    const appleOpacity = (normalizedProgress >= 0.70 && normalizedProgress <= 0.90) ? 1.0 : 0.0

    // Hide all image cards when drawer is active to ensure completely clutter-free sidebar text
    const targetDashboardOpacity = isHome ? dashboardKombuchaOpacity : 0.0
    const targetAmbianceOpacity = isHome ? ambianceOpacity : 0.0
    const targetPineappleOpacity = isHome ? pineappleOpacity : 0.0
    const targetRoseOpacity = isHome ? roseOpacity : 0.0
    const targetKombuchaOpacity = isHome ? kombuchaOpacity : 0.0
    const targetPomegranateOpacity = isHome ? pomegranateOpacity : 0.0
    const targetAppleOpacity = isHome ? appleOpacity : 0.0

    // Render dynamic paths based on scroll state
    applyPath(dashboardRef, paths.pineapple, targetDashboardOpacity)
    applyPath(imgAmbianceRef, paths.ambiance, targetAmbianceOpacity)
    applyPath(imgPineappleRef, paths.pineapple, targetPineappleOpacity)
    applyPath(imgPastaRef, paths.pasta, targetRoseOpacity)
    applyPath(imgKombuchaRef, paths.kombucha, targetKombuchaOpacity, true)
    applyPath(imgPomegranateRef, paths.smoothie, targetPomegranateOpacity)
    applyPath(imgAppleRef, paths.bread, targetAppleOpacity)
  })

  return (
    <>
      <color attach="background" args={['#faf9f6']} />
      <Environment preset="city" />
      
      {/* Specular Lighting Rig */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <spotLight position={[-5, 5, -5]} intensity={0.5} color="#e8b7c7" />

      {/* Interactive 3D Pouring Kombucha Component */}
      <group ref={dashboardRef}>
        <InteractiveKombucha dashboardRef={dashboardRef} bottleTexture={kombuchaTexture} glassTexture={roseTexture} />
      </group>

      {/* 3D Spinning Clay Fermentation Jar (Matka) */}
      <ClayJar jarRef={jarRef} jar={jarRef} innerRef={jarRef} />

      {/* Floating Pomegranate / Kokum Seeds (3D Ruby Spheres) */}
      <Instances castShadow limit={50}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#e8b7c7" roughness={0.3} metalness={0.1} />
        {floatingItems.berries.map((berry, i) => (
          <BerryInstance 
            key={`berry-${i}`}
            position={berry.position}
            scale={berry.scale}
            rotSpeed={berry.rotSpeed}
          />
        ))}
      </Instances>

      {/* Floating Botanical Mint/Sage Leaves (3D Geometries) */}
      <Instances castShadow limit={50}>
        <coneGeometry args={[0.11, 0.4, 3]} />
        <meshStandardMaterial color="#a6c4a8" roughness={0.8} metalness={0.0} flatShading />
        {floatingItems.leaves.map((leaf, i) => (
          <MintLeafInstance 
            key={`mint-${i}`}
            position={leaf.position}
            scale={leaf.scale}
            rotSpeed={leaf.rotSpeed}
          />
        ))}
      </Instances>

      {/* Dynamic 3D Specular Parallax Photo Cards */}
      {/* Ambiance Sunset View Card */}
      <mesh ref={imgAmbianceRef} castShadow receiveShadow>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial 
          map={lakeTexture} 
          transparent 
          opacity={0}
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pineapple Rosemary Kombucha Card */}
      <mesh ref={imgPineappleRef} castShadow receiveShadow>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial 
          map={pineappleTexture} 
          transparent 
          opacity={0}
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Kokum Rose Kombucha Card */}
      <mesh ref={imgPastaRef} castShadow receiveShadow>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial 
          map={roseTexture} 
          transparent 
          opacity={0}
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Organic Kombucha Card */}
      <mesh ref={imgKombuchaRef} castShadow receiveShadow>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial 
          map={kombuchaTexture} 
          transparent 
          opacity={0}
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Pomegranate Ginger Kombucha Card */}
      <mesh ref={imgPomegranateRef} castShadow receiveShadow>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial 
          map={pomegranateTexture} 
          transparent 
          opacity={0}
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Spiced Apple Cinnamon Kombucha Card */}
      <mesh ref={imgAppleRef} castShadow receiveShadow>
        <planeGeometry args={[1.3, 1.3]} />
        <meshStandardMaterial 
          map={appleTexture} 
          transparent 
          opacity={0}
          roughness={0.15} 
          metalness={0.25} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Realistic Shadow Catcher */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={25} blur={2.2} far={5} frames={1} resolution={256} />
    </>
  )
}

export default Experience;
