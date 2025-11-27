import { useHelper } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars.jsx";
import Earth from "./scenes/earth/Earth.jsx";
import { useRef } from "react";
import * as THREE from "three";

export default function MainContainer() {
    const directionalLightRef = useRef(null);
    const directionalLightRef2 = useRef(null);
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
    useHelper(directionalLightRef2, THREE.DirectionalLightHelper, 1, 'hotpink')
    return (<>
        <color attach={'background'} args={['black']} />
        <AnimatedStars />
        <directionalLight ref={directionalLightRef} position={[0, 0, 10]}
            intensity={3} castShadow

            //color={0xff0000}
        />
        <directionalLight ref={directionalLightRef2} position={[0, 0, -10]} castShadow />
        {/*<ambientLight />*/}
        <Earth displacementScale={0.1} />
    </>)
}