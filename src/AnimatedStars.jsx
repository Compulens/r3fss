import { Stars } from '@react-three/drei';
import { useRef } from "react";
import {useFrame} from "@react-three/fiber";

export default function AnimatedStars() {
    const starsRef = useRef(null);
    useFrame(() => {
        starsRef.current.rotation.x += .0001
        starsRef.current.rotation.y += .0001
        starsRef.current.rotation.z += .0001
    })
    return <Stars ref={starsRef} />;
}