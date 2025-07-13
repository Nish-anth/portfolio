import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';

const GlobeComponent = ({ isHovered }) => {
  const globeEl = useRef(null);
  const globeInstanceRef = useRef(null);

  // Effect for hover interaction
  useEffect(() => {
    const globe = globeInstanceRef.current;
    if (globe) {
      globe.controls().autoRotate = !isHovered;

      if (isHovered) {
        const indiaCoords = { lat: 20.5937, lng: 78.9629, altitude: 2.0 };
        globe.pointOfView(indiaCoords, 1000); // Smooth transition
      }
    }
  }, [isHovered]);

  // Effect for initialization
  useEffect(() => {
    if (!globeEl.current) return;

    const globe = Globe()(globeEl.current);
    globeInstanceRef.current = globe;

    let handleResize = () => {};

    fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(countries => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 128, 0);
        gradient.addColorStop(0, '#4facfe');
        gradient.addColorStop(1, '#00f2fe');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
        const indiaTexture = new THREE.CanvasTexture(canvas);
        const indiaMaterial = new THREE.MeshPhongMaterial({ map: indiaTexture, side: THREE.DoubleSide });
        const defaultMaterial = new THREE.MeshPhongMaterial({ color: 'rgba(100, 100, 100, 0.7)', side: THREE.DoubleSide });

        globe
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
          .backgroundColor('rgba(0,0,0,0)')
          .polygonsData(countries.features)
          .polygonCapMaterial(feat => feat.properties.ISO_A3 === 'IND' ? indiaMaterial : defaultMaterial)
          .polygonSideColor(() => 'rgba(0, 0, 0, 0.1)')
          .polygonStrokeColor(() => '#333')
          .polygonAltitude(0.01)
          .polygonsTransitionDuration(300);

        const indiaCoords = { lat: 20.5937, lng: 78.9629, altitude: 2.0 };
        globe.pointOfView(indiaCoords, 2000);

        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 1;

        handleResize = () => {
          if (globeEl.current) {
            const { width, height } = globeEl.current.getBoundingClientRect();
            globe.width(width).height(height);
          }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
      });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeInstanceRef.current && globeInstanceRef.current.controls()) {
        globeInstanceRef.current.controls().dispose();
        globeInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={globeEl} style={{ width: '100%', height: '300px', cursor: 'grab' }} />;
};

export default GlobeComponent;
