import React from "react";
import { useFBX } from "@react-three/drei";

const FbxModelViewer = ({ modelPath }) => {
  const fbx = useFBX(modelPath);

  return <primitive object={fbx} scale={0.05} />;
};

export default FbxModelViewer;
