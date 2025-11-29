import { useTexture } from "@react-three/drei";

export default function Venus({ position, displacementScale, radius }) {
    const [venusSurface, venusAtmosphere] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_venus_surface.jpg',
        import.meta.env.BASE_URL + 'assets/2k_venus_atmosphere.jpg',
    ])

    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshPhongMaterial map={venusSurface} displacementScale={displacementScale} />
            </mesh>
            <mesh>
                <sphereGeometry args={[radius * 1.1, 64, 64]} />
                <meshPhongMaterial
                    map={venusAtmosphere}
                    transparent={true}
                    opacity={0.9}
                />
            </mesh>
        </group>
    )
}