import React, {useEffect, useState} from "react";
import {ExpoLeaflet} from "expo-leaflet";
import * as Location from 'expo-location';
import {View} from "react-native";

const Leaflet = () => {

    const [userCurrentLocation, setUserCurrentLocation] = useState({
        coords: {
            latitude: 50,
            longitude: 15
        }
    });

    const [locationNotGranted, setLocationNotGranted] = useState(null);

    useEffect(() => {

        const getCurrentPosition = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationNotGranted('Permission to access location was denied');
                return;
            }

            return Location.getCurrentPositionAsync({});
        }
        getCurrentPosition().then((location) => setUserCurrentLocation(location))

    }, []);

    const mapLayers = [
        {
            attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            baseLayerIsChecked: true,
            baseLayerName: "OpenStreetMap.Mapnik",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        },
    ]

    const mapMarkers = [
        {
            id: "0",
            position: {
                lat: 50.428872222222,
                lng: 15.582430555556,
            },
            icon: "https://www.pinclipart.com/picdir/middle/537-5374089_react-js-logo-clipart.png",
            size: [32, 32],
        },
    ]

    return (
        <View style={{backgroundColor: "black", height: "100%"}}>
            <ExpoLeaflet
                backgroundColor={"white"}
                onMessage={(message) => ""}
                mapLayers={mapLayers}
                mapMarkers={mapMarkers}
                mapCenterPosition={{
                    lat: userCurrentLocation.coords.latitude,
                    lng: userCurrentLocation.coords.longitude,
                }}
                zoom={15}
            />
        </View>
    )

}

export default Leaflet;
