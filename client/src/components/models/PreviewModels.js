import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModels } from "../../actions/modelOps";

const ModelCard = ({ model }) => {
    const model_title = model.split("-")[1];
    
    return (
        <div className="col-md-4 p-2">
            <div className="card" onClick={() => {
                window.location.href=`/models/${ model }`;
            }}>
                <div className="card-body">
                    <h5 className="card-title">{ model_title }</h5>
                </div>
            </div>
        </div>
    );
};

const PreviewModels = () => {
    const { models } = useSelector(state => state.modelOps);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(getModels());
    }, [dispatch]);

    return (
        <div className="container">
            <div className="row no-gutters">
                {
                    models.map(model => <ModelCard key={ model } model={ model } />)
                }
            </div>
        </div>
    );
};

export default PreviewModels;
