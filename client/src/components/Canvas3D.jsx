// client/src/components/Canvas3D.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function Canvas3D({ url = '/sample.glb' }) {
  return (
    <Canvas style={{ width: '100%', height: '400px', background: '#111' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <OrbitControls />
      <Model url={url} />
    </Canvas>
  );
}
