import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [cameraId, setCameraId] = useState(null); 
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    if (scanResult) {
      const { username, presetID } = JSON.parse(scanResult);
      fetchUserInfo(username, presetID);
    }
  }, [scanResult]);

  const fetchUserInfo = async (username, presetID) => {
    try {
      const response = await axios.post("http://localhost:5050/users/get-info", {
        username,
        presetID,
      });
      setUserInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  };

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((cameras) => {
        if (cameras && cameras.length > 0) {
          const rearCamera = cameras.find((camera) =>
            camera.label.toLowerCase().includes("back")
          );
          const selectedCameraId = rearCamera ? rearCamera.id : cameras[0].id;
          
          setCameraId(selectedCameraId);
        }
      })
      .catch((err) => {
        console.error("Error getting cameras:", err);
      });
  }, []);

  useEffect(() => {
    if (cameraId) {
      navigator.mediaDevices
        .getUserMedia({ video: { deviceId: cameraId } })
        .then(() => {
          const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
              width: 250,
              height: 250,
            },
            fps: 5,
          });
          scanner.render(success, error);

          function success(result) {
            scanner.clear();
            setScanResult(result);
          }

          function error(err) {
            console.warn(err);
          }
        })
        .catch((err) => {
          console.error("Camera permission denied", err);
        });
    }

  }, [cameraId]);

  return (
    <div>
      <div id="reader"></div>
      {scanResult && (
        <div>
          Success! QR Code: <a href={scanResult}>{scanResult}</a>
        </div>
      )}

      {userInfo && (
        <div>
          <h3>User Info</h3>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Scanner;
