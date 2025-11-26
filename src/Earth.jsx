import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Moon from "./Moon";

export default function Earth({ displacementScale = 0.2 }) {
    const earthRef = useRef(null);

    const [
        earthTexture,
        earthNormalMap,
        earthSpecularMap,
        earthDisplacementMap,
    ] = useTexture([
        '/assets/earth_day.jpg',
        '/assets/earth_normal.jpg',
        '/assets/earth_specular.jpg',
        '/assets/earth_displacement.jpg',
    ]);

    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group>
            <mesh receiveShadow ref={earthRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhongMaterial
                    map={earthTexture}
                    normalMap={earthNormalMap}
                    specularMap={earthSpecularMap}
                    displacementMap={earthDisplacementMap}
                    displacementScale={displacementScale}
                    shininess={10}
                />
            </mesh>
            <Moon />
        </group>
    );
}