import { OrbitControls, useHelper } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars.jsx";
import Earth from "./Eath.jsx";
import { useRef } from "react";
import * as THREE from "three";

export default function MainContainer() {
    const directionalLightRef = useRef(null);
    const directionalLightRef2 = useRef(null);
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
    useHelper(directionalLightRef2, THREE.DirectionalLightHelper, 1, 'hotpink')
    return (<>
        <color attach={'background'} args={['black']} />
        <OrbitControls />
        <AnimatedStars />
        <directionalLight ref={directionalLightRef} position={[0, 0, 10]}
            intensity={3}
            //color={0xff0000}
        />
        <directionalLight ref={directionalLightRef2} position={[0, 0, -10]} />
        <Earth />
    </>)
}