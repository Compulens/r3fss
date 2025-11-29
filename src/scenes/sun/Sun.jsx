import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Sun() {
    const pointLightRef = useRef(null);
    const [sunTexture] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_sun.jpg'
    ]);

    return (
        <group>
            {/* 1. THE LIGHT SOURCE */}
            <pointLight
                ref={pointLightRef}
                position={[0, 0, 0]}
                intensity={2000} // High intensity for physically correct lighting
                decay={2}
                distance={1000}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0001}
            />

            {/* 2. THE SUN MESH
               Use meshBasicMaterial so the sun is always fully bright
               and ignores lighting conditions (it IS the light).
            */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial map={sunTexture} />
            </mesh>

            {/* 3. INNER GLOW (Intense, Red-Orange)
               'blending={THREE.AdditiveBlending}' adds the color to the background
               making it look like light.
            */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[2.7, 32, 32]} />
                <meshBasicMaterial
                    color="#FF4500"
                    transparent
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide} // Draws on the inside to prevent clipping artifacts
                />
            </mesh>

            {/* 4. OUTER GLOW (Softer, Orange) */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[3.2, 32, 32]} />
                <meshBasicMaterial
                    color="#FFA500"
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    )
}