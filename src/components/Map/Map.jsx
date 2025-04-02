import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({ coordinates, places = [], setCoordinates, setBounds, setChildClicked, weatherData = {} }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  // Ensure coordinates are valid, otherwise set default
  const defaultCenter = coordinates && coordinates.lat && coordinates.lng
    ? coordinates
    : { lat: 40.7128, lng: -74.0060 }; // Default to NYC

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        center={coordinates} // Ensure we use dynamic coordinates here
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          if (setCoordinates && setBounds) {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }
        }}
        onChildClick={(child) => setChildClicked && setChildClicked(child)}
      >
        {/* Render Places */}
        {places.map((place, i) => (
          <div
            key={i}
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!matches ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={place.photo?.images?.large?.url || 'https://wallpapercave.com/wp/wp1874173.jpg'}
                  alt={place.name}
                />
                <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}

        
      </GoogleMapReact>
    </div>
  );
};

export default Map;
