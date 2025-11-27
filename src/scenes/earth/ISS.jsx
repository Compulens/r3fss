import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
const X_AXIS = 2;


export default function ISS(factory, deps) {
    const issRef = useRef(null);
    const memoizedISS = useMemo(() => {
        return useGLTF('/assets/ISSModel/ISS_stationary.gltf')
    })
    
    useFrame(({ clock }) => {
        // Orbit rotation
        const SPEED = .5;
        issRef.current.position.x = Math.sin(clock.getElapsedTime() * SPEED) * X_AXIS;
        issRef.current.position.z = Math.cos(clock.getElapsedTime() * SPEED) * X_AXIS;
    });
    return (
        <mesh >
            <primitive
                ref={issRef}
                object={memoizedISS.scene}
                position={[X_AXIS, 0, 0]}
                scale={.005}
            />
        </mesh>
    )
}