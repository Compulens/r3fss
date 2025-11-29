import {useTexture} from "@react-three/drei";

export default function Mercury({ position, displacementScale, radius }) {
    const [mercuryTexture] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_mercury.jpg',
    ])

    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshPhongMaterial map={mercuryTexture} displacementScale={displacementScale} />
        </mesh>
    )
}