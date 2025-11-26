import { useTexture } from "@react-three/drei";

export default function Earth() {
    //console.log(process.cwd())
    const [earthTexture] = useTexture(['/assets/earth_day.jpg']);
    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={earthTexture} />
        </mesh>
    )
}