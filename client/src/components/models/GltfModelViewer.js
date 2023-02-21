import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GltfModelViewer = ({ modelPath }) => {
    const { scene, animations } = useLoader(GLTFLoader, modelPath);
    let mixer;

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
            <primitive object={scene} scale={0.7} />
        </>
    );
};

export default GltfModelViewer;
