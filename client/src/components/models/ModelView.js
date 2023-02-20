import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Model = (props) => {

    const { model } = props;
    let mixer;
    
    const { scene, animations } = useLoader(GLTFLoader, `/api/models/${ model }`);
    if (animations.length) {
        mixer = new THREE.AnimationMixer(scene);
        animations.forEach(clip => {
            const action = mixer.clipAction(clip);
            action.play();
        });
    }

    useFrame((_state, delta) => {
        mixer?.update(delta);
    });

    scene.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            child.material.side = THREE.FrontSide
        }
    });

    return (
        <>
            <primitive object={scene} scale={0.4} />
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
