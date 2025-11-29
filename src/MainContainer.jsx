import AnimatedStars from "./AnimatedStars.jsx";
import { useRef, useMemo } from "react";
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
const EllipticalOrbit = ({
                             xRadius,
                             zRadius,
                             speed,
                             initialOffset = 0,
                             showOrbitPath = true, // Defaulted to true now
                             orbitColor = "#555555", // Added a prop for color control
                             children
                         }) => {
    const planetRef = useRef(null);
    const angleRef = useRef(initialOffset);

    useFrame((state, delta) => {
        angleRef.current += speed * delta * 0.2;

        const x = xRadius * Math.cos(angleRef.current);
        const z = zRadius * Math.sin(angleRef.current);

        if (planetRef.current) {
            planetRef.current.position.set(x, 0, z);
        }
    });

    const orbitGeometry = useMemo(() => {
        // Create the ellipse path
        const curve = new THREE.EllipseCurve(0, 0, xRadius, zRadius, 0, 2 * Math.PI, false, 0);
        // 64 points is usually enough for a smooth circle/ellipse
        const points = curve.getPoints(64);
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [xRadius, zRadius]);

    return (
        <>
            <group ref={planetRef}>
                {children}
            </group>

            {showOrbitPath && (
                <line geometry={orbitGeometry} rotation={[-Math.PI / 2, 0, 0]}>
                    <lineBasicMaterial attach="material" color={orbitColor} transparent opacity={0.3} />
                </line>
            )}
        </>
    );
};

export default function MainContainer() {
    return (
        <>
            <color attach={'background'} args={['black']} />
            <AnimatedStars />

            <Sun />

            {/* --- ORBITAL SYSTEM --- */}

            {/* MERCURY */}
            <EllipticalOrbit xRadius={10} zRadius={8} speed={4.0} initialOffset={0} showOrbitPath>
                <Mercury radius={0.4} />
            </EllipticalOrbit>

            {/* VENUS */}
            <EllipticalOrbit xRadius={15} zRadius={14} speed={3.0} initialOffset={Math.PI} showOrbitPath>
                <Venus radius={0.9} />
            </EllipticalOrbit>

            {/* EARTH */}
            <EllipticalOrbit xRadius={20} zRadius={18} speed={2.0} initialOffset={1} showOrbitPath>
                <Earth radius={1} displacementScale={0.1} />
            </EllipticalOrbit>

            {/* MARS */}
            <EllipticalOrbit xRadius={25} zRadius={22} speed={1.6} initialOffset={3.5} showOrbitPath>
                <Mars radius={0.6} />
            </EllipticalOrbit>

            {/* JUPITER */}
            <EllipticalOrbit xRadius={45} zRadius={40} speed={0.8} initialOffset={5} showOrbitPath>
                <Jupiter radius={3.5} />
            </EllipticalOrbit>

            {/* SATURN */}
            <EllipticalOrbit xRadius={70} zRadius={60} speed={0.5} initialOffset={2} showOrbitPath>
                <Saturn radius={3} />
            </EllipticalOrbit>

            {/* URANUS */}
            <EllipticalOrbit xRadius={90} zRadius={80} speed={0.3} initialOffset={4} showOrbitPath>
                <Uranus radius={1.5} />
            </EllipticalOrbit>

            {/* NEPTUNE */}
            <EllipticalOrbit xRadius={105} zRadius={95} speed={0.2} initialOffset={0.5} showOrbitPath>
                <Neptune radius={1.5} />
            </EllipticalOrbit>

            <ambientLight intensity={0.1} />
            <pointLight position={[0, 0, 0]} intensity={2} decay={0} />
        </>
    );
}