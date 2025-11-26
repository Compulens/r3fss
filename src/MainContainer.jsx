import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars.jsx";

export default function MainContainer() {
    return (<Canvas>
        <color attach={'background'} args={['black']} />
        <OrbitControls />
        <AnimatedStars />
    </Canvas>)
}