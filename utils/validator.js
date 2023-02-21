const gltfValidator = require('gltf-validator');
const fbxParser = require('fbx-parser');
const fs = require('fs');

const model_validator = ( filepath ) => {
    return new Promise((resolve, reject) => {
        const fileContent = fs.readFileSync(filepath);
        const binaryContent = new Uint8Array(fileContent);

        gltfValidator.validateBytes(binaryContent)
            .then(() => {
                resolve();
            })
            .catch(() => {
                try {
                    fbxParser.parseBinary(binaryContent);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
    });
};

exports.model_validator = model_validator;
