```javascript
import { Camera, BarCodeScanner } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setBarcodeData(data);
      setScanned(true);
      console.log('Scanned barcode:', data);
    }, 500); // Adjust debounce time as needed
  };

  if (hasPermission === null) {
    return <View />; // Or a loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && (
        <Button title={'Scan again'} onPress={() => setScanned(false)} />
      )}
      {barcodeData && (
          <Text>Barcode Data: {barcodeData}</Text>
      )}
    </View>
  );
};

export default App; 
```