import {useTexture} from "@react-three/drei";

export default function Neptune({ position, displacementScale, radius }) {
    const [neptuneTexture] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_neptune.jpg',
    ])

    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshPhongMaterial map={neptuneTexture} displacementScale={displacementScale} />
        </mesh>
    )
}