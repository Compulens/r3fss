import {useTexture} from "@react-three/drei";

export default function Mars({ position, displacementScale, radius }) {
    const [marsTexture] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_mars.jpg',
    ])

    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshPhongMaterial map={marsTexture} displacementScale={displacementScale} />
        </mesh>
    )
}