import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Moon from "./Moon.jsx";
import ISS from "./ISS.jsx";

export default function Earth({ displacementScale = 0.2, position }) {
    const earthRef = useRef(null);

    const [
        earthTexture,
        earthNormalMap,
        earthSpecularMap,
        earthDisplacementMap,
    ] = useTexture([
        import.meta.env.BASE_URL + 'assets/earth_day.jpg',
        import.meta.env.BASE_URL + 'assets/earth_normal.jpg',
        import.meta.env.BASE_URL + 'assets/earth_specular.jpg',
        import.meta.env.BASE_URL + 'assets/earth_displacement.jpg',
    ]);

    useFrame(() => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group position={position}>
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
            <ISS />
            <Moon />
        </group>
    );
}