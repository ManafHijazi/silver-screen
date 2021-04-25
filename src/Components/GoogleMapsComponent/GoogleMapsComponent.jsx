import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { PropTypes } from 'prop-types';

const MapPoint = () => (
  <div className='map-marker'>
    <span className='mdi mdi-map-marker c-danger' />
  </div>
);

export const GoogleMapsComponent = ({
  defaultCenter,
  hoverDistance,
  defaultZoom,
  onClick,
  onChange,
  center,
  locations,
  searchLocationValue,
}) => {
  // google
  const [, setGoogle] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [premadeChildren] = useState(null);

  const onClickHandler = (clickValue) => {
    if (searchLocation) setSearchLocation(null);
    if (onClick) onClick(clickValue);
  };
  useEffect(() => {
    setSearchLocation(searchLocationValue);
  }, [searchLocationValue]);
  useEffect(() => {
    if (center && premadeChildren) premadeChildren.setCenter(center);
  }, [center, premadeChildren]);

  const handleMap = (map, maps) => {
    setGoogle(maps);
    // eslint-disable-next-line no-new
    new maps.DirectionsRenderer(map);
  };
  const mapOptions = {
    scrollwheel: true,
    zoomControlOptions: {
      //   position: 'RIGHT_CENTER',    // as long as this is not set it works
      style: 'SMALL',
    },
    mapTypeControlOptions: {
      position: 'BOTTOM_RIGHT', // this makes the map type control disappear
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'map'],
    },
    draggable: true,
    rotateControl: true,
    scaleControl: true,
    streetViewControl: true,
    panControl: true,
    mapTypeControl: true,
  };

  return (
    <div className='google-maps-wrapper'>
      <div className='google-maps'>
        {locations && (
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'ApiKey' }}
            hoverDistance={hoverDistance}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleMap(map, maps)}
            onClick={onClickHandler}
            onChange={onChange}
            options={mapOptions}
          >
            {locations &&
              locations.map((item, index) => (
                <MapPoint lat={item.latitude} lng={item.longitude} key={`${index + 1}-marker`} />
              ))}
          </GoogleMapReact>
        )}
      </div>
    </div>
  );
};
GoogleMapsComponent.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      text: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.instanceOf(Object)), // for popover content
      component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func, PropTypes.node]),
    })
  ).isRequired,
  searchLocationValue: PropTypes.instanceOf(Object),
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  hoverDistance: PropTypes.number,
  defaultZoom: PropTypes.number,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};
GoogleMapsComponent.defaultProps = {
  defaultCenter: { lat: 24.414833592365972, lng: 54.59777364239554 },
  hoverDistance: 30,
  defaultZoom: 10,
  onClick: undefined,
  onChange: undefined,
  center: undefined,
  searchLocationValue: null,
};
