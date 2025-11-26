import { useTexture } from "@react-three/drei";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

export default function Earth({ displacementScale }) {
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
        earthRef.current.rotation.y += .002;
    })

    return (
        <mesh ref={earthRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial
                map={earthTexture}
                normalMap={earthNormalMap}
                specularMap={earthSpecularMap}
                displacementMap={earthDisplacementMap}
                displacementScale={displacementScale}
            />
        </mesh>
    )
}