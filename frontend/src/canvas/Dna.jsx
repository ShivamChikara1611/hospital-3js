import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';

const DnaCanvas = (props) => {
    const { nodes, materials } = useGLTF('./dna/scene.gltf');
    const groupRef = useRef();  // Reference to the group for rotation

    // Add automatic rotation using the useFrame hook
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.008;  // Rotation speed
        }
    });

    return (
        <group ref={groupRef} {...props} dispose={null}>
            <group
                position={[0, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                userData={{ name: 'Sketchfab_model' }}
            >
                <group
                    rotation={[Math.PI / 2, 0, 0]}
                    userData={{ name: 'RootNode' }}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes?.DNA_Material_0?.geometry}
                        material={materials?.Material}
                        position={[0, 0, -Math.PI / 5]} 
                        rotation={[-Math.PI / 2, 0, 0]} 
                        scale={0.5}
                        userData={{ name: 'DNA_Material_0' }}
                    />
                </group>
            </group>
        </group>
    );
};

// Preload the GLTF model
useGLTF.preload('./dna/scene.gltf');

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

// Fallback loader inside the canvas (could be a 3D object or null)
const Loader = () => {
    return (
        <mesh>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="black" />
        </mesh>
    );
};

// Main Component with Canvas and Suspense
const DnaApp = () => {
    return (
        <div style={{ width: '100%', height: '100%', opacity: 0.4 }}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Canvas shadows>
                    <directionalLight position={[0, 0, 10]} intensity={3} />
                    <Suspense fallback={<Loader />}>
                        <DnaCanvas />
                        {/* <OrbitControls enableZoom={false} /> */}
                    </Suspense>
                </Canvas>
            </ErrorBoundary>
        </div>
    );
};

export default DnaApp;
