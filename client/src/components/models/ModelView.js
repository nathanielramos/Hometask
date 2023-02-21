import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import FbxModelViewer from "./FbxModelViewer";
import GltfModelViewer from "./GltfModelViewer";

const Model = (props) => {

    const { model } = props;
    const modelPath = `/api/models/${ model }`;

    return (
        <>
            {
                model.endsWith(".fbx") ? <FbxModelViewer modelPath={ modelPath } /> : <GltfModelViewer modelPath={ modelPath } />
            }
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
