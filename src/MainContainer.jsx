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

// --- HELPER COMPONENT ---
// This wraps a planet and rotates it around the center (0,0,0)
const PlanetOrbit = ({ speed, initialOffset = 0, children }) => {
    const orbitRef = useRef(null);

    useFrame((state, delta) => {
        orbitRef.current.rotation.y += speed * delta;
    });

    return (
        <group ref={orbitRef} rotation={[0, initialOffset, 0]}>
            {children}
        </group>
    );
};

export default function MainContainer() {
    return (
        <>
            <color attach={'background'} args={['black']} />
            <AnimatedStars />

            <Sun />

            {/* --- ORBITAL SYSTEM --- */}

            {/* MERCURY: Fastest orbit (speed 4), starts at angle 0 */}
            <PlanetOrbit speed={4.0} initialOffset={0}>
                <Mercury position={[10, 0, 0]} radius={0.4} />
            </PlanetOrbit>

            {/* VENUS: Slower (speed 3), starts at 180 degrees (Math.PI) */}
            <PlanetOrbit speed={3.0} initialOffset={Math.PI}>
                <Venus position={[15, 0, 0]} radius={0.9} />
            </PlanetOrbit>

            {/* EARTH: Reference speed (2.0), random start angle */}
            <PlanetOrbit speed={2.0} initialOffset={1}>
                <Earth position={[20, 0, 0]} radius={1} displacementScale={0.1} />

                {/* Earth Trajectory Line
                    Note: Since this ring is inside the rotating group, it spins WITH the earth.
                    For a solid line, this is invisible, so it works fine. */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[19.8, 20.2, 128]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
                </mesh>
            </PlanetOrbit>

            {/* MARS: Slower (1.6) */}
            <PlanetOrbit speed={1.6} initialOffset={3.5}>
                <Mars position={[25, 0, 0]} radius={0.6} />
            </PlanetOrbit>

            {/* JUPITER: Much slower (0.8) */}
            <PlanetOrbit speed={0.8} initialOffset={5}>
                <Jupiter position={[45, 0, 0]} radius={3.5} />
            </PlanetOrbit>

            {/* SATURN: (0.5) */}
            <PlanetOrbit speed={0.5} initialOffset={2}>
                <Saturn position={[70, 0, 0]} radius={3} />
            </PlanetOrbit>

            {/* URANUS: (0.3) */}
            <PlanetOrbit speed={0.3} initialOffset={4}>
                <Uranus position={[90, 0, 0]} radius={1.5} />
            </PlanetOrbit>

            {/* NEPTUNE: Slowest (0.2) */}
            <PlanetOrbit speed={0.2} initialOffset={0.5}>
                <Neptune position={[105, 0, 0]} radius={1.5} />
            </PlanetOrbit>

            <ambientLight intensity={0.1} />
            <pointLight position={[0, 0, 0]} intensity={2} decay={0} />
        </>
    );
}