import { useTexture } from "@react-three/drei";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

export default function Moon() {
    const moonRef = useRef(null);

    const [moonTexture] = useTexture([
        '/assets/2k_moon.jpg',
    ]);

    useFrame(({ clock }) => {
        // Orbit rotation
        const AMPLITUDE = 4;
        const SPEED = .5;
        moonRef.current.position.x = Math.sin(clock.getElapsedTime() * SPEED) * AMPLITUDE;
        moonRef.current.position.z = Math.cos(clock.getElapsedTime() * SPEED) * AMPLITUDE;
        // Rotates the Moon on its own axis
        moonRef.current.rotation.y += 0.002;
    });

    return (
        // Position fixed to [4, 0, 0] to be visible relative to Earth
        <mesh castShadow ref={moonRef} position={[4, 0, 0]}>
            <sphereGeometry args={[0.5, 64, 64]} />
            <meshPhongMaterial
                map={moonTexture}
            />
        </mesh>
    );
}