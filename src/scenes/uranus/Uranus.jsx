import {useTexture} from "@react-three/drei";

export default function Uranus({ position, displacementScale, radius }) {
    const [uranusTexture] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_uranus.jpg',
    ])

    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshPhongMaterial map={uranusTexture} displacementScale={displacementScale} />
        </mesh>
    )
}