import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

const Model = ({ model }) => {
    const gltf = useLoader(GLTFLoader, `/api/models/${ model }`);
    return (
      <>
        <primitive object={gltf.scene} scale={0.4} />
      </>
    );
};

const ModelView = () => {
    const { model } = useParams();

    return (
        <div className="container" style={{ height: "calc(100vh - 145px)" }}>
            <Canvas flat>
                <Suspense fallback={ null }>
                    <Model model={ model } />
                    <OrbitControls />
                    <Environment preset="sunset" background />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default ModelView;
