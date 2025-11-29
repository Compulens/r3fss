import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";
import * as THREE from "three";

export default function Saturn({ radius }) {
    const [saturnTexture, ringTexture] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_saturn.jpg',
        import.meta.env.BASE_URL + 'assets/2k_saturn_ring_alpha.png',
    ]);

    return (
        // Rotate the whole group ~27 degrees on X (0.47 radians) to simulate axial tilt
        <group rotation={[0.47, 0, 0]}>

            {/* 1. The Planet Sphere */}
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshStandardMaterial map={saturnTexture} />
            </mesh>

            {/* 2. The Rings */}
            {/* rotation-x={-Math.PI / 2} lies the ring flat relative to the planet.
                Because the parent group is tilted, the ring will appear tilted in the scene.
            */}
            <mesh rotation-x={-Math.PI / 2} castShadow receiveShadow>
                {/* Inner Radius: 1.2 * radius (Gap between planet and ring)
                   Outer Radius: 2.3 * radius (More realistic width than 4.0)
                */}
                <ringGeometry args={[radius * 1.2, radius * 2.3, 128]} />
                <meshStandardMaterial
                    map={ringTexture}
                    side={DoubleSide}
                    transparent={true}
                    opacity={1.0}
                    roughness={0.4} // Adds a little light scattering
                />
            </mesh>
        </group>
    )
}