import MainContainer from "./MainContainer.jsx";
import {Canvas} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

function App() {
    console.log(import.meta.env.BASE_URL)

  return <Canvas shadows camera={{
      fov: 75, near: 0.1, far: 1000, position: [0, 3, 3]
  }}>
      <Perf />
      <OrbitControls />
      <MainContainer />
  </Canvas>
}

export default App
