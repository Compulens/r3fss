import {useTexture} from "@react-three/drei";

export default function Jupiter({ position, displacementScale, radius }) {
    const [jupiterTexture] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_jupiter.jpg',
    ])

    return (
        <mesh position={position}>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshPhongMaterial map={jupiterTexture} displacementScale={displacementScale} />
        </mesh>
    )
}