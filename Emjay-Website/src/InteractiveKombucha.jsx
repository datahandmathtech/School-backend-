import { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export const InteractiveKombucha = ({ bottleTexture, dashboardRef }) => {
  const bottleImg = useTexture('/bottle_clean.png')
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()
  const bottleRef = useRef()
  const glassRef = useRef()
  const liquidRef = useRef()
  const streamRef = useRef()
  const labelRef = useRef()

  // Text-to-Speech Voice Logic
  useEffect(() => {
    if (hovered && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel() // Stop any previous speech
      const msg = new SpeechSynthesisUtterance("Enjoy Kombucha")
      msg.lang = 'en-US'
      msg.rate = 0.95
      msg.pitch = 1.05
      window.speechSynthesis.speak(msg)
    }
  }, [hovered])

  useFrame((state, delta) => {
    if (!bottleRef.current || !glassRef.current || !groupRef.current) return

    // Floating animation
    const t = state.clock.getElapsedTime()
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.05

    // Animate bottle tilt (pouring motion)
    const targetTilt = hovered ? Math.PI / 2.2 : 0.05
    bottleRef.current.rotation.z = THREE.MathUtils.lerp(bottleRef.current.rotation.z, targetTilt, 0.08)
    
    // Move the center of the bottle so the lip reaches exactly (-0.4, 0.5) when rotated 81.8 degrees
    const targetX = hovered ? 0.2 : 0.6
    const targetY = hovered ? 0.42 : 0.2
    bottleRef.current.position.x = THREE.MathUtils.lerp(bottleRef.current.position.x, targetX, 0.08)
    bottleRef.current.position.y = THREE.MathUtils.lerp(bottleRef.current.position.y, targetY, 0.08)

    // Ensure stream starts ONLY when the bottle is in place
    const isPouring = hovered && bottleRef.current.rotation.z > 1.3;

    // Animate liquid filling inside glass
    if (liquidRef.current) {
       const targetScaleY = isPouring ? 1 : 0.001
       liquidRef.current.scale.y = THREE.MathUtils.lerp(liquidRef.current.scale.y, targetScaleY, 0.05)
       liquidRef.current.position.y = THREE.MathUtils.lerp(liquidRef.current.position.y, isPouring ? -0.225 : -0.45, 0.05)
    }

    // Animate liquid stream connecting bottle and glass
    if (streamRef.current) {
        streamRef.current.scale.y = THREE.MathUtils.lerp(streamRef.current.scale.y, isPouring ? 1 : 0.001, 0.15)
        streamRef.current.position.y = THREE.MathUtils.lerp(streamRef.current.position.y, isPouring ? 0.1 : 0.4, 0.15)
    }
    
    // Group global opacity fade (smooth lerp)
    const targetGroupOpacity = dashboardRef?.current?.userData?.targetOpacity ?? (groupRef.current.parent?.userData?.targetOpacity || 0)
    const currentOpacity = groupRef.current.userData.opacity || 0
    const newOpacity = THREE.MathUtils.lerp(currentOpacity, targetGroupOpacity, 0.1)
    groupRef.current.userData.opacity = newOpacity
    
    // Hide entirely if invisible to save performance
    groupRef.current.visible = newOpacity > 0.01
    
    // Apply opacity to HTML CSS label
    if (labelRef.current) {
        labelRef.current.style.opacity = newOpacity
    }

    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material && child.material.name !== 'transmissionGlass') {
        child.material.transparent = true
        if (child === streamRef.current) {
            child.material.opacity = isPouring ? newOpacity * 0.8 : 0
        } else {
            child.material.opacity = newOpacity
        }
      }
    })
  })

  // Golden Kombucha Liquid Material
  const liquidMaterial = new THREE.MeshPhysicalMaterial({
    color: '#8a1226',     // Pomegranate Red
    transmission: 0.8,
    roughness: 0.1,
    thickness: 1.0,
    ior: 1.33,            // Water-like Index of Refraction
    transparent: true
  })

  // Common glass settings for MeshTransmissionMaterial
  const cupGlassSettings = {
    transmission: 1.0,
    thickness: 0.2,
    roughness: 0.02,
    ior: 1.5,
    chromaticAberration: 0.03,
    color: '#ffffff',
    resolution: 64, // Reduced resolution for massive performance gain
    samples: 2,
    transparent: true,
  }

  const bottleGlassSettings = {
    transmission: 0.95,
    thickness: 0.5,
    roughness: 0.1,
    ior: 1.5,
    chromaticAberration: 0.05,
    color: '#4a1f0a',     // Amber / Brown glass
    resolution: 64,
    samples: 2,
    transparent: true,
  }

  const bottlePoints = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0, -0.4));
    pts.push(new THREE.Vector2(0.18, -0.4)); // Bottom radius
    pts.push(new THREE.Vector2(0.18, 0.05)); // Body top
    // Shoulder curve
    pts.push(new THREE.Vector2(0.17, 0.1));
    pts.push(new THREE.Vector2(0.14, 0.15));
    pts.push(new THREE.Vector2(0.10, 0.20));
    pts.push(new THREE.Vector2(0.06, 0.25)); // Neck starts
    pts.push(new THREE.Vector2(0.06, 0.45)); // Neck top
    // Lip
    pts.push(new THREE.Vector2(0.075, 0.46));
    pts.push(new THREE.Vector2(0.075, 0.48));
    pts.push(new THREE.Vector2(0.06, 0.49));
    return pts;
  }, []);

  const liquidPoints = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0, -0.38));
    pts.push(new THREE.Vector2(0.16, -0.38));
    pts.push(new THREE.Vector2(0.16, 0.05));
    // Shoulder curve
    pts.push(new THREE.Vector2(0.15, 0.1));
    pts.push(new THREE.Vector2(0.12, 0.15));
    pts.push(new THREE.Vector2(0.08, 0.20));
    pts.push(new THREE.Vector2(0.04, 0.25));
    pts.push(new THREE.Vector2(0.04, 0.35)); // Liquid level
    pts.push(new THREE.Vector2(0, 0.35)); // Close the top of the liquid
    return pts;
  }, []);

  return (
    <group 
      ref={groupRef} 
      onPointerOver={() => {
        const targetOpacity = groupRef.current.parent?.userData?.targetOpacity || 0
        if (targetOpacity > 0.5) setHovered(true)
      }} 
      onPointerOut={() => setHovered(false)}
      scale={[0.9, 0.9, 0.9]}
    >
      {/* Invisible hover hitbox covering the entire scene area */}
      <mesh visible={false} position={[0, 0.3, 0]}>
        <boxGeometry args={[3.5, 3.5, 1.5]} />
      </mesh>

      {/* 3D Glass Cup (Pint style) */}
      <group ref={glassRef} position={[-0.4, -0.1, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.2, 0.5, 32]} />
          <MeshTransmissionMaterial name="transmissionGlass" {...cupGlassSettings} />
        </mesh>
        
        {/* Liquid inside Glass */}
        <mesh ref={liquidRef} material={liquidMaterial} position={[0, -0.225, 0]}>
          <cylinderGeometry args={[0.23, 0.18, 0.45, 32]} />
        </mesh>
      </group>

      {/* Liquid Stream (Connecting bottle to glass) */}
      <mesh ref={streamRef} position={[-0.4, 0.3, 0]} material={liquidMaterial}>
        <cylinderGeometry args={[0.015, 0.015, 0.8, 16]} />
      </mesh>

      {/* 2D Photorealistic Bottle Image (No Background) */}
      {/* We use the center of the bottle as the pivot for a natural sweeping pour arc */}
      <group ref={bottleRef} position={[0.6, 0.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.4, 1.4]} />
          <meshBasicMaterial map={bottleImg} transparent />
        </mesh>
      </group>

      {/* Message Popup */}
      <Html position={[-0.4, 0.9, 0.4]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          opacity: hovered ? (groupRef.current?.userData?.opacity || 1) : 0,
          transform: `translateY(${hovered ? '0px' : '20px'})`,
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.8rem',
          color: '#a25c48',
          background: 'rgba(250,249,246,0.95)',
          padding: '12px 24px',
          borderRadius: '30px',
          boxShadow: '0 8px 32px rgba(162, 92, 72, 0.15)',
          border: '1px solid rgba(162, 92, 72, 0.1)',
          whiteSpace: 'nowrap',
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          Enjoy Kombucha ....
        </div>
      </Html>
    </group>
  )
}
