import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { uploadModelFile } from '../../actions/modelOps';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loaderr } = useSelector(state => state.modelOps);

  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "file");

  inputElement.onchange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      dispatch(uploadModelFile(file, navigate));
    }
  };

  const onUpload = (e) => {
    e.preventDefault();
    inputElement.click();
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Upload 3d models</h1>
      <p className="lead">
        <i className="fas fa-user" /> Try to use FBX/GLTF/GLB models 
      </p>

      <div className="btn-group">
        <Link to="#" className="btn btn-primary" onClick={ onUpload }>Upload Model</Link>
        <Link to="/models" className="btn btn-primay">Preview Models</Link>
      </div>
      {
        loaderr && (
          <div className="alert alert-danger" role="alert">
            Please upload valid fbx/gltf/glb model.
          </div>
        )
      }
    </section>
  );
};

export default Dashboard;
