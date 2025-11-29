import {useRef} from "react";
import {useTexture} from "@react-three/drei";

export default function Sun() {
    const pointLightRef = useRef(null);
    const [sunTexture] = useTexture([
        import.meta.env.BASE_URL + 'assets/2k_sun.jpg'
    ]);

    return (
        <>
            <pointLight
                ref={pointLightRef}
                position={[0, 0, 0]}
                intensity={8000} // Increased intensity for physical lights in recent Three.js
                decay={2}
                distance={1000}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            {/* 2. The Visual Sun */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshPhongMaterial map={sunTexture} />
                {/*<meshBasicMaterial color="#FFD700" />*/}
            </mesh>

            {/* Glow effect helper around sun */}
            <mesh position={[0,0,0]}>
                <sphereGeometry args={[2.8, 32, 32]} />
                <meshBasicMaterial color="#FFA500" transparent opacity={0.2} />
            </mesh>
        </>
    )
}