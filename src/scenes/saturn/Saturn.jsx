import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";

export default function Saturn({ position, displacementScale, radius }) {
    const [saturnTexture, ringTexture] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_saturn.jpg',
        import.meta.env.BASE_URL + 'assets/2k_saturn_ring_alpha.png',
    ])

    return (
        <group position={position}>
            {/* 1. The Planet Sphere */}
            <mesh>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshPhongMaterial map={saturnTexture} displacementScale={displacementScale} />
            </mesh>

            {/* 2. The Rings */}
            <mesh rotation-x={-Math.PI / 2}>
                {/* UPDATED ARGS:
                   - Inner Radius: radius * 1.2 (Closer to planet surface)
                   - Outer Radius: radius * 4.0 (Much larger extension outward)
                   - Segments: 128 (Smoother edges for the larger size)
                */}
                <ringGeometry args={[radius * 1.2, radius * 4.0, 128]} />
                <meshPhongMaterial
                    map={ringTexture}
                    side={DoubleSide}
                    transparent={true}
                    opacity={1.0} // Increased from 0.8 to 1.0 for maximum boldness
                />
            </mesh>
        </group>
    )
}