import AnimatedStars from "./AnimatedStars.jsx";
import Earth from "./scenes/earth/Earth.jsx";
import { useRef } from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from 'three';

export default function MainContainer() {
    const pointLightRef = useRef(null);
    const orbitGroupRef = useRef(null);

    // ORBIT LOGIC: Rotate the entire group that holds the Earth
    useFrame((state, delta) => {
        if (orbitGroupRef.current) {
            // Adjust speed of orbit here (0.5 is the speed multiplier)
            orbitGroupRef.current.rotation.y += 0.2 * delta;
        }
    });

    return (
        <>
            <color attach={'background'} args={['black']} />

            <AnimatedStars />

            {/* --- THE SUN --- */}
            {/* 1. The Light Source */}
            <pointLight
                ref={pointLightRef}
                position={[0, 0, 0]}
                intensity={8000} // Increased intensity for physical lights in recent Three.js
                decay={2}
                distance={1000}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            {/* 2. The Visual Sun */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial color="#FFD700" />
            </mesh>

            {/* Glow effect helper around sun */}
            <mesh position={[0,0,0]}>
                <sphereGeometry args={[2.8, 32, 32]} />
                <meshBasicMaterial color="#FFA500" transparent opacity={0.2} />
            </mesh>

            {/* --- ORBITAL SYSTEM --- */}
            {/* We rotate this group to make anything inside it "orbit" the center */}
            <group ref={orbitGroupRef} rotation={[0, 0, 0]}>

                {/* --- THE EARTH --- */}
                {/* The Earth is offset by x=32 inside the rotating group */}
                <Earth
                    displacementScale={0.1}
                    position={[32, 0, 0]}
                />

                {/* Optional: Visual Orbit Line (Trajectory) */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[31.8, 32.2, 64]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
                </mesh>

            </group>

            {/* Ambient light for base visibility */}
            <ambientLight intensity={0.5} />
        </>
    );
}