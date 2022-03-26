import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const APIKEY = import.meta.env.REACT_APP_RAPID_API_TRAVEL_API_KEY;

const Map = ({ coords, places, setCoords, setBounds, setChildClicked, setMap }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  const apiHasLoaded = ((map, mapsApi) => {
    console.log("++++++++++++++++++++++++++++++");

    let placesService = new mapsApi.places.PlacesService(map);

    console.log(coords.lat);
    console.log(coords.lng);

    const markerLatLng = new mapsApi.LatLng(coords.lat, coords.lng);

    const placesRequest = {
      location: markerLatLng,
      // radius: '30000', // Cannot be used with rankBy. Pick your poison!
      type: ['convenience_store', 'supermarkete'], // List of types: https://developers.google.com/places/supported_types
      query: 'grocery',
      rankBy: mapsApi.places.RankBy.DISTANCE, // Cannot be used with radius.
    };

    placesService.textSearch(placesRequest, ((response) => {
      console.log("===================================")
      console.log(response)
      //places = response;
    }));

  });


  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyBTjN0CP-rhi__o39cqDLJpvzNAZmmwRuM',
          libraries: ['places', 'directions']
        }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      >
        {places.length && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))
        }
      </GoogleMapReact >
    </div >
  );
};

export default Map;
