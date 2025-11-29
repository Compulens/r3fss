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
            {/* We rotate the mesh -90deg on X to make the ring lie flat */}
            <mesh rotation-x={-Math.PI / 2}>
                {/* args: [innerRadius, outerRadius, segments] */}
                <ringGeometry args={[1.4, 2.4, 64]} />
                <meshPhongMaterial
                    map={ringTexture}
                    side={DoubleSide} // Important: renders both top and bottom of the ring
                    transparent={true}
                    opacity={0.8}
                />
            </mesh>
        </group>
    )
}