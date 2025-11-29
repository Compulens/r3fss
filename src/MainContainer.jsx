import AnimatedStars from "./AnimatedStars.jsx";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

import Sun from "./scenes/sun/Sun.jsx";
import Mercury from "./scenes/mercury/Mercury.jsx";
import Venus from "./scenes/venus/Venus.jsx";
import Earth from "./scenes/earth/Earth.jsx";
import Mars from "./scenes/mars/Mars.jsx";
import Jupiter from "./scenes/jupiter/Jupiter.jsx";
import Saturn from "./scenes/saturn/Saturn.jsx";
import Uranus from "./scenes/uranus/Uranus.jsx";
import Neptune from "./scenes/neptune/Neptune.jsx";

export default function MainContainer() {
    const orbitGroupRef = useRef(null);

    useFrame((state, delta) => {
        // Rotates the entire solar system slowly around the sun
        orbitGroupRef.current.rotation.y += 0.05 * delta;
    });

    return (
        <>
            <color attach={'background'} args={['black']} />
            <AnimatedStars />

            {/* SUN: Scale depends on your Sun component, usually it's the largest */}
            <Sun />

            {/* --- ORBITAL SYSTEM --- */}
            <group ref={orbitGroupRef} rotation={[0, 0, 0]}>

                {/* 1. MERCURY - Smallest, closest */}
                <Mercury position={[10, 0, 0]} radius={0.4} />

                {/* 2. VENUS - Similar size to Earth */}
                <Venus position={[15, 0, 0]} radius={0.9} />

                {/* 3. EARTH - The reference point (Radius 1) */}
                <Earth
                    position={[20, 0, 0]}
                    radius={1}
                    displacementScale={0.1}
                />

                {/* Earth Trajectory Line (Updated to match Earth pos 20) */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[19.8, 20.2, 128]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
                </mesh>

                {/* 4. MARS - Smaller than Earth ("The Red Planet") */}
                <Mars position={[25, 0, 0]} radius={0.6} />

                {/* 5. JUPITER - The Giant (Massive jump in size and distance) */}
                <Jupiter position={[45, 0, 0]} radius={3.5} />

                {/* 6. SATURN - Large, plus needs extra space for Rings */}
                <Saturn position={[70, 0, 0]} radius={3} />

                {/* 7. URANUS - Ice Giant */}
                <Uranus position={[90, 0, 0]} radius={1.5} />

                {/* 8. NEPTUNE - Ice Giant */}
                <Neptune position={[105, 0, 0]} radius={1.5} />

            </group>

            {/* Ambient light adjusted for better contrast in space */}
            <ambientLight intensity={0.1} />
            {/* Point light from the Sun (Essential for shadows/phases) */}
            <pointLight position={[0, 0, 0]} intensity={2} decay={0} />
        </>
    );
}