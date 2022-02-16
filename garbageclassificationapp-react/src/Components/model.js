import * as tf from "@tensorflow/tfjs";
import React from "react";
import "@tensorflow/tfjs-backend-webgl";
import { useState, useRef, useEffect } from "react";

export default function RefModel() {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([]);
    const [history, setHistory] = useState([]);

    const imageRef = useRef();
    const textInputRef = useRef();
    const fileInputRef = useRef();

    const labels = ["cardboard", "glass", "metal", "paper", "plastic", "trash"];

    const loadModel = async () => {
        setIsModelLoading(true);
        try {
            const model = await tf.loadLayersModel(
                "https://raw.githubusercontent.com/delferns2001/FYP/master/Practice%20Trained%20Model/6classes_inceptionV3_20TE/model.json"
            );
            setModel(model);
            setIsModelLoading(false);
        } catch (error) {
            console.log(error);
            setIsModelLoading(false);
        }
    };

    const uploadImage = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageURL(url);
        } else {
            setImageURL(null);
        }
        console.log(isModelLoading);
        console.log(model);
        console.log(imageURL);
        console.log(results);
        console.log(history);
        console.log(imageRef);
        console.log(fileInputRef);
        console.log(textInputRef);
    };

    function indexOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }

        var max = arr[0];
        var maxIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        return maxIndex;
    }

    const identify = async () => {
        textInputRef.current.value = "";

        const image = tf.reshape(
            tf.browser.fromPixels(imageRef.current).resizeBilinear([300, 300]),
            [1, 300, 300, 3]
        );

        const prob = await model.predict(image);
        prob.print();
        console.log(await prob.array());

        // const data = prob.dataSync();

        tf.reshape(prob, [6]);
        // prob.print();
        const data = await prob.array();
        console.log(data);
        console.log(labels[indexOfMax(data[0])]);
        setResults(labels[indexOfMax(data[0])]);
        // console.log(tf.variable(prob));

        // const results = await model.classify(imageRef.current);
    };

    const handleOnChange = (e) => {
        setImageURL(e.target.value);
        setResults([]);
    };

    const triggerUpload = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        loadModel();
    }, []);

    useEffect(() => {
        if (imageURL) {
            setHistory([imageURL, ...history]);
        }
    }, [imageURL]);

    if (isModelLoading) {
        return <h2>Model Loading...</h2>;
    }

    // let imagepath = "/plastic1.jpg";
    // const img = document.getElementById("img");
    //
    // let imagetensor = tf.browser.fromPixels(imagepath);
    // const imgtf = tf.browser.fromPixels(img);

    // async function loadModel1() {
    //     model = await tf.loadLayersModel(
    //         "https://raw.githubusercontent.com/delferns2001/FYP/master/Practice%20Trained%20Model/jstestmodel_10epochs/model.json"
    //     );

    //     console.log("model loaded");
    //     console.log(model.weights);
    //     model.predict();

    //     // var input_xs = tf.tensor2d([[1, 0]]);
    //     // output = model.predict(input_xs);
    //     // console.log(output);
    // }

    return (
        <div className="App">
            {/* <h1 className="header">Image Identification</h1> */}
            <div className="inputHolder">
                <input
                    type="file"
                    accept="image/*"
                    capture="camera"
                    className="uploadInput"
                    onChange={uploadImage}
                    ref={fileInputRef}
                />
                <button className="uploadImage" onClick={triggerUpload}>
                    Upload Image
                </button>
                <span className="or">OR</span>
                <input
                    type="text"
                    placeholder="Paster image URL"
                    ref={textInputRef}
                    onChange={handleOnChange}
                />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && (
                            <img
                                src={imageURL}
                                alt="Upload Preview"
                                crossOrigin="anonymous"
                                ref={imageRef}
                            />
                        )}

                        <div className="result" key={results}>
                            <h1>
                                Results: <span className="name">{results}</span>
                            </h1>
                        </div>
                    </div>
                    {imageURL && (
                        <button className="button" onClick={identify}>
                            Identify Image
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
