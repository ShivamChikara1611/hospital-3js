import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';

// Main component to load and render the GLTF model
const StethoscopeCanvas = (props) => {
    const { nodes, materials } = useGLTF('./stethoscope/scene.gltf');
    const groupRef = useRef();  // Reference to the group for rotation

    // Add automatic rotation using the useFrame hook
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;  // Rotation speed
        }
    });

    return (
        <group ref={groupRef} {...props} dispose={null}>
            <group position={[-0.879, -0.627, 0]} scale={0.1}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_4.geometry}
                    material={materials.Material}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials['Material.001']}
                />
            </group>
        </group>
    );
};

// Preload the GLTF model
useGLTF.preload('./stethoscope/scene.gltf');

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
const StethoscopeApp = () => {
    return (
        <div style={{ width: '100%', height: '100%', opacity: 0.5}}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Canvas shadows>
                    <directionalLight position={[0, 0, 10]} intensity={20} />
                    <ambientLight intensity={5} /> {/* Add ambient light for softer illumination */}
                    <Suspense fallback={<Loader />}>
                        <StethoscopeCanvas />
                        {/* Uncomment to enable interactivity */}
                        <OrbitControls enableZoom={false} />
                    </Suspense>
                </Canvas>
            </ErrorBoundary>
        </div>
    );
};

export default StethoscopeApp;
