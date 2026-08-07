import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Environment, ContactShadows, useTexture, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Import all generated assets
import lakeViewImg from './assets/art_lake.png'
import burgerImg from './assets/art_burger.png'
import kombuchaImg from './assets/art_kombucha.png'
import pastaImg from './assets/art_pasta.png'
import smoothieImg from './assets/art_smoothie.png'
import breadImg from './assets/art_bread.png'
import guitarImg from './assets/art_guitar.png'
const Guitarist = ({ innerRef, ...props }) => {
  const texture = useTexture(guitarImg)
  const audioRef = useRef(null)

  useEffect(() => {
    // Load the original rock guitar audio we downloaded
    audioRef.current = new Audio('/rock.webm')
    audioRef.current.loop = true
    audioRef.current.volume = 0.8
  }, [])

  return (
    <group ref={innerRef} {...props}>
      <mesh 
        castShadow 
        receiveShadow 
        onPointerEnter={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("Audio play blocked by browser:", e))
          }
        }}
        onPointerLeave={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'none'
          if (audioRef.current) {
            audioRef.current.pause()
          }
        }}
      >
        <planeGeometry args={[2.4, 2.4]} />
        <meshStandardMaterial map={texture} transparent roughness={0.15} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

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
      <meshStandardMaterial color="#A65A2A" roughness={0.65} metalness={0.05} />
    </mesh>
  )
}

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
      <meshStandardMaterial color="#3E4A35" roughness={0.7} metalness={0.0} flatShading />
    </mesh>
  )
}

const lerpPoints = (points, progress, targets) => {
  if (!targets) {
    const segmentCount = points.length - 1
    const scaledProgress = Math.max(0, Math.min(progress * segmentCount, segmentCount))
    const index = Math.min(Math.floor(scaledProgress), segmentCount - 1)
    const segmentProgress = scaledProgress - index
    return THREE.MathUtils.lerp(points[index], points[index + 1], segmentProgress)
  }

  let i = 0
  while (i < targets.length - 2 && progress >= targets[i+1]) {
    i++
  }
  
  const range = targets[i+1] - targets[i]
  if (range <= 0) return points[i]
  
  const segmentProgress = Math.max(0, Math.min((progress - targets[i]) / range, 1))
  return THREE.MathUtils.lerp(points[i], points[i+1], segmentProgress)
}

const Experience = ({ pages = 6.2 }) => {
  const scroll = useScroll()
  const { width, height } = useThree((state) => state.viewport)
  
  const lakeTexture = useTexture(lakeViewImg)
  const burgerTexture = useTexture(burgerImg)
  const kombuchaTexture = useTexture(kombuchaImg)
  const pastaTexture = useTexture(pastaImg)
  const smoothieTexture = useTexture(smoothieImg)
  const breadTexture = useTexture(breadImg)

  const guitaristRef = useRef()
  const imgAmbianceRef = useRef()
  const imgBurgerRef = useRef()
  const imgPastaRef = useRef()
  const imgKombuchaRef = useRef()
  const imgSmoothieRef = useRef()
  const imgBreadRef = useRef()
  const ambientLightRef = useRef()
  const spotLightRef = useRef()
  const pointLightRef = useRef()
  
  const sectionTargets = useRef([0, 0.2, 0.4, 0.6, 0.8, 1.0])

  useEffect(() => {
    const updateTargets = () => {
      const sections = ['home', 'vibe', 'food', 'drinks', 'story', 'contact']
      const contentEl = document.querySelector('.content')
      if (!contentEl) return
      
      const maxScroll = contentEl.getBoundingClientRect().height - window.innerHeight
      if (maxScroll <= 0) return
      
      const targets = sections.map(id => {
        const el = document.getElementById(id)
        if (!el) return 0
        return Math.max(0, Math.min(el.offsetTop / maxScroll, 1))
      })
      sectionTargets.current = targets
    }

    const t = setTimeout(updateTargets, 500)
    window.addEventListener('resize', updateTargets)
    return () => { clearTimeout(t); window.removeEventListener('resize', updateTargets) }
  }, [])
  
  const colorDay = useMemo(() => new THREE.Color('#ffffff'), [])
  const colorSunset = useMemo(() => new THREE.Color('#ff7b54'), [])
  const colorNight = useMemo(() => new THREE.Color('#2d4263'), [])
  const targetLightColor = useMemo(() => new THREE.Color(), [])

  const floatingItems = useMemo(() => {
    const beans = []
    const leaves = []
    for (let i = 0; i < 25; i++) {
      beans.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 100 - 30, (Math.random() - 0.5) * 8 - 6], // Pushed back into Z-space, spread across wider Y
        scale: [0.6 + Math.random() * 0.6, 0.9 + Math.random() * 0.8, 0.5 + Math.random() * 0.4],
        rotSpeed: [(Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.5]
      })
      leaves.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 100 - 30, (Math.random() - 0.5) * 8 - 6], // Pushed back into Z-space, spread across wider Y
        scale: [0.8 + Math.random() * 0.8, 0.8 + Math.random() * 0.8, 0.1 + Math.random() * 0.1],
        rotSpeed: [(Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6]
      })
    }
    return { beans, leaves }
  }, [])

  // Thematically diverse paths per section!
  const paths = useMemo(() => {
    const scaleFactor = window.innerWidth <= 768 ? 0.6 : 1.0;
    const sArr = (arr) => arr.map(v => v * scaleFactor);
    
    return {
      guitarist: {
        x: [width * 0.25, width * 0.25, width * 0.25, width * 0.25, width * 0.25, width * 0.25],
        y: [0, 0, 0, 0, 0, 0],
        z: [0, 0, 0, 0, 0, 0],
        scale: sArr([1.6, 0.0, 0, 0, 0, 0]),
        rotX: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        rotY: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        rotZ: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
      },
      ambiance: {
        x: [width * 0.35, width * 0.35, width * 0.35, width * 0.35, width * 0.35, width * 0.35],
        y: [0, 0, 0, 0, 0, 0],
        z: [-2, -2, -2, -2, -2, -2],
        scale: sArr([0.0, 3.8, 0.0, 0.0, 0.0, 0.0]),
        rotX: [0.0, 0.05, 0.0, 0.0, 0.0, 0.0],
        rotY: [0.0, -0.1, 0.0, 0.0, 0.0, 0.0],
        rotZ: [0.0, 0.02, 0.0, 0.0, 0.0, 0.0]
      },
      burger: {
        x: [-width * 0.35, -width * 0.35, -width * 0.35, -width * 0.35, -width * 0.35, -width * 0.35],
        y: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
        z: [-2, -2, -2, -2, -2, -2],
        scale: sArr([0, 0, 3.4, 0, 0, 0]),
        rotX: [0, 0, 0.1, 0, 0, 0],
        rotY: [0, 0, 0.15, 0, 0, 0],
        rotZ: [0, 0, -0.05, 0, 0, 0]
      },
      pasta: {
        x: [-width * 0.25, -width * 0.25, -width * 0.25, -width * 0.25, -width * 0.25, -width * 0.25],
        y: [-0.8, -0.8, -0.8, -0.8, -0.8, -0.8],
        z: [-2, -2, -2, -2, -2, -2],
        scale: sArr([0, 0, 3.1, 0, 0, 0]),
        rotX: [0, 0, 0.05, 0, 0, 0],
        rotY: [0, 0, -0.1, 0, 0, 0],
        rotZ: [0, 0, 0.05, 0, 0, 0]
      },
      kombucha: {
        x: [-width * 0.4, -width * 0.4, -width * 0.4, -width * 0.4, -width * 0.4, -width * 0.4],
        y: [0, 0, 0, 0, 0, 0],
        z: [-2, -2, -2, -2, -2, -2],
        scale: sArr([0, 0, 0, 3.4, 0, 0]),
        rotX: [0, 0, 0, -0.05, 0, 0],
        rotY: [0, 0, 0, 0.1, 0, 0],
        rotZ: [0, 0, 0, 0.02, 0, 0]
      },
      smoothie: {
        x: [width * 0.4, width * 0.4, width * 0.4, width * 0.4, width * 0.4, width * 0.4],
        y: [0, 0, 0, 0, 0, 0],
        z: [-2, -2, -2, -2, -2, -2],
        scale: sArr([0, 0, 0, 3.1, 0, 0]),
        rotX: [0, 0, 0, 0.05, 0, 0],
        rotY: [0, 0, 0, -0.1, 0, 0],
        rotZ: [0, 0, 0, -0.05, 0, 0]
      },
      bread: {
        x: [width * 0.35, width * 0.35, width * 0.35, width * 0.35, width * 0.35, width * 0.35],
        y: [0, 0, 0, 0, 0, 0],
        z: [-2, -2, -2, -2, -2, -2],
        scale: sArr([0, 0, 0, 0, 3.6, 0]),
        rotX: [0, 0, 0, 0, 0.05, 0],
        rotY: [0, 0, 0, 0, 0.15, 0],
        rotZ: [0, 0, 0, 0, -0.02, 0]
      }
    }
  }, [width])

  useFrame((state, delta) => {
    const offset = scroll.offset
    const normalizedProgress = Math.min((offset * (pages - 1)) / 5, 1)
    const scrollY = -offset * height * (pages - 1)

    // Ultra-aesthetic Sunset Lighting Transition based on scroll!
    if (normalizedProgress < 0.2) {
      // Home to Vibe (Day to Sunset)
      targetLightColor.lerpColors(colorDay, colorSunset, normalizedProgress / 0.2)
    } else if (normalizedProgress < 0.6) {
      // Vibe to Drinks (Sunset glow)
      targetLightColor.copy(colorSunset)
    } else {
      // Drinks to Contact (Sunset to Evening/Night)
      targetLightColor.lerpColors(colorSunset, colorNight, (normalizedProgress - 0.6) / 0.4)
    }
    
    if (ambientLightRef.current) ambientLightRef.current.color.lerp(targetLightColor, 0.1)
    if (spotLightRef.current) spotLightRef.current.color.lerp(targetLightColor, 0.1)

    // Calculate mouse influence
    const { x, y } = state.mouse

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5 + offset * 1.5, 0.1)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, scrollY, 0.1)
    state.camera.lookAt(0, scrollY, 0)

    const targetColor = new THREE.Color()
    if (normalizedProgress < 0.1) {
      targetColor.set('#F9F6F0')
    } else if (normalizedProgress < 0.3) {
      targetColor.set('#F2EFE8')
    } else if (normalizedProgress < 0.5) {
      targetColor.set('#EAE6DD')
    } else if (normalizedProgress < 0.7) {
      targetColor.set('#E3DCCC')
    } else if (normalizedProgress < 0.9) {
      targetColor.set('#EADAC1')
    } else {
      targetColor.set('#E0D2BA')
    }
    if (!state.scene.background) {
      state.scene.background = new THREE.Color('#F9F6F0')
    }
    state.scene.background.lerp(targetColor, 0.05)

    const applyPath = (ref, pathData, isKombucha = false) => {
      if (!ref.current) return
      
      const time = state.clock.getElapsedTime()
      const targets = sectionTargets.current
      
      const pX = lerpPoints(pathData.x, offset, targets)
      
      // Add continuous floating bounce animation independent of scroll!
      const bounceY = Math.sin(time * 1.5 + (pathData.x[0] || 0)) * 0.3
      const pY = lerpPoints(pathData.y, offset, targets) + scrollY + bounceY
      
      const pZ = lerpPoints(pathData.z, offset, targets)
      const s = lerpPoints(pathData.scale, offset, targets)
      const rX = lerpPoints(pathData.rotX, offset, targets)
      const rY = lerpPoints(pathData.rotY, offset, targets)
      
      // Add continuous slow rotation animation
      const rZ = lerpPoints(pathData.rotZ, offset, targets) + Math.sin(time * 0.8) * 0.05

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

      // Smoothly fade in based on scale! If scale is > 0.1, fade to 1.0. Otherwise fade to 0.0.
      const targetOpacity = s > 0.1 ? 1.0 : 0.0
      ref.current.material.opacity = THREE.MathUtils.lerp(ref.current.material.opacity, targetOpacity, 0.15)
    }

    if (guitaristRef.current) {
      const targets = sectionTargets.current
      const gX = lerpPoints(paths.guitarist.x, offset, targets)
      const gY = lerpPoints(paths.guitarist.y, offset, targets) + scrollY
      const gZ = lerpPoints(paths.guitarist.z, offset, targets)
      const gS = lerpPoints(paths.guitarist.scale, offset, targets)
      const gRotX = lerpPoints(paths.guitarist.rotX, offset, targets)
      const gRotY = lerpPoints(paths.guitarist.rotY, offset, targets)

      guitaristRef.current.position.x = THREE.MathUtils.lerp(guitaristRef.current.position.x, gX + x * 0.2, 0.1)
      guitaristRef.current.position.y = THREE.MathUtils.lerp(guitaristRef.current.position.y, gY + y * 0.2, 0.1)
      guitaristRef.current.position.z = THREE.MathUtils.lerp(guitaristRef.current.position.z, gZ, 0.1)

      guitaristRef.current.scale.set(
        THREE.MathUtils.lerp(guitaristRef.current.scale.x, gS, 0.1),
        THREE.MathUtils.lerp(guitaristRef.current.scale.y, gS, 0.1),
        1
      )

      // Add a very subtle floating bounce to the guitarist!
      guitaristRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 1.5) * 0.002

      guitaristRef.current.rotation.x = THREE.MathUtils.lerp(guitaristRef.current.rotation.x, gRotX + y * 0.15, 0.1)
      guitaristRef.current.rotation.y = THREE.MathUtils.lerp(guitaristRef.current.rotation.y, gRotY + x * 0.15, 0.1)
      guitaristRef.current.rotation.z = THREE.MathUtils.lerp(guitaristRef.current.rotation.z, Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05, 0.1)
    }

    applyPath(imgAmbianceRef, paths.ambiance)
    applyPath(imgBurgerRef, paths.burger)
    applyPath(imgPastaRef, paths.pasta)
    applyPath(imgKombuchaRef, paths.kombucha, true)
    applyPath(imgSmoothieRef, paths.smoothie)
    applyPath(imgBreadRef, paths.bread)
  })

    return (
    <>
      <color attach="background" args={['#FFFCF7']} />
      <Environment preset="city" />
      
      {/* Adjusted lighting for Light Theme - Now animated! */}
      <ambientLight ref={ambientLightRef} intensity={1.5} color="#ffffff" />
      <spotLight ref={spotLightRef} position={[25, 25, 25]} angle={0.25} penumbra={1} intensity={5} color="#ffffff" castShadow />
      <pointLight ref={pointLightRef} position={[-15, -15, -15]} intensity={1.5} color="#FFFCF7" />

      {/* Magical Sunset Fireflies / Dust */}
      <Sparkles count={150} scale={30} size={6} speed={0.4} opacity={0.4} color="#ffb703" position={[0, -5, -4]} />
      <Sparkles count={100} scale={25} size={4} speed={0.2} opacity={0.2} color="#ffffff" position={[0, -15, -6]} />

      <Guitarist innerRef={guitaristRef} />

      <group>
        {floatingItems.beans.map((bean, i) => (
          <FloatingCoffeeBean key={`bean-${i}`} position={bean.position} scale={bean.scale} rotSpeed={bean.rotSpeed} />
        ))}
      </group>

      <group>
        {floatingItems.leaves.map((leaf, i) => (
          <FloatingLeaf key={`leaf-${i}`} position={leaf.position} scale={leaf.scale} rotSpeed={leaf.rotSpeed} />
        ))}
      </group>

      {/* Cards */}
      <mesh ref={imgAmbianceRef} castShadow receiveShadow>
        <planeGeometry args={[1.6, 1]} />
        <meshStandardMaterial map={lakeTexture} transparent roughness={0.15} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={imgBurgerRef} castShadow receiveShadow>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial map={burgerTexture} transparent roughness={0.15} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={imgPastaRef} castShadow receiveShadow>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial map={pastaTexture} transparent roughness={0.15} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={imgKombuchaRef} castShadow receiveShadow>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial map={kombuchaTexture} transparent roughness={0.15} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={imgSmoothieRef} castShadow receiveShadow>
        <planeGeometry args={[1.4, 1]} />
        <meshStandardMaterial map={smoothieTexture} transparent roughness={0.15} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={imgBreadRef} castShadow receiveShadow>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial map={breadTexture} transparent roughness={0.15} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.3} scale={25} blur={2.5} far={5} color="#2C3625" />
    </>
  )
}

export default Experience;
